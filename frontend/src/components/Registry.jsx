import React, { useEffect, useState } from 'react';
import { fetchRegistry } from '../api';
import { Hash, Globe, Calendar, User, ShieldCheck, Loader2, Search, XCircle } from 'lucide-react';

const Registry = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistry()
      .then(res => {
        setTransactions(res.data);
        setFilteredTransactions(res.data); // Initialize filtered list
        setLoading(false);
      })
      .catch(err => {
        console.error("Registry error:", err);
        setLoading(false);
      });
  }, []);

  // --- SEARCH LOGIC ---
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTransactions(transactions);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = transactions.filter(tx => 
        (tx.registry_serial_number && tx.registry_serial_number.toLowerCase().includes(lowerTerm)) ||
        (tx.transaction_hash && tx.transaction_hash.toLowerCase().includes(lowerTerm)) ||
        (tx.project_title && tx.project_title.toLowerCase().includes(lowerTerm))
      );
      setFilteredTransactions(filtered);
    }
  }, [searchTerm, transactions]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      
      {/* HEADER & SEARCH */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Public Offset Registry</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          EcoTrade maintains a transparent, immutable public ledger of all carbon retired on our platform.
        </p>

        {/* SEARCH BAR INPUT */}
        <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
                placeholder="Verify by Serial Number (e.g. VCU-1234) or Hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    <XCircle className="h-5 w-5" />
                </button>
            )}
        </div>
      </div>

      {/* TABLE */}
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
              ) : filteredTransactions.length === 0 ? (
                 <tr><td colSpan="5" className="p-10 text-center text-gray-400">No transactions found matching your search.</td></tr>
              ) : (
                filteredTransactions.map((tx) => (
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
                      <div className="text-xs font-mono text-gray-500 mt-1 bg-gray-100 inline-block px-1 rounded">
                          {tx.registry_serial_number}
                      </div>
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
                         <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-purple-600 truncate max-w-[150px]" title={tx.transaction_hash}>
                           {tx.transaction_hash}
                         </code>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registry;