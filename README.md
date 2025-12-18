# 🌍 EcoTrade: The Transparent Carbon Offset Marketplace

> _"Making Climate Action Verifiable"_

EcoTrade is a Next-Gen platform that democratizes access to verified Carbon Credits. Unlike traditional opaque markets, EcoTrade provides **instant transparency, real-time tracking, and dynamic certification** for every ton of CO2 retired.

![Project Banner](https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?q=80&w=2560&auto=format&fit=crop) 
*(Note: Replace this link with a screenshot of your Landing Page later)*

---

## 🚀 Key Features (Why This Matters)

### 1. 🛡️ Trust-First Architecture
- **Real-Time Verification:** Every purchase generates a unique serial number tied to the specific project registry.
- **Dynamic Certification:** Users receive a custom, legally valid PDF certificate generated instantly upon purchase.

### 2. 📊 Interactive Impact Dashboard
- **Visual Analytics:** Buyers can track their total offset history and environmental impact via interactive charts.
- **Live Inventory:** Real-time updates on available credits from projects like *Mysore Solar Park* and *Rajasthan Wind Farm*.

### 3. 💳 Seamless "Enterprise-Grade" Payments
- **Secure Checkout:** Integrated simulated payment gateway (Razorpay/Stripe flow) handling currency conversion and fraud checks.
- **State Persistence:** robust session handling ensures no transaction is lost, even on page reloads.

---

## 🛠️ Tech Stack

**Frontend:**
- **React + Vite:** For blazing fast performance.
- **Tailwind CSS:** For a modern, responsive, and clean UI.
- **Framer Motion:** Smooth animations for "delightful" UX.
- **Clerk Auth:** Enterprise-level security for user management.
- **jsPDF:** Client-side dynamic document generation.

**Backend:**
- **Node.js & Express:** Scalable REST API architecture.
- **MongoDB Atlas:** Cloud-native database for managing Orders and Project Inventory.

---

## ⚡ Getting Started (Local Dev)

**1. Clone the Repo**
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/EcoTrade.git
cd EcoTrade
\`\`\`

**2. Install Dependencies**
\`\`\`bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
\`\`\`

**3. Environment Secrets**
Create `.env` files in both folders with your keys (MongoDB, Clerk, Razorpay).

**4. Run It**
\`\`\`bash
# Terminal 1 (Backend)
cd backend && npm run dev

# Terminal 2 (Frontend)
cd frontend && npm run dev
\`\`\`

---

## 🏆 Hackathon Checklist
- [x] **Auth:** Secure Login/Signup
- [x] **Database:** Real-time Inventory Management
- [x] **UX:** animated UI with "Purchase Success" celebration
- [x] **Legal:** Auto-generated PDF Certificates
- [x] **Reliability:** State persistence across reloads

---

*Built with _______________*