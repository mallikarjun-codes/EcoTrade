import React, { useEffect, useState } from 'react';
import { fetchRegistry } from '../api';
import { Hash, Globe, Calendar, User, ShieldCheck, Loader2 } from 'lucide-react';

const Registry = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistry()
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Registry error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Public Offset Registry</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          EcoTrade maintains a transparent, immutable public ledger of all carbon retired on our platform. 
          Each transaction is cryptographically hashed.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Offset</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Proof (Hash)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr><td colSpan="5" className="p-10 text-center"><Loader2 className="animate-spin inline text-green-600"/> Loading Ledger...</td></tr>
              ) : transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400"/>
                      {new Date(tx.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                       <Globe size={14} className="text-blue-500"/> {tx.project_title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{tx.registry_serial_number}</div>
                  </td>
                  <td className="p-6 text-sm text-gray-600 flex items-center gap-2">
                    <User size={14} className="text-gray-400"/> {tx.user_name}
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ShieldCheck size={12} className="mr-1"/> {tx.quantity_tons} Tons
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <Hash size={14} className="text-purple-400"/>
                       <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-purple-600 truncate max-w-[150px]">
                         {tx.transaction_hash}
                       </code>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registry;