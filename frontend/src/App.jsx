import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { fetchProjects, createOrder } from './api';
import ProjectCard from './components/ProjectCard';
import ComparisonModal from './components/ComparisonModal';
import PaymentModal from './components/PaymentModal'; 
import AdminDashboard from './components/AdminDashboard'; 
import OrderPage from './components/OrderPage'; 
import ProtectedAdminRoute from './components/ProtectedAdminRoute'; // <--- NEW IMPORT
import { Loader2, ArrowRightLeft, LayoutDashboard, Store } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

// --- LANDING PAGE (Logged Out) ---
const LandingPage = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
    <div className="relative z-10 max-w-2xl">
      <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-6 shadow-lg shadow-green-500/20"></div>
      <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Eco<span className="text-green-500">Trade</span></h1>
      <p className="text-gray-400 text-lg mb-8">The transparent, verifiable marketplace for carbon offsets.</p>
      <SignInButton mode="modal">
        <button className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl">
          Start Offsetting Now
        </button>
      </SignInButton>
    </div>
  </div>
);

// --- MARKETPLACE COMPONENT (The Main Store) ---
const Marketplace = () => {
  const { user } = useUser();
  const navigate = useNavigate(); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  
  // Payment States
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then(res => { 
        setProjects(res.data); 
        setLoading(false); 
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false); 
      });
  }, []);

  const handleBuyClick = (project) => {
    setShowCompareModal(false);
    setSelectedProject(project);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const orderData = {
        project_id: selectedProject._id,
        user_email: user.primaryEmailAddress?.emailAddress,
        user_name: user.fullName,
        quantity_tons: 10,
        total_price: selectedProject.price_per_ton * 10,
        project_title: selectedProject.title
      };
      
      const response = await createOrder(orderData);
      
      setShowPayment(false); 
      navigate(`/order/${response.data._id}`); 

    } catch (error) {
      alert("Order Failed!");
      console.error(error);
      setShowPayment(false);
    }
  };

  const toggleCompareMode = () => { setCompareMode(!compareMode); setSelectedForCompare([]); };
  const handleToggleCompare = (project) => {
    if (selectedForCompare.find(p => p._id === project._id)) {
      setSelectedForCompare(selectedForCompare.filter(p => p._id !== project._id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, project]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Payment Modal */}
      {showPayment && selectedProject && (
        <PaymentModal 
          project={selectedProject} 
          user={user}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <ComparisonModal projects={selectedForCompare} onClose={() => setShowCompareModal(false)} onBuy={handleBuyClick} />
      )}
      
      {/* Floating Action Button (Responsive) */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-40 flex items-center gap-4 animate-in slide-in-from-bottom-10 w-max max-w-[90%]">
          <span className="font-bold text-sm whitespace-nowrap">{selectedForCompare.length} Selected</span>
          {selectedForCompare.length === 2 && (
            <button onClick={() => setShowCompareModal(true)} className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-full text-sm font-bold flex items-center whitespace-nowrap">
              Compare <ArrowRightLeft size={14} className="ml-2"/>
            </button>
          )}
        </div>
      )}

      {/* RESPONSIVE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}! 👋</h2>
          <p className="text-gray-500 text-sm">Verified carbon credits available today.</p>
        </div>
        <button 
          onClick={toggleCompareMode}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center border w-full sm:w-auto justify-center ${compareMode ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          <ArrowRightLeft size={16} className="mr-2" />
          {compareMode ? 'Exit Compare' : 'Compare Projects'}
        </button>
      </div>

      {loading ? <div className="flex justify-center h-64"><Loader2 className="animate-spin text-green-600" size={48} /></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              onBuy={handleBuyClick}
              isCompareMode={compareMode}
              isSelected={!!selectedForCompare.find(p => p._id === project._id)}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN LAYOUT & ROUTER ---
function App() {
  const { isLoaded, user } = useUser(); // <--- Ensure 'user' is destructured here for the check
  const navigate = useNavigate();

  if (!isLoaded) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-green-600" size={48} /></div>;
 
  return (
    <>
      <SignedOut><LandingPage /></SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-transparent text-gray-900 font-sans">
          {/* Global Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                 <div className="w-8 h-8 bg-green-600 rounded-lg mr-3"></div>
                 <h1 className="text-xl font-bold">EcoTrade</h1>
              </div>
              <div className="flex items-center gap-4">
                {/* 1. Market Link (Always Visible) */}
                <Link to="/" className="text-sm font-medium text-gray-600 hover:text-green-600 flex items-center p-2">
                  <Store size={20} />
                  <span className="hidden sm:inline ml-2">Market</span>
                </Link>

                {/* 2. Dashboard Link (SECURED: Only visible if Admin) */}
                {user?.primaryEmailAddress?.emailAddress === import.meta.env.VITE_ADMIN_EMAIL && (
                  <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-green-600 flex items-center mr-2 p-2">
                    <LayoutDashboard size={20} />
                    <span className="hidden sm:inline ml-2">Dashboard</span>
                  </Link>
                )}

                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Marketplace />} />
            
            {/* 3. Protected Route (SECURED: Only accessible if Admin) */}
            <Route 
              path="/admin" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
            
            <Route path="/order/:id" element={<OrderPage />} />
          </Routes>
        </div>
      </SignedIn>
    </>
  );
}

export default App;