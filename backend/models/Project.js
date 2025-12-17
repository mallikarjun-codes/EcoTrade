const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Forestry', 'Solar', 'Wind', 'Blue Carbon', 'Biomass'], 
    required: true 
  },
  
  // The Financials
  price_per_ton: { type: Number, required: true }, // For Comparator
  currency: { type: String, default: 'USD' },
  
  // The Trust Indicators (CRITICAL for "Trust Gap")
  verification_standard: { type: String, enum: ['VERRA', 'Gold Standard', 'Climate Action Reserve'], required: true },
  vintage_year: { type: Number, required: true },
  location: {
    country: String,
    region: String,
    coordinates: { lat: Number, lng: Number } // For map visualization if we have time
  },

  // The Impact Metrics (For "Comparator")
  sdg_impact: [{ type: Number }], // Array of SDG numbers (e.g., [13, 15, 6])
  co2_tons_available: { type: Number, required: true },
  
  // Visuals
  image_url: { type: String, required: true },
  
  // The "Reviews" Requirement (HACK: We embed them to save time)
  // Instead of "User Reviews", we call them "Auditor Reports"
  auditor_reports: [{
    auditor_name: String,
    audit_date: Date,
    rating: { type: Number, min: 1, max: 10 }, // 10-point check requirement
    summary: String,
    verified: { type: Boolean, default: true }
  }]
});

module.exports = mongoose.model('Project', ProjectSchema);