import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

const ProjectCard = ({ project, onBuy, onToggleCompare, isSelected, isCompareMode }) => {
  // Helper for conditional classes
  const cardClasses = `relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border flex flex-col h-full ${
    isSelected ? "ring-2 ring-green-500 shadow-green-100 transform scale-[1.02]" : "hover:shadow-xl border-gray-100"
  }`;

  const buttonClasses = `px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
    isCompareMode ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-green-600 text-white"
  }`;

  return (
    <div className={cardClasses}>
      
      {/* Compare Checkbox */}
      {isCompareMode && (
        <div className="absolute top-3 left-3 z-10">
          <button 
            onClick={() => onToggleCompare(project)}
            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
              isSelected ? "bg-green-500 border-green-500 text-white" : "bg-white/90 border-gray-300 hover:border-green-500"
            }`}
          >
            {isSelected && <span className="font-bold text-xs">✓</span>}
          </button>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={project.image_url} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-green-700 flex items-center shadow-sm">
          <ShieldCheck size={14} className="mr-1" />
          {project.verification_standard}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {project.type}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <MapPin size={12} className="mr-1" />
            {project.location?.country || "Global"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Price per Ton</p>
            <p className="text-xl font-bold text-gray-900">${project.price_per_ton}</p>
          </div>
          <button 
            onClick={() => onBuy(project)}
            disabled={isCompareMode} 
            className={buttonClasses}
          >
            {isCompareMode ? "Select to Compare" : "Offset Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;