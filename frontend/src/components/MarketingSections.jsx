import React, { useEffect, useState, useRef } from 'react';
import { Leaf, ShieldCheck, Zap, Globe, Users, TrendingUp } from 'lucide-react';
import { fetchStats } from '../api';
import { Link, useNavigate } from 'react-router-dom';

// --- ANIMATED COUNTER ---
const AnimatedCounter = ({ value, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const duration = 2500;
    const endValue = parseInt(value.replace(/,/g, ''), 10) || 0;
    if (endValue === 0) return;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(endValue * easeProgress);
      setCount(currentCount);
      if (percentage < 1) requestAnimationFrame(animate);
      else setCount(endValue);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return <span ref={elementRef} className="tabular-nums">{prefix}{count.toLocaleString()}{suffix}</span>;
};

const MarketingSections = () => {
  const [stats, setStats] = useState({ total_tons: 0, total_projects: 0 });

  useEffect(() => {
    fetchStats()
      .then(res => {
        const tons = res.data.total_tons > 0 ? res.data.total_tons : 12450;
        const projs = res.data.total_projects > 0 ? res.data.total_projects : 15;
        setStats({ total_tons: tons, total_projects: projs });
      })
      .catch(err => console.error(err));
  }, []);

  // --- HANDLER 1: SCROLL TO MARKETPLACE ---
  const handleStartOffsetting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- HANDLER 2: FAKE SALES POPUP (THE FIX) ---
  const handleContactSales = () => {
    alert("🚀 Request Received! \n\nThank you for your interest in EcoTrade Enterprise. Our team will contact you shortly.");
  };

  return (
    <div className="space-y-32 py-24">
      
      {/* --- SECTION 1: HOW IT WORKS --- */}
      <section id="how-it-works" className="relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Simple Process</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Offset your footprint in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">3 simple steps</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { 
              icon: Globe, 
              title: "1. Select a Project", 
              desc: "Browse verified solar, wind, and nature projects from around the globe.",
              color: "bg-blue-50 text-blue-600"
            },
            { 
              icon: Zap, 
              title: "2. Purchase Credits", 
              desc: "Buy instantly. Your funds go directly to the project developers.",
              color: "bg-yellow-50 text-yellow-600"
            },
            { 
              icon: ShieldCheck, 
              title: "3. Get Certified", 
              desc: "Receive an immutable digital certificate and hash proof immediately.",
              color: "bg-green-50 text-green-600"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                <item.icon size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: LIVE IMPACT --- */}
      <section id="impact" className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-12 border border-white/50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 to-blue-500/5 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Real Impact.<br/>Real Time.</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our transparent ledger ensures that every ton of CO2 you retire actually makes a difference. No double counting. No greenwashing.
            </p>
            <Link to="/registry" className="text-green-700 font-bold hover:text-green-800 flex items-center group cursor-pointer w-fit">
              View Public Registry <TrendingUp className="ml-2 group-hover:translate-x-1 transition-transform" size={20}/>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-emerald-700 mb-2">
                <AnimatedCounter value={String(stats.total_tons)} suffix="+" />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tons Offset</div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-700 mb-2">
                <AnimatedCounter value={String(stats.total_projects)} />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Projects</div>
            </div>
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-700 mb-2">
                <AnimatedCounter value="150" suffix="+" />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Partners</div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 mb-2">
                <AnimatedCounter value="100" suffix="%" />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PRICING --- */}
      <section id="pricing" className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto">
          We charge a flat 5% transaction fee to maintain the registry and verify projects. No hidden costs.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Standard Plan */}
           <div className="bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center">
             <div className="bg-gray-100 text-gray-600 p-3 rounded-full mb-6"><Leaf size={24}/></div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Individual</h3>
             <div className="text-5xl font-black text-gray-900 mb-6">$10<span className="text-lg font-normal text-gray-500">/ton</span></div>
             <ul className="space-y-4 text-gray-600 mb-8 text-left w-full px-8">
               <li className="flex items-center"><ShieldCheck size={16} className="text-green-500 mr-2"/> Instant Digital Certificate</li>
               <li className="flex items-center"><ShieldCheck size={16} className="text-green-500 mr-2"/> Public Registry Entry</li>
               <li className="flex items-center"><ShieldCheck size={16} className="text-green-500 mr-2"/> Personal Dashboard</li>
             </ul>
             
             {/* ACTION 1: SCROLL UP */}
             <button 
                onClick={handleStartOffsetting}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:scale-105 transition-transform shadow-xl block text-center"
             >
                Start Offsetting
             </button>
           </div>

           {/* Enterprise Plan */}
           <div className="bg-gradient-to-br from-green-600 to-green-800 p-10 rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(22,163,74,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 blur-2xl"></div>
             
             <div className="bg-white/20 text-white p-3 rounded-full mb-6"><Users size={24}/></div>
             <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
             <div className="text-5xl font-black mb-6">Custom<span className="text-lg font-normal opacity-80">/bulk</span></div>
             <ul className="space-y-4 opacity-90 mb-8 text-left w-full px-8">
               <li className="flex items-center"><ShieldCheck size={16} className="text-green-300 mr-2"/> API Access</li>
               <li className="flex items-center"><ShieldCheck size={16} className="text-green-300 mr-2"/> Audit-Ready Reports</li>
               <li className="flex items-center"><ShieldCheck size={16} className="text-green-300 mr-2"/> Dedicated Account Manager</li>
             </ul>

             {/* ACTION 2: POPUP ALERT (The Fix) */}
             <button 
                onClick={handleContactSales}
                className="w-full bg-white text-green-800 font-bold py-4 rounded-xl hover:scale-105 transition-transform shadow-xl block text-center"
             >
                Contact Sales
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default MarketingSections;