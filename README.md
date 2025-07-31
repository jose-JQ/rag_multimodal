# Quantic Search: Proyecto RAG Multimodal

---

## 🚀 Resumen

**Quantic Search** es un sistema avanzado de Generación Aumentada por Recuperación (RAG) que permite a los usuarios buscar información usando **texto, imágenes, o una combinación de ambos**. Impulsado por inteligencia artificial multimodal, este proyecto utiliza modelos de última generación para la comprensión de imágenes, el procesamiento de texto y la IA generativa. El objetivo es ofrecer respuestas coherentes y ricas en contexto, basándose en la información visual recuperada.

La idea principal es mejorar la búsqueda tradicional basada solo en texto, incorporando señales visuales para una interacción más intuitiva y completa con la información.

---

## ✨ Características Principales

* **Búsqueda Multimodal:** Consulta el sistema con descripciones de texto, subiendo imágenes o con ambos al mismo tiempo.
* **Subtitulado de Imágenes:** Genera automáticamente descripciones textuales para las imágenes cargadas utilizando el modelo **BLIP**.
* **Integración con Base de Datos Vectorial:** Emplea **Pinecone** para almacenar y recuperar eficientemente las incrustaciones (embeddings) de imágenes y texto.
* **Narrativa Contextual:** Utiliza **Gemini-1.5-Flash** de Google para crear respuestas narrativas basadas en el contexto visual recuperado.
* **Backend Escalable:** Desarrollado con **FastAPI** para una API robusta y de alto rendimiento.
* **Frontend Interactivo:** Una moderna aplicación **React** que proporciona una experiencia de usuario fluida y con retroalimentación en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

### Backend y Núcleo RAG

* **Python:** Lenguaje de programación principal.
* **FastAPI:** Framework web para construir la API.
* **PyTorch:** Framework de aprendizaje profundo para la inferencia de modelos.
* **Hugging Face Transformers:** Incluye los modelos **CLIP** (para incrustaciones de texto e imagen) y **BLIP** (para subtítulos de imágenes).
* **Pinecone:** Base de datos vectorial para la gestión eficiente de embeddings.
* **Google Gemini-1.5-Flash:** Modelo de lenguaje grande (LLM) para la generación de texto.
* **Pillow (PIL):** Para procesamiento de imágenes.
* **`python-dotenv`:** Para la gestión de variables de entorno.
* **CORS Middleware:** Para manejar las políticas de seguridad de origen cruzado (CORS).

### Frontend

* **React:** Biblioteca JavaScript para construir la interfaz de usuario.
* **Tailwind CSS:** Para el diseño rápido y el estilizado de la UI.
* **TypeScript:** (Usado para mejorar la robustez y el mantenimiento del código, aunque no se muestra explícitamente en el fragmento de `App.js`).

---

## 📂 Estructura del Proyecto

El proyecto está organizado en tres componentes principales:

1.  **Backend (`backend.py`):** Gestiona las solicitudes API con FastAPI, actúa como orquestador para el módulo RAG y maneja CORS y errores.
2.  **Núcleo RAG (`rag.py`):** Contiene toda la lógica de IA/ML, inicializando y gestionando las conexiones a Pinecone y los modelos CLIP, BLIP y Gemini. Proporciona métodos para la descripción de imágenes (`describir_img`), la recuperación multimodal (`retrival`), la generación de prompts (`generar_prompt_narrativo`), y la ejecución general de la búsqueda (`search`).
3.  **Frontend (Aplicación React):** Proporciona la interfaz de usuario para interactuar con el backend. Incluye componentes para el encabezado, el formulario de búsqueda, el carrusel de imágenes, el panel de resultados, un spinner de carga y mensajes de error. Gestiona la entrada del usuario (texto/imagen), envía solicitudes al backend y muestra los resultados.

---

## ⚙️ Configuración e Instalación

### Prerrequisitos

* Python 3.8+
* Node.js y npm (para el frontend)
* Acceso a una clave API de Pinecone
* Acceso a una clave API de Google Gemini

### 1. Clonar el repositorio

```bash
git clone <tu-url-del-repositorio>
cd quantic-search
```

### 2. Configuración del Backend
#### 1. Crear un entorno virtual
#### 2. Instala las dependencias
#### 3. Confuga tus claves API

### 3. Configuración del Frontend
#### 1. Navega al directorio frontend
#### 2. Instala las dependencias de Node.js: npm intsall
#### 3. 3.	Inicia el servidor de desarrollo de React: npm start

### 4. Ejecutar el backend
Desde la raíz del proyecto (después de activar tu entorno virtual):
#### 1.	Ejecuta el servidor FastAPI: uvicorn backend:app --host 0.0.0.0 --port 8000 --reload
#### 2.	El backend estará accesible en http://localhost:8000.

## 🚀 Uso

1. Asegúrate de que tanto el backend (FastAPI) como el frontend (React) estén ejecutándose.  
2. Abre tu navegador y navega a la URL del frontend (normalmente [http://localhost:3000](http://localhost:3000)).  
3. Usa la barra de búsqueda para:  
   - Escribir una consulta de texto.  
   - Subir una imagen.  
   - Hacer ambas para realizar una búsqueda multimodal.  
4. El panel de resultados mostrará la respuesta narrativa generada por la IA y un carrusel de imágenes relevantes recuperadas de la base de datos.

---

## 💡 Cómo Funciona (Flujo Conceptual)

1. **Entrada del Usuario:** El frontend captura una consulta de texto y/o una imagen cargada.  
2. **Llamada a la API:** El frontend envía estos datos al endpoint `/search` de FastAPI.  
3. **Procesamiento del Backend:**  
   - Si se proporciona una imagen, el modelo BLIP primero genera una descripción textual (subtítulo) de la imagen.  
   - La consulta de texto (original o generada a partir de la imagen) es luego procesada por el modelo CLIP para crear una incrustación vectorial de alta dimensión.  
   - Esta incrustación se utiliza para consultar la base de datos vectorial Pinecone y recuperar los subtítulos de imágenes más semánticamente similares y sus URLs asociadas.  
4. **Generación Contextual:**  
   - Los subtítulos recuperados forman el "contexto" para el Modelo de Lenguaje Grande.  
   - Se construye un prompt sofisticado, combinando la consulta original del usuario (o la descripción de la imagen) con el contexto recuperado.  
   - Este prompt se envía a Google Gemini-1.5-Flash.  
5. **Respuesta:** Gemini genera una narrativa o explicación coherente basada en el contexto proporcionado.  
6. **Mostrar Resultados:** El backend envía la narrativa generada y los detalles de las imágenes recuperadas de vuelta al frontend, que luego los muestra al usuario.

---

## 📄 Licencia

Este proyecto es de código abierto. Consulta el archivo LICENSE para más detalles.

---

## 📞 Contacto

Para cualquier pregunta o colaboración, ¡no dudes en contactarnos!
