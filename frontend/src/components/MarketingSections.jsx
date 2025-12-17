import React, { useEffect, useState } from 'react';
import { Search, CreditCard, FileCheck, Globe, TrendingUp, ShieldCheck, Loader2 } from 'lucide-react';
import { fetchStats } from '../api'; // <--- Import the new API call

const MarketingSections = () => {
  const [stats, setStats] = useState({ total_tons: 0, total_projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live stats from the backend when component loads
    fetchStats()
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Stats error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-20 space-y-24">
      
      {/* --- SECTION 1: HOW IT WORKS --- */}
      <section id="how-it-works" className="scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How EcoTrade Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've simplified the complex carbon market into three easy steps. No brokers, no waiting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Select a Project</h3>
            <p className="text-gray-500">Browse verified solar, wind, and forestry projects from around the world.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Purchase Credits</h3>
            <p className="text-gray-500">Buy tons securely. Your funds go directly to supporting the project developers.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Get Certified</h3>
            <p className="text-gray-500">Receive an instant, legally verifiable PDF certificate with a unique serial number.</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: IMPACT STATS (DYNAMIC) --- */}
      <section id="impact" className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Impact, Real Time.</h2>
            <p className="text-gray-600 mb-6 text-lg">
              EcoTrade isn't just a marketplace; it's a movement. We track every ton offset in our live database, ensuring total transparency.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <Globe className="text-blue-500 mr-3" /> Projects across 3 Continents
              </li>
              <li className="flex items-center text-gray-700">
                <ShieldCheck className="text-green-500 mr-3" /> Gold Standard Verified
              </li>
              <li className="flex items-center text-gray-700">
                <TrendingUp className="text-purple-500 mr-3" /> Live Transaction Ledger
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            
            {/* LIVE TONS SOLD */}
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-green-600 mb-2 flex justify-center items-center">
                 {loading ? <Loader2 className="animate-spin" /> : stats.total_tons}
              </div>
              <div className="text-sm text-gray-500">Tons Offset (Live)</div>
            </div>
            
            {/* VALUE GENERATED (Estimated at $10/ton avg) */}
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex justify-center items-center">
                 {loading ? <Loader2 className="animate-spin" /> : `$${(stats.total_tons * 10).toLocaleString()}`} 
              </div>
              <div className="text-sm text-gray-500">Value Generated</div>
            </div>
            
            {/* ACTIVE PROJECTS */}
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2 flex justify-center items-center">
                {loading ? <Loader2 className="animate-spin" /> : stats.total_projects}
              </div>
              <div className="text-sm text-gray-500">Active Projects</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">0%</div>
              <div className="text-sm text-gray-500">Hidden Fees</div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: PRICING --- */}
      <section id="pricing" className="scroll-mt-24 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-gray-600">Most of your money goes to the planet. We keep the lights on.</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Tier */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Project Developer</h3>
                <div className="text-4xl font-bold text-gray-900 mt-4 mb-2">85% <span className="text-lg font-normal text-gray-500">of funds</span></div>
                <p className="text-gray-500 mb-6">Directly funds the solar, wind, or forestry initiative.</p>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center"><ShieldCheck size={16} className="mr-2 text-green-500"/> Infrastructure maintenance</li>
                    <li className="flex items-center"><ShieldCheck size={16} className="mr-2 text-green-500"/> Local community jobs</li>
                    <li className="flex items-center"><ShieldCheck size={16} className="mr-2 text-green-500"/> Expansion of capacity</li>
                </ul>
            </div>

            {/* Platform Tier */}
            <div className="bg-white p-8 rounded-2xl border-2 border-green-500 relative">
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">EcoTrade Fee</div>
                <h3 className="text-xl font-bold text-gray-900">Platform & Audit</h3>
                <div className="text-4xl font-bold text-gray-900 mt-4 mb-2">15% <span className="text-lg font-normal text-gray-500">service fee</span></div>
                <p className="text-gray-500 mb-6">Covers verification costs, secure hosting, and PDF generation.</p>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center"><ShieldCheck size={16} className="mr-2 text-green-500"/> 24/7 Platform uptime</li>
                    <li className="flex items-center"><ShieldCheck size={16} className="mr-2 text-green-500"/> Third-party verification API</li>
                    <li className="flex items-center"><ShieldCheck size={16} className="mr-2 text-green-500"/> Secure Stripe payments</li>
                </ul>
            </div>
        </div>
      </section>

    </div>
  );
};

export default MarketingSections;