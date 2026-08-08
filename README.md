# 🚀 NetworkIQ AI

## AI-Powered Multi-Agent Inventory Optimization System for Retail Supply Chains

**NetworkIQ AI** is an intelligent supply-chain analytics and inventory optimization platform that analyzes sales, demand, inventory, and warehouse data to identify inventory risks and recommend smarter stock-transfer decisions.

The platform combines a **Python/FastAPI backend** with a **React-based interactive dashboard** to transform supply-chain data into actionable business insights.

---

## 🎯 Problem Statement

Retail supply chains often face two opposite problems:

* ⚠️ Warehouses running low on inventory
* 📦 Other warehouses holding excess inventory

Without centralized analysis, identifying where inventory should be moved can be difficult and time-consuming.

**NetworkIQ AI** analyzes warehouse-level inventory and demand information to identify these situations and generate data-driven transfer recommendations.

---

## 💡 Key Features

### 📊 Executive Dashboard

Provides a centralized view of important supply-chain KPIs:

* 📦 Total Products
* 💰 Total Sales
* 📈 Total Profit
* 🏢 Number of Warehouses
* 📦 Total Inventory
* ⚠️ Stockout Risk
* 🔄 Refreshable live dashboard data

### 📈 Demand & Sales Analytics

* Top-selling product analysis
* Sales trend visualization
* Demand forecast analysis
* Product-level demand information

### 📦 Inventory Intelligence

Analyzes inventory conditions across warehouses using:

* Current inventory
* Reorder points
* Demand forecasts
* Low-stock detection
* Inventory health indicators
* Stockout risk

### 🚚 AI Inventory Transfer Recommendations

NetworkIQ identifies:

1. Warehouses below their reorder point
2. Warehouses with available surplus inventory
3. Suitable source and destination warehouses
4. Recommended transfer quantities
5. Transfer priority
6. Reasoning behind each recommendation

### 🚨 AI Supply Chain Alerts

The dashboard highlights important recommendations using priority levels:

* 🔴 **HIGH** — Higher-priority inventory situation
* 🟠 **MEDIUM** — Requires attention
* 🟢 **LOW** — Lower-priority situation

### 🧠 AI Business Insights

The dashboard summarizes inventory and supply-chain conditions into business-oriented insights, helping users understand:

* Inventory status
* Profit
* Warehouse conditions
* Stockout risk
* Recommended actions

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │     Supply Chain Data   │
                    │ Sales / Inventory /     │
                    │ Demand / Warehouses     │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Python Data Analysis   │
                    │         Pandas           │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
      Demand Analysis     Inventory Analysis   Transfer Engine
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       FastAPI API       │
                    │         Backend         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      React Frontend     │
                    │    NetworkIQ Dashboard  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ AI Alerts & Decision    │
                    │       Support           │
                    └─────────────────────────┘
```

---

## 🤖 AI Recommendation Workflow

```text
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
Display Decision Support
```

---

## 🛠️ Technology Stack

### Backend

* Python
* FastAPI
* Pandas
* Uvicorn
* REST APIs

### Frontend

* React
* Vite
* JavaScript
* React Router
* Recharts
* HTML5
* CSS

### Data & Analytics

* CSV datasets
* Pandas DataFrames
* Demand analysis
* Inventory analysis
* Reorder-point analysis
* Warehouse-level transfer analysis

### Development

* Visual Studio Code
* Git
* GitHub
* PowerShell

---

## 📁 Project Structure

```text
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
```

---

## 🔌 Backend API

The FastAPI backend exposes the following endpoints:

| Endpoint           | Purpose                            |
| ------------------ | ---------------------------------- |
| `/`                | API status                         |
| `/dashboard`       | Dashboard KPI data                 |
| `/demand`          | Demand analysis                    |
| `/inventory`       | Inventory analysis                 |
| `/recommendations` | Inventory transfer recommendations |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MOHITH24-NOWLURI/NetworkIQ-AI.git
cd NetworkIQ-AI
```

---

## 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

---

## ⚛️ Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

---

## 📊 Dashboard Modules

```text
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
```

---

## 📦 Recommendation Output

A recommendation can contain information such as:

| Field                 | Description                        |
| --------------------- | ---------------------------------- |
| SKU                   | Product identifier                 |
| From Warehouse        | Source warehouse                   |
| To Warehouse          | Destination warehouse              |
| Transfer Quantity     | Suggested quantity                 |
| Source Inventory      | Inventory at source                |
| Destination Inventory | Inventory at destination           |
| Demand Forecast       | Expected demand                    |
| Priority              | HIGH / MEDIUM / LOW                |
| Recommendation        | Suggested action                   |
| Reason                | Explanation for the recommendation |

---

## 🎯 Use Cases

NetworkIQ AI can support:

* Retail inventory monitoring
* Warehouse stock management
* Stockout-risk identification
* Inventory redistribution
* Demand analysis
* Supply-chain analytics
* Warehouse decision support
* Business intelligence

---

## 🔮 Future Enhancements

Potential future improvements include:

* Advanced machine-learning demand forecasting
* Real-time inventory integration
* Automated transfer approval workflows
* Inventory cost optimization
* Supplier risk analysis
* Delivery-time prediction
* Natural-language supply-chain assistant
* Real-time notifications
* Cloud deployment
* Authentication and role-based access

---

## 👨‍💻 Project

**NetworkIQ AI**

An AI-powered multi-agent inventory optimization platform designed to transform supply-chain data into actionable inventory and warehouse decisions.

---

## 📄 License

This project is developed for educational, demonstration, hackathon, and portfolio purposes.
