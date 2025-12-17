import React, { useEffect, useState } from 'react';
import API from '../api';
import { useUser } from "@clerk/clerk-react"; 
import { LayoutDashboard, DollarSign, Leaf, ShoppingBag, Plus, Trash2, X } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- ANIMATED COUNTER COMPONENT ---
// This handles the smooth 0 -> Target number transition
const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 2000; // 2 seconds animation
    const endValue = parseInt(value, 10) || 0;

    if (endValue === 0) return;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      
      // Easing logic: "easeOutExpo" (Fast start, smooth stop)
      const percentage = Math.min(progress / duration, 1);
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const currentCount = Math.floor(endValue * easeProgress);
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure we land exactly on the target
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const AdminDashboard = () => {
  const { user } = useUser(); 
  
  // --- STATE ---
  const [stats, setStats] = useState({ total_tons: 0, total_projects: 0, total_revenue: 0, active_orders: 0 });
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    price_per_ton: '',
    available_tons: '',
    image_url: '',
    location: '',
    type: 'Solar'
  });

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
      const [statsRes, projectsRes] = await Promise.all([
        API.get('/stats'),
        API.get('/projects')
      ]);

      setStats({
        total_tons: statsRes.data.total_tons || 0,
        total_projects: statsRes.data.total_projects || 0,
        total_revenue: (statsRes.data.total_tons * 15) || 0, 
        active_orders: 24 // Mocking active orders for now
      });
      
      setProjects(projectsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`, {
        data: { user_email: user?.primaryEmailAddress?.emailAddress }
      });
      fetchData(); 
    } catch (err) {
      alert("Failed to delete project. Are you Admin?");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects', {
        ...newProject,
        user_email: user?.primaryEmailAddress?.emailAddress
      });
      
      setShowAddModal(false);
      setNewProject({ title: '', description: '', price_per_ton: '', available_tons: '', image_url: '', location: '', type: 'Solar' });
      fetchData(); 
      alert("Project Created Successfully! 🚀");
    } catch (err) {
      console.error(err);
      alert("Error creating project. Check if you are logged in as Admin.");
    }
  };

  // --- CHART CONFIG ---
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [4200, 3000, 2000, 2780, 1890, 2390],
        backgroundColor: 'rgba(22, 163, 74, 0.8)',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Seller Analytics</h2>
          <p className="text-gray-500 mt-1">Overview of your environmental impact and sales.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium flex items-center hover:bg-gray-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" /> Add New Project
        </button>
      </div>

      {/* STATS CARDS (Now with Animations) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* REVENUE CARD */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition animate-in zoom-in duration-500 delay-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><DollarSign size={24} /></div>
            <div>
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter value={stats.total_revenue} prefix="$" />
                </h3>
            </div>
          </div>
        </div>

        {/* CO2 CARD */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition animate-in zoom-in duration-500 delay-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Leaf size={24} /></div>
            <div>
                <p className="text-sm text-gray-500 font-medium">CO2 Offset</p>
                <h3 className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter value={stats.total_tons} suffix=" Tons" />
                </h3>
            </div>
          </div>
        </div>

        {/* ORDERS CARD */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition animate-in zoom-in duration-500 delay-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><ShoppingBag size={24} /></div>
            <div>
                <p className="text-sm text-gray-500 font-medium">Active Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter value={stats.active_orders} />
                </h3>
            </div>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm mb-8 animate-in fade-in duration-700 delay-300">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview</h3>
        <div className="h-64 w-full">
           <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* MANAGE INVENTORY */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm animate-in fade-in duration-700 delay-500">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Manage Inventory</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 text-xs font-bold text-gray-500 uppercase">Project Name</th>
                <th className="py-4 text-xs font-bold text-gray-500 uppercase">Location</th>
                <th className="py-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                <th className="py-4 text-xs font-bold text-gray-500 uppercase">Price / Ton</th>
                <th className="py-4 text-xs font-bold text-gray-500 uppercase">Available</th>
                <th className="py-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="border-b border-gray-100 hover:bg-white/50 transition">
                  <td className="py-4 font-medium text-gray-900">{p.title}</td>
                  <td className="py-4 text-gray-600">{p.location || 'Global'}</td>
                  <td className="py-4 text-gray-600">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                         p.type === 'Solar' ? 'bg-yellow-100 text-yellow-700' : 
                         p.type === 'Wind' ? 'bg-blue-100 text-blue-700' : 
                         'bg-green-100 text-green-700'
                     }`}>
                         {p.type}
                     </span>
                  </td>
                  <td className="py-4 font-bold text-green-600">${p.price_per_ton}</td>
                  <td className="py-4 text-gray-600">{p.available_tons} Tons</td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => handleDelete(p._id)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan="6" className="py-8 text-center text-gray-400">No projects found. Add one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD PROJECT MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Project</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              
              {/* Title & Type */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <input type="text" required className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                      value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} placeholder="e.g. Gujarat Solar Park" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select className="w-full p-3 rounded-xl border border-gray-200 outline-none bg-white"
                        value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})}>
                        <option value="Solar">Solar</option>
                        <option value="Wind">Wind</option>
                        <option value="Hydro">Hydro</option>
                        <option value="Nature">Nature / Forestry</option>
                    </select>
                  </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows="3" className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                  value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} 
                  placeholder="Describe the impact..." />
              </div>

              {/* Location & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" required className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                    value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} placeholder="e.g. India" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" required className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                    value={newProject.price_per_ton} onChange={e => setNewProject({...newProject, price_per_ton: e.target.value})} />
                </div>
              </div>

              {/* Volume & Image */}
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Volume (Tons)</label>
                  <input type="number" required className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                    value={newProject.available_tons} onChange={e => setNewProject({...newProject, available_tons: e.target.value})} />
                </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                   <input type="text" placeholder="https://..." className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                     value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg mt-4">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;