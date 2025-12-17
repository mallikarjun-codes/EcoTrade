import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, FileText, Server, Leaf, Check, Download } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { jsPDF } from "jspdf"; 
import { useUser } from "@clerk/clerk-react"; 

const STAGES = [
  { id: 'processing', label: 'Payment Confirmed', icon: CheckCircle },
  { id: 'allocating', label: 'Allocating Registry Serial #', icon: Server },
  { id: 'retiring', label: 'Retiring Credits on Verra', icon: Leaf },
  { id: 'certified', label: 'Certificate Issued', icon: FileText },
];

const Tracker = ({ order, onBack }) => {
  const { user } = useUser(); 
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    if (currentStageIndex < STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStageIndex(prev => prev + 1);
      }, 3500); 
      return () => clearTimeout(timer);
    }
  }, [currentStageIndex]);

  const isFinished = currentStageIndex === STAGES.length;

  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    // Design: Green Border
    doc.setLineWidth(2);
    doc.setDrawColor(22, 163, 74); // Green-600
    doc.rect(10, 10, 277, 190); 

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(22, 163, 74);
    doc.text("EcoTrade", 148.5, 40, { align: "center" });

    doc.setFontSize(24);
    doc.setTextColor(60, 60, 60);
    doc.text("Certificate of Carbon Offset", 148.5, 60, { align: "center" });

    // Body Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("This certifies that", 148.5, 85, { align: "center" });

    // Dynamic Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(0, 0, 0);
    doc.text(user?.fullName || "Valued Customer", 148.5, 105, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(`Has successfully retired ${order.quantity_tons} Tons of CO2 credits from:`, 148.5, 125, { align: "center" });

    // Project Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(order.project_title || "Verified Green Project", 148.5, 140, { align: "center" });

    // Serial & Date
    doc.setDrawColor(200, 200, 200);
    doc.line(70, 160, 227, 160); // Divider line

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const dateStr = new Date().toLocaleDateString();
    doc.text(`Registry Serial: ${order.registry_serial_number}`, 148.5, 170, { align: "center" });
    doc.text(`Date Issued: ${dateStr}`, 148.5, 178, { align: "center" });

    // Save File
    doc.save(`EcoTrade_Certificate_${order.registry_serial_number}.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Tracking Order #{order._id.slice(-6)}</h2>
          <p className="text-gray-500">Offsetting {order.quantity_tons} Tons of CO2</p>
        </div>

        <div className="space-y-8 relative">
          <div className="absolute left-8 top-4 bottom-4 w-1 bg-gray-100" />

          {STAGES.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex && !isFinished;
            const Icon = isCompleted ? Check : stage.icon;

            return (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative flex items-center z-10"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-colors duration-500 flex-shrink-0 ${
                  isCompleted ? "bg-green-100 border-green-500 text-green-600" :
                  isActive ? "bg-blue-100 border-blue-500 text-blue-600 animate-pulse" :
                  "bg-gray-50 border-gray-200 text-gray-300"
                }`}>
                  <Icon size={24} />
                </div>

                <div className="ml-6 text-left w-full">
                  <h3 className={`text-lg font-bold ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                    {stage.label}
                  </h3>
                  
                  {isActive && (
                    <p className="text-sm text-blue-500 flex items-center mt-1">
                      <Loader2 size={12} className="animate-spin mr-1" /> Processing...
                    </p>
                  )}

                  {isCompleted && index === 1 && <p className="text-xs text-green-600 font-mono mt-1 break-all">Serial: {order.registry_serial_number}</p>}
                  
                   {/* RESPONSIVE BUTTON: w-full on mobile, auto on desktop */}
                   {isCompleted && index === 3 && (
                     <button 
                       onClick={generateCertificate}
                       className="w-full sm:w-auto text-sm bg-green-100 text-green-700 px-4 py-3 rounded-xl font-bold cursor-pointer mt-4 hover:bg-green-200 flex items-center justify-center transition shadow-sm"
                     >
                       <Download size={16} className="mr-2"/> Download Verified Certificate
                     </button>
                   )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {isFinished && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-12"
          >
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p className="text-green-800 font-bold">🎉 Impact Verified!</p>
              <p className="text-green-700 text-sm">Your credits have been permanently retired.</p>
            </div>
            {/* RESPONSIVE BUTTON */}
            <button 
              onClick={onBack}
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition"
            >
              Back to Marketplace
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Tracker;