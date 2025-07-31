import React, { useState, useRef } from 'react';
import { Search, Image, X, Upload, Loader2 } from 'lucide-react';

interface SearchFormProps {
  onSearch: (query?: string, image?: File) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageMode, setImageMode] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && !selectedImage) return;
    onSearch(query.trim() || undefined, selectedImage || undefined);
  };

  const handleImageSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImageMode(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageMode(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isSearchDisabled = (!query.trim() && !selectedImage) || isLoading;

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Search Input */}
        <div className="flex items-center space-x-2">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setImageMode(!imageMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  imageMode ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                disabled={isLoading}
              >
                <Image className="w-5 h-5" />
              </button>
            </div>
          </div>
            
          {/* Search Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSearchDisabled}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 ${
                isSearchDisabled
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 hover:scale-105 shadow-lg hover:shadow-purple-500/25'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Search className="w-6 h-6" />
              )}
              <span>{isLoading ? 'Buscando...' : 'Buscar'}</span>
            </button>
          </div>
        </div>

        {/* Image Upload Section */}
        {imageMode && (
          <div className="space-y-4 animate-fadeIn">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                dragOver 
                  ? 'border-purple-400 bg-purple-900/20' 
                  : selectedImage 
                    ? 'border-green-400 bg-green-900/20' 
                    : 'border-slate-600 bg-slate-800/30 hover:border-purple-500'
              }`}
            >
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="max-w-full max-h-48 rounded-lg shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-green-400 font-medium">{selectedImage.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                  <div>
                    <p className="text-slate-300 text-lg mb-2">
                      Arrastra una imagen aquí o{' '}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-purple-400 hover:text-purple-300 underline"
                        disabled={isLoading}
                      >
                        selecciona un archivo
                      </button>
                    </p>
                    <p className="text-slate-500 text-sm">PNG, JPG, JPEG hasta 10MB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
        )}


      </form>
    </div>
  );
};

export default SearchForm;