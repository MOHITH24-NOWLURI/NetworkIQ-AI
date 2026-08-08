# 🚀 NetworkIQ AI

### AI-Powered Supply Chain Intelligence & Inventory Optimization Platform

NetworkIQ AI is an intelligent supply-chain analytics platform designed to help businesses monitor inventory, analyze demand, identify stockout risks, and make smarter warehouse-to-warehouse inventory transfer decisions.

The platform combines a **FastAPI backend**, **React frontend**, data analytics, demand forecasting, inventory analysis, and AI-driven transfer recommendations into a unified dashboard.

---

## 🎯 Problem Statement

Modern supply chains generate large amounts of sales, inventory, demand, and warehouse data. However, identifying inventory shortages, surplus stock, demand patterns, and transfer opportunities manually can be time-consuming and inefficient.

NetworkIQ AI addresses this problem by analyzing supply-chain data and providing actionable insights such as:

- 📦 Inventory levels
- 📈 Demand patterns
- ⚠️ Stockout risks
- 🏢 Warehouse inventory conditions
- 🚚 Warehouse-to-warehouse transfer recommendations
- 🤖 AI-generated business insights

---

## 💡 Key Features

### 📊 Executive Dashboard

A centralized dashboard provides an overview of the supply-chain system, including:

- Total Products
- Total Sales
- Total Profit
- Number of Warehouses
- Total Inventory
- Stockout Risk
- System Status
- Refreshable dashboard data

---

### 📈 Demand & Sales Analytics

NetworkIQ analyzes product demand and sales information through interactive visualizations.

Features include:

- Top-selling product analysis
- Sales trend visualization
- Demand forecasting
- Product-level analytics

---

### 📦 Inventory Intelligence

The inventory module analyzes warehouse stock levels and identifies inventory conditions.

It evaluates:

- Current inventory
- Reorder points
- Demand forecasts
- Low-stock conditions
- Inventory health
- Stockout risk

---

### 🤖 AI Inventory Recommendations

NetworkIQ generates inventory recommendations based on warehouse inventory conditions and demand requirements.

The system identifies:

- Warehouses requiring inventory
- Warehouses with surplus inventory
- Products requiring transfers
- Recommended transfer quantities
- Transfer priorities
- Reasoning behind recommendations

---

### 🚚 Smart Inventory Transfer

The transfer engine identifies suitable source and destination warehouses for inventory movement.

For each recommendation, the system can provide:

| Field | Description |
|---|---|
| SKU | Product identifier |
| From Warehouse | Warehouse providing inventory |
| To Warehouse | Warehouse receiving inventory |
| Transfer Quantity | Recommended quantity to transfer |
| Source Inventory | Current inventory at source |
| Destination Inventory | Current inventory at destination |
| Demand Forecast | Expected demand |
| Priority | HIGH / MEDIUM / LOW |
| Recommendation | Recommended action |
| Reason | Explanation for the recommendation |

---

### 🚨 AI Supply Chain Alerts

The dashboard highlights important inventory situations using priority levels:

- 🔴 **HIGH** – Critical inventory situation
- 🟠 **MEDIUM** – Requires attention
- 🟢 **LOW** – Lower-priority situation

This helps users focus on the most important supply-chain decisions first.

---

### 🧠 AI Business Insights

NetworkIQ converts analytical results into easy-to-understand business insights covering:

- Inventory conditions
- Profit
- Warehouse status
- Stockout risk
- Transfer recommendations
- Supply-chain actions

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────────┐
                    │       Supply Chain       │
                    │          Data            │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Data Processing      │
                    │   Pandas / Python        │
                    └────────────┬─────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
      Demand Analysis      Inventory Analysis   Transfer Engine
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       FastAPI API        │
                    │         Backend          │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      React Frontend      │
                    │    NetworkIQ Dashboard   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ AI Insights & Decision   │
                    │        Support           │
                    └──────────────────────────┘
 🛠️ Technology Stack
Frontend
React
Vite
JavaScript
React Router
Recharts
HTML5
CSS
Backend
Python
FastAPI
Pandas
Uvicorn
Data & Analytics
CSV datasets
Pandas DataFrames
Inventory analysis
Demand forecasting
Supply-chain analytics
Development Tools
Git
GitHub
Visual Studio Code
PowerShell
📁 Project Structure
NetworkIQ-AI/
│
├── backend/
│   ├── app.py
│   ├── check_data.py
│   ├── cost_agent.py
│   ├── dashboard.py
│   ├── demand_agent.py
│   ├── explain_agent.py
│   ├── inventory_agent.py
│   ├── optimizer.py
│   ├── requirements.txt
│   ├── test_loader.py
│   ├── transfer_agent.py
│   └── utils.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIAlerts.jsx
│   │   │   ├── AIInsights.jsx
│   │   │   ├── InventoryPieChart.jsx
│   │   │   ├── RecommendationTable.jsx
│   │   │   ├── SalesTrend.jsx
│   │   │   └── TopProductsChart.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   └── Sales.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── datasets/
│   ├── High Demand Supply inventory dataset.zip
│   ├── Indian-Store-Demand.zip
│   ├── store_sales_data (2).csv
│   └── supply_chain_dataset1.csv
│
├── .gitignore
└── README.md
🔌 API Endpoints

The FastAPI backend currently provides the following endpoints:

Endpoint	Purpose
GET /	API status
GET /dashboard	Dashboard KPIs
GET /demand	Demand analysis
GET /inventory	Inventory analysis
GET /recommendations	AI transfer recommendations
⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/MOHITH24-NOWLURI/NetworkIQ-AI.git
cd NetworkIQ-AI
🐍 Backend Setup

Navigate to the backend:

cd backend

Create a virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn app:app --reload

The backend will be available at:

http://127.0.0.1:8000
⚛️ Frontend Setup

Open another terminal.

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will be available at the local URL provided by Vite.

📊 Dashboard Modules

The NetworkIQ dashboard contains:

🚀 NetworkIQ AI
│
├── 📊 Demand & Sales Analytics
│   ├── Top Selling Products
│   └── Sales Trend
│
├── 📦 Inventory Intelligence
│   └── Inventory Health
│
└── 🤖 AI Decision Support
    ├── Supply Chain Alerts
    ├── SKU Recommendations
    └── AI Business Insights
🔄 AI Recommendation Workflow
Inventory Data
      │
      ▼
Latest SKU + Warehouse Records
      │
      ▼
Identify Low-Stock Warehouses
      │
      ▼
Identify Surplus Warehouses
      │
      ▼
Calculate Inventory Shortage
      │
      ▼
Analyze Demand Pressure
      │
      ▼
Calculate Transfer Quantity
      │
      ▼
Assign Priority
      │
      ▼
Generate Recommendation
      │
      ▼
Display AI Decision Support
🎯 Use Cases

NetworkIQ can support:

Retail supply-chain management
Warehouse inventory monitoring
Stockout prevention
Inventory redistribution
Demand analysis
Supply-chain decision support
Business intelligence dashboards
🔮 Future Enhancements

Potential future improvements include:

Advanced machine-learning demand forecasting
Real-time inventory integration
Automated transfer approval
Supplier risk analysis
Inventory cost optimization
Delivery-time prediction
Natural-language AI assistant
Explainable AI recommendations
Cloud deployment
Authentication and role-based access
Real-time notifications
                    │ AI Insights & Decision   │
                    │        Support           │
                    └──────────────────────────┘
