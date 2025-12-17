import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Loader2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ project, user, onClose, onSuccess }) => {
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState('card'); // 'card' or 'success'

  const handlePayment = () => {
    setProcessing(true);
    // Simulate Network Delay (2.5 seconds)
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      // Wait 1 second to show success tick, then complete order
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center text-gray-700 font-bold">
            <ShieldCheck className="text-green-600 mr-2" size={20} />
            Secure Checkout
          </div>
          <button onClick={onClose} disabled={processing} className="p-1 hover:bg-gray-200 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 'card' ? (
            <>
              {/* Order Summary */}
              <div className="mb-6">
                <p className="text-gray-500 text-sm">Paying to EcoTrade Inc.</p>
                <div className="flex justify-between items-end mt-1">
                  <h3 className="text-2xl font-bold text-gray-900">₹{(project.price_per_ton * 10 * 85).toLocaleString()}</h3>
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">TEST MODE</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">For {project.title} (10 Tons)</p>
              </div>

              {/* Fake Card Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                  <div className="relative mt-1">
                    <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input type="text" value="4242 4242 4242 4242" disabled className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                    <input type="text" value="12/30" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-mono" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">CVV</label>
                    <input type="password" value="***" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-mono" />
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button 
                onClick={handlePayment} 
                disabled={processing}
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} className="mr-2" /> Pay Now
                  </>
                )}
              </button>
            </>
          ) : (
            // Success View
            <div className="text-center py-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"
              >
                <ShieldCheck size={48} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
              <p className="text-gray-500 mt-2">Redirecting to order tracker...</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-3 text-center text-xs text-gray-400 flex justify-center items-center">
          <Lock size={10} className="mr-1" /> 256-bit SSL Encrypted
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;