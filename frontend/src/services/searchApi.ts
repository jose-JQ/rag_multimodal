import { SearchResult, SearchRequest } from '../types/search';

const API_BASE_URL = 'http://localhost:8000';

export const searchApi = {
  async search(request: SearchRequest): Promise<SearchResult> {
    const formData = new FormData();
    
    if (request.query) {
      formData.append('query', request.query);
    }
    
    if (request.image) {
      formData.append('image', request.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('No se pudo conectar con el servidor. Asegúrate de que el backend esté ejecutándose en http://localhost:8000');
      }
      throw error;
    }
  }
};

// Mock data for development when backend is not available
export const getMockSearchResult = (query?: string): SearchResult => {
  return {
    respuesta: `Esta es una respuesta simulada para la consulta: "${query || 'imagen subida'}". En un entorno real, esta respuesta sería generada por el modelo de IA basado en el análisis multimodal de la entrada proporcionada. La respuesta incluiría información relevante, contexto y detalles específicos relacionados con la consulta o imagen procesada.`,
    resultados: [
      {
        caption: "Imagen relacionada 1 - Ejemplo de resultado visual",
        url: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      },
      {
        caption: "Imagen relacionada 2 - Contenido visual similar", 
        url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      },
      {
        caption: "Imagen relacionada 3 - Resultado de búsqueda visual",
        url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      },
      {
        caption: "Imagen relacionada 4 - Contexto adicional",
        url: "https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      }
    ]
  };
};