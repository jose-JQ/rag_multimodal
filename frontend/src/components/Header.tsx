import React from 'react';
import { Search, FileText, Settings, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 border-b border-purple-700 shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Quantic Search</h1>
              <p className="text-purple-200 text-sm">Multimodal RAG</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-700/50 hover:bg-purple-600/60 text-purple-100 transition-all duration-200 hover:scale-105">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Docs</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-700/50 hover:bg-purple-600/60 text-purple-100 transition-all duration-200 hover:scale-105">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Configuración</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;