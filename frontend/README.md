# 🌿 EcoTrade: The CSR Compliance Ledger

> **The first fraud-proof, audit-ready carbon marketplace for Corporate Social Responsibility (CSR) compliance.**

---

## 🚀 The Problem
Indian companies spend over **₹25,000 Crore annually** on CSR activities to meet government mandates. Yet, the ecosystem is broken:
* **Black Box Funding:** 40% of funds disappear into "administrative costs" with no trail.
* **Double Counting:** The same "tree" is sold to 5 different companies.
* **Audit Nightmares:** Auditors rely on paper receipts that take weeks to verify.

## 💡 The Solution
**EcoTrade** is a B2B compliance engine that turns carbon offsetting into an immutable digital asset.
1.  **Instant Verification:** Every purchase generates a unique SHA-256 hash.
2.  **Public Registry:** A transparent ledger where anyone can verify a company's claims.
3.  **Audit-Ready Certificates:** Auto-generates PDF proofs compliant with government reporting standards.

---

## ⚡ Key Features

### 1. 🏢 Verified Project Marketplace
* Live inventory of **Solar, Wind, Hydro, and Nature-based** projects.
* Real-time pricing and impact analysis.
* **Feature Highlight:** Side-by-side **Comparison Tool** to analyze price-per-ton vs. impact.

### 2. 🛡️ Immutable Public Registry
* The core of our trust layer.
* Every retired credit is logged publicly with a **Verification Hash**.
* Prevents double-counting by permanently "retiring" the asset ID.

### 3. 📄 Instant CSR Compliance
* Generates a professional **Digital Certificate (PDF)** immediately after purchase.
* Includes "Verra/Gold Standard" verification badges.
* Ready for annual corporate filings.

### 4. 📊 Admin Command Center
* Visual analytics for Revenue, CO2 Offset, and Active Orders.
* Full inventory management (Add/Delete Projects).
* **Demo Mode:** Simplified access for hackathon judges.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Auth:** Clerk (Secure User Management)
* **Tools:** Axios, Chart.js, jsPDF

---

## 👨‍⚖️ Judge's Guide (How to Test)

### **1. Live Demo**
🔗 **[Insert Your Vercel Link Here]**

### **2. Admin Access**
> 🚧 **HACKATHON MODE ENABLED:**
> We have enabled "God Mode" for the demo. **ANY** user who logs in (via Google or Email) will automatically see the **Admin Dashboard** button. No special credentials required!

### **3. Test Flow**
1.  **Login:** Use any account.
2.  **Compare:** Select 2 projects and click "Compare".
3.  **Buy:** Click "Offset Now", select **5 Tons**, and Confirm.
4.  **Verify:** You will be redirected to the **Registry**. Download your PDF Certificate!

---

## 💻 Local Installation

If you want to run this locally:

```bash
# 1. Clone the repository
git clone [https://github.com/mallikarjun-codes/EcoTrade.git](https://github.com/mallikarjun-codes/EcoTrade.git)

# 2. Install Dependencies (We use pnpm!)
cd frontend && pnpm install
cd ../backend && pnpm install

# 3. Setup Environment Variables
# Create a .env file in /backend and add:
# MONGO_URI=your_mongodb_connection_string

# 4. Run the App
# Terminal 1 (Backend):
cd backend && pnpm dev

# Terminal 2 (Frontend):
cd frontend && pnpm dev