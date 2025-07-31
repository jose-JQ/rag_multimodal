import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/20 border border-red-700 rounded-2xl p-6 text-center space-y-4">
      <div className="flex justify-center">
        <AlertCircle className="w-12 h-12 text-red-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-red-300">Error en la búsqueda</h3>
        <p className="text-red-200">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Intentar nuevamente</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;