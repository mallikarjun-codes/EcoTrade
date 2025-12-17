import React, { useState } from 'react';
import API from '../api'; // Your axios instance
import { Plus, Loader2 } from 'lucide-react';
import { useUser } from "@clerk/clerk-react"; // <--- Import Clerk Hook

const AddProjectForm = ({ onProjectAdded }) => {
  const { user } = useUser(); // <--- Get current user details
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_ton: '',
    available_tons: '',
    image_url: '',
    location: '',
    type: 'Solar' // Default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payload with the User's Email for verification
      const newProject = { 
        ...formData,
        price_per_ton: Number(formData.price_per_ton),
        available_tons: Number(formData.available_tons),
        user_email: user.primaryEmailAddress.emailAddress // <--- CRITICAL SECURITY KEY
      };

      // Send to Backend
      const res = await API.post('/projects', newProject);
      
      // Notify parent component to refresh list
      onProjectAdded(res.data);
      
      // Reset Form
      setFormData({
        title: '',
        description: '',
        price_per_ton: '',
        available_tons: '',
        image_url: '',
        location: '',
        type: 'Solar'
      });
      alert("Project Added Successfully!");

    } catch (error) {
      console.error("Failed to add project:", error);
      // Handle the "Access Denied" error explicitly
      if (error.response && error.response.status === 403) {
        alert("SECURITY ALERT: You are not authorized to add projects.");
      } else {
        alert("Error adding project.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Plus className="mr-2 text-green-600" /> Add New Project
      </h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input 
            type="text" 
            name="title" 
            required
            value={formData.title} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="e.g. Rajasthan Solar Farm"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            required
            value={formData.description} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Short details about the impact..."
            rows="2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price per Ton ($)</label>
          <input 
            type="number" 
            name="price_per_ton" 
            required
            value={formData.price_per_ton} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="15"
          />
        </div>

        {/* Tons Available */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Available Tons</label>
          <input 
            type="number" 
            name="available_tons" 
            required
            value={formData.available_tons} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="1000"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            name="location" 
            required
            value={formData.location} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="e.g. Jaipur, India"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="Solar">Solar</option>
            <option value="Wind">Wind</option>
            <option value="Forestry">Forestry (Reforestation)</option>
            <option value="Biomass">Biomass</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input 
            type="url" 
            name="image_url" 
            required
            value={formData.image_url} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2"/> : <Plus className="mr-2"/>}
            {loading ? "Verifying & Adding..." : "List Project on Marketplace"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProjectForm;