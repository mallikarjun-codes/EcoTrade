import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { CheckCircle, Download, ArrowRight, ShieldCheck, Hash, Copy } from 'lucide-react';
import { jsPDF } from 'jspdf';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Order fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [11, 8.5]
    });

    // --- DECORATIVE BORDER ---
    doc.setLineWidth(0.05);
    doc.setDrawColor(22, 163, 74); // Green border
    doc.rect(0.5, 0.5, 10, 7.5);

    // --- HEADER ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(22, 163, 74);
    doc.text("CERTIFICATE OF OFFSET", 5.5, 2, { align: "center" });

    // --- BODY TEXT ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text("This certifies that", 5.5, 3, { align: "center" });
    
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(order.user_name || "Valued Customer", 5.5, 3.5, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("has successfully retired", 5.5, 4.2, { align: "center" });
    
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(`${order.quantity_tons} Metric Tons of CO2`, 5.5, 4.7, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`via the ${order.project_title}`, 5.5, 5.4, { align: "center" });

    // --- "BLOCKCHAIN" VERIFICATION FOOTER ---
    doc.setDrawColor(200, 200, 200);
    doc.line(2, 6, 9, 6);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Registry Serial: ${order.registry_serial_number || 'PENDING'}`, 2, 6.5);
    doc.text(`Transaction Hash: ${order.transaction_hash || 'PENDING'}`, 2, 6.8);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 9, 6.5, { align: "right" });
    doc.text("Verified by EcoTrade Platform", 9, 6.8, { align: "right" });

    // Save
    doc.save(`EcoTrade_Certificate_${order._id}.pdf`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order.transaction_hash);
    alert("Hash copied to clipboard!");
  };

  if (loading) return <div className="text-center mt-20">Loading Certificate...</div>;
  if (!order) return <div className="text-center mt-20">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* SUCCESS HEADER */}
      <div className="text-center mb-12 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600">
          Thank you, <span className="font-bold text-gray-900">{order.user_name}</span>. 
          Your impact has been recorded on our ledger.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: ORDER SUMMARY */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ShieldCheck className="mr-2 text-green-600"/> Verification Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project</label>
              <div className="text-lg font-medium text-gray-900">{order.project_title}</div>
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volume</label>
              <div className="text-3xl font-bold text-green-600">{order.quantity_tons} Tons</div>
            </div>

            {/* THE BLOCKCHAIN HASH SECTION */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Hash size={12} className="mr-1"/> Immutable Transaction Hash
              </label>
              <div className="flex items-center gap-2">
                <code className="text-xs text-blue-600 break-all font-mono bg-blue-50 px-2 py-1 rounded w-full">
                  {order.transaction_hash || "Generating Block..."}
                </code>
                <button onClick={copyToClipboard} className="text-gray-400 hover:text-gray-600">
                  <Copy size={16}/>
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">
                This SHA-256 hash uniquely identifies your purchase in our permanent registry.
              </p>
            </div>

            <div>
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registry Serial</label>
               <div className="font-mono text-sm text-gray-700">{order.registry_serial_number}</div>
            </div>
          </div>
        </div>

        {/* RIGHT: CERTIFICATE PREVIEW */}
        <div className="bg-green-600 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          
          <div>
            <div className="text-green-100 text-sm font-bold uppercase tracking-widest mb-2">Official Document</div>
            <h3 className="text-3xl font-bold mb-4">Carbon Offset Certificate</h3>
            <p className="text-green-100 mb-8 opacity-90">
              This document serves as legal proof of your environmental contribution.
              Includes unique registry serial number and digital signature.
            </p>
          </div>

          <button 
            onClick={generatePDF}
            className="w-full bg-white text-green-700 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-green-50 transition shadow-lg"
          >
            <Download className="mr-2" /> Download PDF
          </button>
        </div>

      </div>

      <div className="text-center mt-12">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-green-600 font-medium transition">
          Return to Marketplace <ArrowRight size={16} className="ml-2"/>
        </Link>
      </div>

    </div>
  );
};

export default OrderPage;