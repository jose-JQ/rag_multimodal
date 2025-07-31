import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ImageCarousel from './components/ImageCarousel';
import ResultsPanel from './components/ResultsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { SearchResult } from './types/search';
import { searchApi, getMockSearchResult } from './services/searchApi';

function App() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<{ query?: string; image?: File } | null>(null);

  const handleSearch = async (query?: string, image?: File) => {
    setIsLoading(true);
    setError(null);
    setLastSearch({ query, image });

    try {
      // Try real API first, fallback to mock data if it fails
      let result: SearchResult;
      try {
        result = await searchApi.search({ query, image });
      } catch (apiError) {
        console.warn('API call failed, using mock data:', apiError);
        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        result = getMockSearchResult(query);
      }
      
      setSearchResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastSearch) {
      handleSearch(lastSearch.query, lastSearch.image);
    }
  };

  const generateTitle = (query?: string, hasImage?: boolean) => {
    if (query && hasImage) {
      return `Búsqueda: "${query}" con imagen`;
    } else if (query) {
      return `Búsqueda: "${query}"`;
    } else if (hasImage) {
      return 'Búsqueda por imagen';
    }
    return 'Resultado de búsqueda';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <Header />

  <main
    className={`container mx-auto px-6 py-12 flex flex-col ${
      !searchResult && !isLoading && !error ? 'justify-center' : 'justify-start'
    } min-h-screen`}
  >
    <div className="space-y-12 w-full">
      {/* Search Section */}
      <section className="text-center space-y-8">
        {!searchResult && !isLoading && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-white">Quantic Search</h2>
            <p className="text-xl text-slate-300">
              Encuentra información usando texto, imágenes o ambos. Powered by AI multimodal.
            </p>
          </div>
        )}

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </section>

      {/* Results Section */}
      {isLoading && (
        <section className="max-w-6xl mx-auto">
          <LoadingSpinner />
        </section>
      )}

      {error && (
        <section className="max-w-4xl mx-auto">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </section>
      )}

      {searchResult && !isLoading && (
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Images Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-white">Resultados Visuales</h2>
              <ImageCarousel results={searchResult.resultados} />
            </div>

            {/* Text Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Información</h2>
              <ResultsPanel
                response={searchResult.respuesta}
                title={generateTitle(lastSearch?.query, !!lastSearch?.image)}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  </main>

  {/* Footer */}
  <footer className="border-t border-slate-700 py-8">
    <div className="container mx-auto px-6 text-center text-slate-400">
      <p>&copy; 2025 Quantic Search. Búsqueda multimodal inteligente.</p>
    </div>
  </footer>
</div>

  );
}

export default App;