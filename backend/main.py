from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from rag import Rag
from PIL import Image
from typing import Optional
import io

# App
rag  = None

#Fast Api
app = FastAPI()

@app.on_event("startup")
def init_once():
    global rag
    rag = Rag()
    print("App cargada correctamente...:D")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o "*" para permitir todos (no recomendado en producción)
    allow_credentials=True,
    allow_methods=["*"],  # o ["POST"] 
    allow_headers=["*"],
)

@app.post("/search")
async def search_endpoint(
    query: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    try:
        if image is not None:
            contents = await image.read()
            pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
            respuesta, resultados = rag.search(pil_image)
        elif query is not None:
            respuesta, resultados = rag.search(query)
        else:
            return JSONResponse({"error": "Debes enviar una imagen o un texto."}, status_code=400)

        return {
            "respuesta": respuesta,
            "resultados": resultados
        }

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)