const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  
  project_title: String, // <--- ADD THIS LINE HERE
  
  user_email: { type: String, required: true }, 
  quantity_tons: { type: Number, required: true },
  total_price: Number,
  purchase_date: { type: Date, default: Date.now },
  
  status: { 
    type: String, 
    enum: ['processing', 'allocating', 'retiring', 'certified'], 
    default: 'processing' 
  },
  
  registry_serial_number: String, 
  certificate_url: String
});

module.exports = mongoose.model('Order', OrderSchema);