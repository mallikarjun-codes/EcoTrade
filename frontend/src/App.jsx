import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { fetchProjects, createOrder } from './api';
import ProjectCard from './components/ProjectCard';
import ComparisonModal from './components/ComparisonModal';
import PaymentModal from './components/PaymentModal'; 
import AdminDashboard from './components/AdminDashboard'; 
import OrderPage from './components/OrderPage'; 
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Footer from './components/Footer'; 
import MarketingSections from './components/MarketingSections'; 
import Registry from './components/Registry'; 
import { Loader2, ArrowRightLeft, LayoutDashboard, Store, Leaf, Globe } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

// --- LANDING PAGE (Logged Out) ---
const LandingPage = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
    <div className="relative z-10 max-w-2xl">
      <div className="mx-auto mb-6 flex justify-center">
        <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <Leaf className="text-white w-10 h-10" />
        </div>
      </div>
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

// --- MARKETPLACE COMPONENT ---
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
  
  // Quantity State
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    fetchProjects()
      .then(res => { setProjects(res.data); setLoading(false); })
      .catch(err => { console.error("API Error:", err); setLoading(false); });
  }, []);

  // Handler: Buy Click
  const handleBuyClick = (project, quantity = 1) => {
    setShowCompareModal(false);
    setSelectedProject(project);
    setSelectedQuantity(quantity); 
    setShowPayment(true);
  };

  // Handler: Payment Success
  const handlePaymentSuccess = async (purchasedQuantity) => {
    try {
      const finalQuantity = purchasedQuantity || 1;
      const finalPrice = selectedProject.price_per_ton * finalQuantity;

      const orderData = {
        project_id: selectedProject._id,
        user_email: user.primaryEmailAddress?.emailAddress,
        user_name: user.fullName,
        quantity_tons: finalQuantity, 
        total_price: finalPrice,      
        project_title: selectedProject.title
      };
      
      const response = await createOrder(orderData);
      setShowPayment(false); 
      
      alert(`Success! 🚀\n\nYou have successfully offset ${finalQuantity} tons.\nTotal Paid: $${finalPrice}`);
      navigate(`/order/${response.data._id}`); 
    } catch (error) {
      console.error(error);
      alert("Order Failed! Please try again.");
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
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">
      {/* Modals */}
      {showPayment && selectedProject && (
        <PaymentModal 
            project={selectedProject} 
            user={user} 
            quantity={selectedQuantity} 
            onClose={() => setShowPayment(false)} 
            onSuccess={handlePaymentSuccess}
        />
      )}
      {showCompareModal && (
        <ComparisonModal projects={selectedForCompare} onClose={() => setShowCompareModal(false)} onBuy={handleBuyClick} />
      )}
      
      {/* Floating Action Button */}
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

      {/* Header Section */}
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

      {/* --- MARKETING SECTIONS --- */}
      <MarketingSections />

    </div>
  );
};

// --- MAIN LAYOUT ---
function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-green-600" size={48} /></div>;

  return (
    <>
      <SignedOut><LandingPage /></SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-transparent text-gray-900 font-sans flex flex-col">
          
          {/* --- GLOBAL HEADER --- */}
          <header className="navbar-bg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              
              {/* Logo Side - UNTOUCHED */}
              <div className="flex items-center cursor-pointer gap-2 hover:opacity-80 transition" onClick={() => navigate('/')}>
                 <Leaf className="text-green-600 w-6 h-6" />
                 <h1 className="text-xl font-bold tracking-tight text-gray-900">EcoTrade</h1>
              </div>

              {/* Center Links - UNTOUCHED */}
              <div className="hidden md:flex items-center gap-2">
                <a href="#how-it-works" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all">How it Works</a>
                <a href="#impact" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all">Impact</a>
                <a href="#pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all">Pricing</a>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                
                {/* REGISTRY LINK - FIXED TO SHOW ON MOBILE */}
                <Link to="/registry" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all group">
                  <Globe size={18} className="mr-2 text-gray-400 group-hover:text-green-600 transition-colors" />
                  <span className="relative top-[1px] hidden sm:inline">Registry</span>
                  <span className="ml-2 flex items-center justify-center bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 shadow-sm">
                    NEW
                  </span>
                </Link>

                <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all">
                  <Store size={20} />
                  <span className="hidden sm:inline ml-2">Market</span>
                </Link>

                {/* DEMO MODE: ALWAYS SHOW ADMIN LINK */}
                {isSignedIn && (
                  <Link to="/admin" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all">
                    <LayoutDashboard size={20} />
                    <span className="hidden sm:inline ml-2">Admin</span> 
                  </Link>
                )}

                <div className="ml-2 pl-2 border-l border-gray-200">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/registry" element={<Registry />} />
            <Route path="/admin" element={
                <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
            }/>
            <Route path="/order/:id" element={<OrderPage />} />
          </Routes>
          
          <Footer />
        </div>
      </SignedIn>
    </>
  );
}

export default App;