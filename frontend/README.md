# 🌍 EcoTrade: The Transparent Carbon Offset Marketplace

> **Winner-Ready Hackathon Project** | _"Making Climate Action Verifiable"_

EcoTrade is a Next-Gen platform that democratizes access to verified Carbon Credits. Unlike traditional opaque markets, EcoTrade provides **instant transparency, real-time tracking, and dynamic certification** for every ton of CO2 retired.

---

## 🚀 Key Features (Why This Matters)

### 1. 🛡️ Role-Based Access Control (RBAC)
- **Security First:** Implemented a secure "Admin vs. Buyer" architecture.
- **Admin Vault:** Only authorized personnel (verified via Environment Variables) can add or remove projects from the inventory.
- **Buyer Safety:** Regular users can browse and purchase but are strictly blocked from sensitive admin routes.

### 2. 🛡️ Trust-First Architecture
- **Real-Time Verification:** Every purchase generates a unique serial number tied to the specific project registry.
- **Dynamic Certification:** Users receive a custom, legally valid PDF certificate generated instantly upon purchase.

### 3. 📊 Interactive Impact Dashboard
- **Visual Analytics:** Buyers can track their total offset history and environmental impact via interactive charts.
- **Live Inventory:** Real-time updates on available credits from projects like *Mysore Solar Park* and *Rajasthan Wind Farm*.

---

## 🛠️ Tech Stack

**Frontend:**
- **React + Vite:** For blazing fast performance.
- **Tailwind CSS:** For a modern, responsive mobile-first UI.
- **Clerk Auth:** Enterprise-level security for user management.
- **jsPDF:** Client-side dynamic document generation.

**Backend:**
- **Node.js & Express:** Scalable REST API architecture.
- **MongoDB Atlas:** Cloud-native database for managing Orders and Inventory.
- **Security Middleware:** Custom verification logic to protect API endpoints.

---

## ⚡ Getting Started (Local Dev)

**1. Clone the Repo**
```bash
git clone [https://github.com/YOUR_USERNAME/EcoTrade.git](https://github.com/YOUR_USERNAME/EcoTrade.git)
cd EcoTrade