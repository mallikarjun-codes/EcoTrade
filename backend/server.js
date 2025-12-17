require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// --- DATA MODELS ---

// 1. Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  price_per_ton: Number,
  available_tons: Number,
  image_url: String,
  location: String,
  type: String
});
const Project = mongoose.model('Project', projectSchema);

// 2. Order Schema
const orderSchema = new mongoose.Schema({
  user_email: String,
  user_name: String,
  project_id: String,
  project_title: String,
  quantity_tons: Number,
  total_price: Number,
  registry_serial_number: String,
  transaction_hash: String, 
  date: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// --- SECURITY MIDDLEWARE ---
const verifyAdmin = (req, res, next) => {
  const userEmail = req.body.user_email || req.headers['x-user-email'];
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!userEmail || userEmail !== adminEmail) {
    return res.status(403).json({ error: "Access Denied: Admins only." });
  }
  next();
};

// --- API ROUTES ---

// 1. GET ALL PROJECTS
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ADD NEW PROJECT (SECURED)
app.post('/api/projects', verifyAdmin, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. DELETE PROJECT (SECURED)
app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CREATE ORDER (With Cryptographic Hash)
app.post('/api/orders', async (req, res) => {
  try {
    const serial = `VCU-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Create Unique Hash
    const dataToHash = req.body.user_email + req.body.project_id + Date.now().toString();
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    
    const newOrder = new Order({
      ...req.body,
      registry_serial_number: serial,
      transaction_hash: hash 
    });
    
    await newOrder.save();
    
    // Decrease inventory
    await Project.findByIdAndUpdate(req.body.project_id, { $inc: { available_tons: -req.body.quantity_tons }});

    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET ORDER BY ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. GET PLATFORM STATS
app.get('/api/stats', async (req, res) => {
  try {
    const orders = await Order.find();
    const projects = await Project.find();
    
    const totalTons = orders.reduce((sum, order) => sum + order.quantity_tons, 0);
    
    res.json({
      total_tons: totalTons,
      total_projects: projects.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. GET PUBLIC REGISTRY (The Ledger - NEW)
app.get('/api/registry', async (req, res) => {
  try {
    // Fetch latest 20 orders, sorted by newest first
    const orders = await Order.find().sort({ date: -1 }).limit(20);
    
    // Return only public data (Hide emails!)
    const registryData = orders.map(order => ({
      _id: order._id,
      project_title: order.project_title,
      quantity_tons: order.quantity_tons,
      // Anonymize name: "Sarvesh M." -> "Sarv***"
      user_name: order.user_name ? order.user_name.substring(0, 4) + "***" : "Anon***",
      date: order.date,
      registry_serial_number: order.registry_serial_number,
      transaction_hash: order.transaction_hash
    }));
    
    res.json(registryData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});