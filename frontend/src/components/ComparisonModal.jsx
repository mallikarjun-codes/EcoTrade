import React from 'react';
import { X, ShieldCheck, FileText, Leaf } from 'lucide-react';

const ComparisonModal = ({ projects, onClose, onBuy }) => {
  if (projects.length < 2) return null;
  const [p1, p2] = projects;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold flex items-center">
            <Leaf className="mr-2" /> Impact Comparator
          </h2>
          <button onClick={onClose} className="hover:bg-gray-700 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow">
          <div className="grid grid-cols-2 divide-x divide-gray-200 h-full">
            <ProjectColumn project={p1} otherProject={p2} onBuy={onBuy} />
            <ProjectColumn project={p2} otherProject={p1} onBuy={onBuy} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectColumn = ({ project, otherProject, onBuy }) => {
  // Logic to highlight the better option
  const isCheaper = project.price_per_ton < otherProject.price_per_ton;
  const moreImpact = project.sdg_impact.length > otherProject.sdg_impact.length;
  const report = project.auditor_reports?.[0]; // Get the first review

  return (
    <div className="p-6 flex flex-col h-full bg-gray-50/30">
      {/* Image Fix: Added bg-gray-200 fallback */}
      <div className="h-48 rounded-xl overflow-hidden mb-5 bg-gray-200 shrink-0">
        <img src={project.image_url} className="w-full h-full object-cover" alt={project.title} />
      </div>

      <div className="flex-grow">
        <h3 className="font-bold text-2xl mb-1 text-gray-900">{project.title}</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium bg-gray-100 inline-block px-2 py-1 rounded">{project.type}</p>
        
        <div className="space-y-3 mb-8">
           <StatRow label="Price / Ton" value={`$${project.price_per_ton}`} highlight={isCheaper} />
           <StatRow label="Vintage" value={project.vintage_year} />
           <StatRow label="Standard" value={project.verification_standard} icon={ShieldCheck} />
           <StatRow label="SDG Goals" value={`${project.sdg_impact.length} Goals Achieved`} highlight={moreImpact} />
        </div>

        {/* THE "REVIEW" SECTION (Auditor Report) */}
        {report && (
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <FileText size={16} className="text-blue-600 mr-2" />
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Auditor Review</span>
            </div>
            <p className="text-sm text-gray-700 italic">"{report.summary}"</p>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500 border-t border-blue-100 pt-2">
              <span>Verified by: <strong>{report.auditor_name}</strong></span>
              <span>Score: <span className="text-blue-700 font-bold">{report.rating}/10</span></span>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => onBuy(project)} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shrink-0">
        Select This Project
      </button>
    </div>
  );
};

const StatRow = ({ label, value, highlight, icon: Icon }) => (
  <div className={`flex justify-between items-center p-3 rounded-lg ${highlight ? 'bg-green-100 ring-1 ring-green-500' : 'bg-white border border-gray-100'}`}>
    <span className="text-sm text-gray-500 flex items-center">
      {Icon && <Icon size={14} className="mr-1 text-gray-400" />} {label}
    </span>
    <span className={`font-bold ${highlight ? 'text-green-800' : 'text-gray-900'}`}>{value}</span>
  </div>
);

export default ComparisonModal;