import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageResult {
  caption: string;
  url: string;
}

interface ImageCarouselProps {
  results: ImageResult[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ results }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (results.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % results.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative bg-slate-800/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="aspect-video relative">
          <img
            src={results[currentIndex].url}
            alt={results[currentIndex].caption}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop';
            }}
          />
          
          {/* Navigation Arrows */}
          {results.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 hover:scale-110"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 hover:scale-110"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 rounded-full text-white text-sm">
            {currentIndex + 1} de {results.length}
          </div>
        </div>

        {/* Current Image Caption */}
        <div className="p-4 bg-slate-900/80">
          <p className="text-slate-300 text-center">{results[currentIndex].caption}</p>
        </div>
      </div>

      {/* Thumbnails */}
      {results.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentIndex 
                  ? 'ring-2 ring-purple-500 shadow-lg scale-105' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={result.url}
                alt={result.caption}
                className="w-20 h-20 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop';
                }}
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-purple-500/20 border-2 border-purple-400 rounded-lg"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;