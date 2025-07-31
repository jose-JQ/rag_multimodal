export interface SearchResult {
  respuesta: string;
  resultados: ImageResult[];
}

export interface ImageResult {
  caption: string;
  url: string;
}

export interface SearchRequest {
  query?: string;
  image?: File;
}