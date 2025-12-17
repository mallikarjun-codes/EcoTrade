require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// --- DATA MODELS ---
// 1. Project Schema (The Inventory)
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

// 2. Order Schema (The Transaction History)
const orderSchema = new mongoose.Schema({
  user_email: String,
  user_name: String,
  project_id: String,
  project_title: String,
  quantity_tons: Number,
  total_price: Number,
  registry_serial_number: String,
  date: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// --- SECURITY MIDDLEWARE (THE VAULT LOCK) ---
// This blocks anyone who is not the Admin from modifying data.
const verifyAdmin = (req, res, next) => {
  const userEmail = req.body.user_email || req.headers['x-user-email'];
  const adminEmail = process.env.ADMIN_EMAIL;

  // Simple check: Does the email match the Owner's email?
  if (!userEmail || userEmail !== adminEmail) {
    console.log(`⚠️ Unauthorized Access Attempt by: ${userEmail}`);
    return res.status(403).json({ error: "Access Denied: Admins only." });
  }
  next();
};

// --- API ROUTES ---

// 1. GET ALL PROJECTS (Public - Anyone can see)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ADD NEW PROJECT (SECURED - Admin Only)
// Notice the 'verifyAdmin' inserted before the async function
app.post('/api/projects', verifyAdmin, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. DELETE PROJECT (SECURED - Admin Only)
app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CREATE ORDER (Public - Anyone can buy)
app.post('/api/orders', async (req, res) => {
  try {
    // Generate a fake "Registry Serial Number" (e.g., VCU-192837)
    const serial = `VCU-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newOrder = new Order({
      ...req.body,
      registry_serial_number: serial
    });
    
    await newOrder.save();
    
    // Optional: Decrease inventory (simple version)
    // await Project.findByIdAndUpdate(req.body.project_id, { $inc: { available_tons: -req.body.quantity_tons }});

    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET ORDER BY ID (Public - For the Tracker Page)
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});