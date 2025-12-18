import React from 'react';
import { X, CheckCircle, Shield, Zap, Globe, AlertTriangle } from 'lucide-react';

const ComparisonModal = ({ projects, onClose, onBuy }) => {
  // SAFETY CHECK: If no projects or empty array, return nothing (prevents crash)
  if (!projects || projects.length === 0) return null;

  // Safe access to Project A and Project B
  const p1 = projects[0];
  const p2 = projects[1] || null; // Handle case where 2nd project might be missing

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Project Comparison</h3>
            <p className="text-sm text-gray-500">Analyzing impact, price, and verification.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            
            {/* --- PROJECT 1 COLUMN --- */}
            <div className="flex flex-col h-full border rounded-2xl p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
               {/* Selection Indicator */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
               
               <div className="h-40 mb-4 rounded-xl overflow-hidden relative">
                 <img src={p1.image_url} alt={p1.title} className="w-full h-full object-cover" />
                 <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded">
                   {p1.location}
                 </div>
               </div>

               <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight min-h-[3rem]">{p1.title}</h4>
               
               <div className="space-y-4 mb-6 flex-grow">
                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Type</span>
                    <span className="font-semibold text-gray-800">{p1.type}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Price/Ton</span>
                    <span className="font-bold text-xl text-gray-900">${p1.price_per_ton}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Verified By</span>
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      <Shield size={14} className="mr-1" /> Verra/Gold Std
                    </span>
                 </div>
               </div>

               <button 
                 onClick={() => onBuy(p1)}
                 className="w-full py-3 rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all"
               >
                 Select This Project
               </button>
            </div>

            {/* --- PROJECT 2 COLUMN --- */}
            {p2 ? (
              <div className="flex flex-col h-full border rounded-2xl p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
                 
                 <div className="h-40 mb-4 rounded-xl overflow-hidden relative">
                   <img src={p2.image_url} alt={p2.title} className="w-full h-full object-cover" />
                   <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded">
                     {p2.location}
                   </div>
                 </div>

                 <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight min-h-[3rem]">{p2.title}</h4>
                 
                 <div className="space-y-4 mb-6 flex-grow">
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Type</span>
                      <span className="font-semibold text-gray-800">{p2.type}</span>
                   </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Price/Ton</span>
                      <span className={`font-bold text-xl ${p2.price_per_ton < p1.price_per_ton ? 'text-green-600' : 'text-gray-900'}`}>
                        ${p2.price_per_ton}
                      </span>
                   </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Verified By</span>
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <Shield size={14} className="mr-1" /> Verra/Gold Std
                      </span>
                   </div>
                 </div>

                 <button 
                   onClick={() => onBuy(p2)}
                   className="w-full py-3 rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all"
                 >
                   Select This Project
                 </button>
              </div>
            ) : (
              // Empty State for Project 2 (Just in case)
              <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 bg-gray-50/50">
                 <AlertTriangle size={48} className="mb-2 opacity-50"/>
                 <p>Select a second project to compare</p>
              </div>
            )}

          </div>

          {/* Smart Recommendation Banner */}
          {p2 && (
             <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                <Zap className="text-blue-600 shrink-0 mt-1" size={20} />
                <div>
                  <h5 className="font-bold text-blue-900 text-sm mb-1">Impact Analysis</h5>
                  <p className="text-blue-800 text-xs leading-relaxed">
                    {p1.price_per_ton < p2.price_per_ton 
                      ? `${p1.title} offers a better price point ($${p1.price_per_ton}/ton), allowing you to offset ${(p2.price_per_ton / p1.price_per_ton * 10).toFixed(1)} tons for the price of 10 tons of the other project.`
                      : `${p2.title} offers a better price point ($${p2.price_per_ton}/ton), allowing you to offset ${(p1.price_per_ton / p2.price_per_ton * 10).toFixed(1)} tons for the price of 10 tons of the other project.`
                    }
                  </p>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;