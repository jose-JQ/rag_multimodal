import torch
from transformers import CLIPProcessor, CLIPModel, BlipProcessor, BlipForConditionalGeneration
from pinecone import Pinecone, ServerlessSpec
from PIL import Image
from dotenv import load_dotenv
import google.generativeai as genai 
import os


class Rag:
    def __init__(self):
        load_dotenv()

        # --- Configuración general ---
        self._device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Usando dispositivo: {self._device}")

        # --- Pinecone ---
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self._img_index_name = "flickr8kragproject"
        self._text_index_name = "text-index"
        self.img_index = self.pc.Index(self._img_index_name)
        self.text_index = self.pc.Index(self._text_index_name)

        # --- Modelos CLIP ---
        model_id_clip = "openai/clip-vit-base-patch32"
        self.clip_processor = CLIPProcessor.from_pretrained(model_id_clip)
        self.clip_model = CLIPModel.from_pretrained(model_id_clip, use_safetensors=True).to(self._device)

        # --- Modelo de captioning (BLIP) ---
        model_id_blip = "Salesforce/blip-image-captioning-base"
        self.blip_processor = BlipProcessor.from_pretrained(model_id_blip)
        self.blip_model = BlipForConditionalGeneration.from_pretrained(model_id_blip).to(self._device)

        # --- Gemini ---
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        self.llm = genai.GenerativeModel("gemini-1.5-flash")

    def describir_img(self, image: Image.Image) -> str:
        """
        Genera una descripción textual para una imagen usando BLIP.
        """
        inputs = self.blip_processor(image, return_tensors="pt").to(self._device)
        with torch.no_grad():
            output = self.blip_model.generate(**inputs)
        caption = self.blip_processor.decode(output[0], skip_special_tokens=True)
        return caption

    def retrival(self, query, top_k=5):
        """
        Realiza recuperación en Pinecone a partir de texto o imagen.
        """
        if isinstance(query, str):
            with torch.no_grad():
                inputs = self.clip_processor(text=[query], return_tensors="pt").to(self._device)
                query_embedding = self.clip_model.get_text_features(**inputs)
        elif isinstance(query, Image.Image):
            with torch.no_grad():
                inputs = self.clip_processor(images=[query], return_tensors="pt").to(self._device)
                query_embedding = self.clip_model.get_image_features(**inputs)
        else:
            raise ValueError("Consulta debe ser texto o imagen PIL")

        query_embedding /= query_embedding.norm(dim=-1, keepdim=True)
        query_vector = query_embedding.cpu().numpy().tolist()[0]

        results = self.img_index.query(
            vector=query_vector,
            top_k=top_k,
            include_metadata=True,
            namespace="images"
        )

        retrieved_items = []
        for match in results['matches']:
            metadata = match['metadata']
            print(f"  - Score: {match['score']:.4f}")
            print(f"    Descripción: {metadata['caption']}")
            print(f"    URL: {metadata['url']}")
            retrieved_items.append(metadata)

        return retrieved_items

    def generar_prompt_narrativo(self, query, contexto):
        return f"""Eres una aplicación de Retrieval Augmented Generation que siempre responde en español.

Debes redactar una breve historia o una explicación coherente y fluida basada en descripciones visuales recuperadas como contexto.

Tu texto debe estar escrito en un solo párrafo, con lenguaje claro y natural, adecuado para ser leído en voz alta por un sistema de texto a voz.

Si la información no es suficiente para construir una historia o explicación confiable, indícalo con claridad y no inventes detalles.

Contexto:
{contexto}

Consulta:
El usuario desea comprender lo siguiente: {query}"""

    def generar_respuesta(self, prompt: str) -> str:
        response = self.llm.generate_content(prompt)
        return response.text

    def search(self, query, top_k=5):
        retrieved_data = self.retrival(query, top_k)
        contexto = "\n".join([f"- {item['caption']}" for item in retrieved_data])

        if not isinstance(query, str):
            query = self.describir_img(query)

        prompt = self.generar_prompt_narrativo(query, contexto)
        respuesta = self.generar_respuesta(prompt)
        return respuesta, retrieved_data
