import React, { useState } from 'react';
import { X, ShieldCheck, Leaf, CreditCard } from 'lucide-react';

const PaymentModal = ({ project, user, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default to 1 ton

  const handlePayment = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      onSuccess(quantity); // Pass the selected quantity back to App.jsx
    }, 1500);
  };

  const totalPrice = project.price_per_ton * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Confirm Purchase</h3>
              <p className="text-xs text-gray-500">Secure SSL Connection</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          
          {/* Project Summary */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Project</h4>
            <div className="flex justify-between items-center font-medium text-lg text-gray-900">
              {project.title}
            </div>
          </div>

          {/* --- THE FIX: QUANTITY INPUT --- */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Quantity (Tons)</h4>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
               <span className="text-gray-600 font-medium">Offset Amount:</span>
               <div className="flex items-center gap-3">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                 >
                   -
                 </button>
                 <input 
                   type="number" 
                   min="1"
                   value={quantity}
                   onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                   className="w-16 text-center bg-transparent font-bold text-xl outline-none"
                 />
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-green-600 hover:bg-green-50"
                 >
                   +
                 </button>
               </div>
            </div>
          </div>

          {/* Total Price Calculation */}
          <div className="flex justify-between items-end pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Total Price<br/>
              <span className="text-xs">(${project.price_per_ton} × {quantity} tons)</span>
            </div>
            <div className="text-4xl font-black text-gray-900 tracking-tight">
              ${totalPrice.toLocaleString()}
            </div>
          </div>

          {/* Pay Button */}
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <CreditCard size={20} /> Pay ${totalPrice.toLocaleString()}
              </>
            )}
          </button>
          
          <div className="flex justify-center text-xs text-green-600 items-center gap-1 font-medium">
            <ShieldCheck size={14} /> Verified & Immutable Transaction
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;