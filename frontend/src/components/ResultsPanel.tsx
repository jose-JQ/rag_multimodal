import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from 'lucide-react';

interface ResultsPanelProps {
  response: string;
  title?: string;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ response, title = "Resultado de búsqueda" }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    response: false,
    references: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Generate mock references for demonstration
  const mockReferences = [
    "https://example.com/source1",
    "https://example.com/source2", 
    "https://example.com/source3"
  ];

  const getSummary = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 space-y-6 shadow-xl border border-slate-700/50">
      {/* Title */}
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      </div>

      {/* Summary Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-300 flex items-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>Descripción</span>
        </h3>
        <p className="text-slate-300 leading-relaxed">
          {getSummary(response)}
        </p>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {/* Full Response Section */}
        <div className="border border-slate-600 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('response')}
            className="w-full px-6 py-4 bg-slate-700/50 hover:bg-slate-700/70 text-left flex items-center justify-between transition-colors duration-200"
          >
            <span className="font-medium text-white">Respuesta completa</span>
            {expandedSections.response ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
          {expandedSections.response && (
            <div className="px-6 py-4 bg-slate-800/30 animate-fadeIn">
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
            </div>
          )}
        </div>

        {/* References Section */}
        <div className="border border-slate-600 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('references')}
            className="w-full px-6 py-4 bg-slate-700/50 hover:bg-slate-700/70 text-left flex items-center justify-between transition-colors duration-200"
          >
            <span className="font-medium text-white">Referencias</span>
            {expandedSections.references ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
          {expandedSections.references && (
            <div className="px-6 py-4 bg-slate-800/30 animate-fadeIn">
              <div className="space-y-3">
                {mockReferences.map((ref, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                    <ExternalLink className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <a
                      href={ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors duration-200 truncate"
                    >
                      {ref}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;