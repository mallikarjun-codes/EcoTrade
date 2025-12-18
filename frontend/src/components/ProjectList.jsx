import React, { useState, useEffect } from 'react';
import API from '../api';
import { Filter, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

// --- SUB-COMPONENT: PROJECT CARD (Handles its own 'Tons' state) ---
const ProjectCard = ({ p, onSelect, isSelected, onBuy }) => {
  const [tons, setTons] = useState(1); // Default to 1 ton
  const totalPrice = p.price_per_ton * tons;

  return (
    <div className={`bg-white/80 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${isSelected ? 'ring-2 ring-green-500 border-green-500 transform scale-105' : 'border-white/50'}`}>
      
      {/* Selection Checkbox (For Compare) */}
      <div className="absolute top-3 right-3 z-10">
        <button onClick={() => onSelect(p)} className={`p-2 rounded-full backdrop-blur-md transition-colors ${isSelected ? 'bg-green-500 text-white' : 'bg-white/30 text-gray-600 hover:bg-white'}`}>
          {isSelected ? <CheckCircle size={18} /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-400" />}
        </button>
      </div>

      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${p.type === 'Solar' ? 'bg-yellow-100/90 text-yellow-800' : p.type === 'Wind' ? 'bg-blue-100/90 text-blue-800' : p.type === 'Hydro' ? 'bg-cyan-100/90 text-cyan-800' : 'bg-green-100/90 text-green-800'}`}>{p.type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{p.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{p.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3">
          {/* LEFT: Price */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price / Ton</span>
            <div className="text-xl font-black text-gray-900">${p.price_per_ton}</div>
          </div>

          {/* RIGHT: Input & Buy */}
          <div className="flex items-center gap-2">
             {/* INPUT: Number of Tons */}
             <div className="relative w-16">
               <input type="number" min="1" max="1000" value={tons} onChange={(e) => setTons(Math.max(1, parseInt(e.target.value) || 1))} className="w-full pl-2 pr-1 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-green-500 outline-none text-sm font-bold text-center" />
               <span className="absolute -top-4 left-0 text-[10px] text-gray-400 font-medium">Tons</span>
             </div>

             {/* BUTTON: Buy */}
             <button onClick={() => onBuy(p, tons)} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-black transition shadow-lg whitespace-nowrap">
               Offset Now
             </button>
          </div>
        </div>
        
        {/* Total Price Preview */}
        {tons > 1 && (<div className="mt-2 text-right text-xs text-green-600 font-bold">Total: ${totalPrice.toLocaleString()}</div>)}
      </div>
    </div>
  );
};

// --- MAIN LIST COMPONENT ---
const ProjectList = ({ onPurchase }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    API.get('/projects').then(res => { setProjects(res.data); setLoading(false); }).catch(err => setLoading(false));
  }, []);

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.type === filter);
  const handleSelect = (project) => {
    if (selectedProjects.find(p => p._id === project._id)) {
      setSelectedProjects(selectedProjects.filter(p => p._id !== project._id));
    } else {
      if (selectedProjects.length < 2) setSelectedProjects([...selectedProjects, project]);
      else alert("You can compare max 2 projects.");
    }
  };

  return (
    <div id="market" className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div><h2 className="text-3xl font-bold text-gray-900">Project Marketplace</h2></div>
        <div className="flex items-center bg-white/60 backdrop-blur-md p-1 rounded-xl border border-white/60 shadow-sm">
          <Filter size={16} className="text-gray-400 ml-3 mr-2" />
          {['All', 'Solar', 'Wind', 'Nature', 'Hydro'].map(type => (
            <button key={type} onClick={() => setFilter(type)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === type ? 'bg-white text-green-700 shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>{type}</button>
          ))}
        </div>
      </div>
      {/* Comparison Logic (Hidden for brevity, same as before) */}
      {selectedProjects.length > 0 && (<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-6"><span className="font-bold text-sm">{selectedProjects.length} Selected</span><button onClick={() => setSelectedProjects([])}><AlertCircle size={18}/></button></div>)}

      {loading ? <div className="text-center py-20">Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id} p={p} onSelect={handleSelect} isSelected={!!selectedProjects.find(s => s._id === p._id)} onBuy={onPurchase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;