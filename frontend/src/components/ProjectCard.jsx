import React from 'react';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';

// --- VERRA SVG LOGO COMPONENT ---
const VerraLogo = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 95 42" 
    fill="none" 
    className={className}
    style={{ height: '20px', width: 'auto' }} // Adjusted size for Card Header
  >
    <path d="M13.8254 14.4085C13.7088 14.146 13.8546 13.9126 14.1463 13.9126H16.3046C16.4796 13.9126 16.5963 14.0293 16.6254 14.1168L20.3588 22.8668H20.5046L28.1171 5.92096C28.1463 5.83346 28.2629 5.7168 28.4379 5.7168H30.5963C30.8879 5.7168 31.0338 5.9793 30.9171 6.21263L20.8838 27.9126C20.8254 28.0293 20.7379 28.1168 20.5629 28.1168H20.3588C20.1838 28.1168 20.0963 28.0293 20.0379 27.9126L13.8254 14.4085Z" fill="#0E2B64"></path>
    <path d="M30.4219 14.6419C30.4219 14.4377 30.5677 14.2627 30.801 14.2627H38.7344C38.9385 14.2627 39.1135 14.4377 39.1135 14.6419V16.246C39.1135 16.4502 38.9677 16.6252 38.7344 16.6252H32.9594V19.8335H37.7719C37.976 19.8335 38.151 20.0085 38.151 20.2127V21.846C38.151 22.0502 37.976 22.2252 37.7719 22.2252H32.9594V25.6377H38.7344C38.9385 25.6377 39.1135 25.8127 39.1135 26.0169V27.621C39.1135 27.8252 38.9677 28.0002 38.7344 28.0002H30.801C30.5969 28.0002 30.4219 27.8252 30.4219 27.621V14.6419V14.6419Z" fill="#0E2B64"></path>
    <path d="M42.4375 14.6419C42.4375 14.4377 42.5833 14.2627 42.8167 14.2627H48.3875C50.7208 14.2627 52.6458 16.1294 52.6458 18.4627C52.6458 20.271 51.45 21.7294 49.7583 22.4002L52.4417 27.3585C52.5875 27.621 52.4417 27.9127 52.1208 27.9127H50.0792C49.9042 27.9127 49.8167 27.8252 49.7583 27.7377L47.1625 22.5752H45.0042V27.5627C45.0042 27.7669 44.8292 27.9419 44.625 27.9419H42.8167C42.6125 27.9419 42.4375 27.7669 42.4375 27.5627V14.6419V14.6419ZM48.1833 20.4752C49.2042 20.4752 50.1083 19.571 50.1083 18.4919C50.1083 17.471 49.2042 16.596 48.1833 16.596H45.0042V20.4752H48.1833Z" fill="#0E2B64"></path>
    <path d="M55.9131 14.6419C55.9131 14.4377 56.0589 14.2627 56.2923 14.2627H61.8631C64.1964 14.2627 66.1214 16.1294 66.1214 18.4627C66.1214 20.271 64.9256 21.7294 63.2339 22.4002L65.9173 27.3585C66.0631 27.621 65.9173 27.9127 65.5964 27.9127H63.5548C63.3798 27.9127 63.2923 27.8252 63.2339 27.7377L60.6381 22.5752H58.4798V27.5627C58.4798 27.7669 58.3048 27.9419 58.1006 27.9419H56.2923C56.0881 27.9419 55.9131 27.7669 55.9131 27.5627V14.6419ZM61.6589 20.4752C62.6798 20.4752 63.5839 19.571 63.5839 18.4919C63.5839 17.471 62.6798 16.596 61.6589 16.596H58.4798V20.4752H61.6589Z" fill="#0E2B64"></path>
    <path d="M67.8417 27.4171L73.9083 14.2921C73.9667 14.1754 74.0542 14.0879 74.2292 14.0879H74.4333C74.6375 14.0879 74.6958 14.1754 74.7542 14.2921L80.7625 27.4171C80.8792 27.6796 80.7333 27.9129 80.4417 27.9129H78.75C78.4583 27.9129 78.3125 27.7962 78.1958 27.5337L77.2333 25.4337H71.4L70.4375 27.5337C70.35 27.7379 70.175 27.9129 69.8833 27.9129H68.1917C67.8708 27.9129 67.725 27.6796 67.8417 27.4171ZM76.2708 23.2462L74.3167 18.9587H74.2583L72.3333 23.2462H76.2708Z" fill="#0E2B64"></path>
    <path d="M88.5505 36.4581H6.18385C5.71719 36.4581 5.36719 36.0789 5.36719 35.6414V6.47474C5.36719 6.00807 5.74635 5.65807 6.18385 5.65807H24.6172C24.7922 5.65807 24.9089 5.83307 24.8505 6.00807L24.0339 8.07891C24.0047 8.16641 23.9172 8.22474 23.8005 8.22474H8.19635C8.05052 8.22474 7.93385 8.34141 7.93385 8.48724V33.6581C7.93385 33.8039 8.05052 33.9206 8.19635 33.9206H86.538C86.6839 33.9206 86.8005 33.8039 86.8005 33.6581V8.45807C86.8005 8.31224 86.6839 8.19557 86.538 8.19557H33.4255C33.2505 8.19557 33.1339 8.02057 33.1922 7.84557L34.1255 5.77474C34.1547 5.68724 34.2422 5.62891 34.3589 5.62891H88.5505C89.0172 5.62891 89.3672 6.00807 89.3672 6.44557V35.6122C89.3672 36.0789 88.988 36.4581 88.5505 36.4581Z" fill="#057299"></path>
  </svg>
);

const ProjectCard = ({ project, onBuy, isCompareMode, isSelected, onToggleCompare }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border group flex flex-col h-full ${isSelected ? 'ring-2 ring-green-500 border-green-500 transform scale-[1.02]' : 'border-gray-100 hover:-translate-y-1'}`}>
      
      {/* Image Container */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={project.image_url} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* --- REPLACED SHIELD WITH VERRA LOGO --- */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm">
           <VerraLogo />
        </div>

        {/* Project Type Badge */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${
             project.type === 'Solar' ? 'bg-yellow-100/90 text-yellow-800' :
             project.type === 'Wind' ? 'bg-blue-100/90 text-blue-800' :
             project.type === 'Hydro' ? 'bg-cyan-100/90 text-cyan-800' :
             'bg-green-100/90 text-green-800'
          }`}>
            {project.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">{project.title}</h3>
          <div className="flex items-center text-gray-400 text-xs ml-2 shrink-0">
            <MapPin size={12} className="mr-1" />
            <span>{project.location || 'Global'}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">{project.description}</p>
        
        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <span className="block text-xs text-gray-400 uppercase tracking-wider font-medium">Price per Ton</span>
            <span className="text-xl font-black text-gray-900">${project.price_per_ton}</span>
          </div>

          {/* Conditional Button Rendering */}
          {isCompareMode ? (
            <button 
              onClick={() => onToggleCompare(project)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center ${
                isSelected 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isSelected ? (
                <>Unselect</>
              ) : (
                <>Select to Compare</>
              )}
            </button>
          ) : (
            <button 
              onClick={() => onBuy(project)}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black hover:scale-105 transition-all shadow-lg flex items-center group-hover:shadow-green-500/20"
            >
              Offset Now <ArrowRight size={16} className="ml-2 opacity-60 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Compare Mode Checkbox Overlay (Visual Only) */}
      {isCompareMode && (
        <div className="absolute top-3 left-3">
           <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all bg-white ${isSelected ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 text-transparent'}`}>
              <CheckCircle size={16} fill="currentColor" className="text-white" />
           </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;