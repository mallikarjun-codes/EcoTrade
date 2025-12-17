import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Leaf, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import AddProjectForm from './AddProjectForm'; 
import API from '../api'; // Import API to fetch/delete

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
];

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]); // <--- State for Projects

  // 1. Fetch Projects on Load
  const loadProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  // 2. Delete Logic
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      loadProjects(); // Refresh list
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {showForm && (
        <AddProjectForm 
          onClose={() => setShowForm(false)} 
          onProjectAdded={loadProjects} // Refresh list after adding
        />
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Seller Analytics</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-gray-900 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center transition-colors shadow-lg"
        >
          <Plus size={20} className="mr-2" /> Add New Project
        </button>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Revenue" value="$12,450" icon={DollarSign} color="blue" />
        <StatCard title="CO2 Offset" value="840 Tons" icon={Leaf} color="green" />
        <StatCard title="Active Orders" value="24" icon={ShoppingBag} color="purple" />
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 mb-8">
        <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* NEW: Project Management Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">Manage Inventory</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="p-4">Project Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{p.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    p.type === 'Solar' ? 'bg-yellow-100 text-yellow-800' :
                    p.type === 'Forestry' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {p.type}
                  </span>
                </td>
                <td className="p-4">${p.price_per_ton}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
    <div className={`p-4 rounded-full bg-${color}-50 text-${color}-600 mr-4`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;