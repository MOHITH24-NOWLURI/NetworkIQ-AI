import { useEffect, useState } from "react";

import AIAlerts from "../components/AIAlerts";
import TopProductsChart from "../components/TopProductsChart";
import InventoryPieChart from "../components/InventoryPieChart";
import RecommendationTable from "../components/RecommendationTable";
import SalesTrend from "../components/SalesTrend";
import AIInsights from "../components/AIInsights";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  const loadDashboard = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Dashboard API failed");
        }

        return res.json();
      })
      .then((data) => {
        console.log("Dashboard API:", data);
        setDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatNumber = (num) => {
    if (num === undefined || num === null) {
      return "0";
    }

    return new Intl.NumberFormat("en-IN").format(
      Math.round(Number(num))
    );
  };

  const stockouts = Number(dashboard.stockouts || 0);

  const stockoutRisk =
    stockouts > 0
      ? "Attention Required"
      : "Low Risk";

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#1f4e79",
              fontSize: "32px"
            }}
          >
            🚀 NetworkIQ AI
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#6c757d",
              marginBottom: 0
            }}
          >
            Smart Supply Chain Intelligence Platform
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          {/* System Status */}

          <span
            style={{
              background: "#d1fae5",
              color: "#047857",
              padding: "8px 14px",
              borderRadius: "20px",
              fontWeight: "600"
            }}
          >
            ● System Online
          </span>

          {/* Refresh */}

          <button
            onClick={loadDashboard}
            style={{
              background: "#0d6efd",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* ================= EXECUTIVE SUMMARY ================= */}

      <div
        style={{
          background:
            "linear-gradient(135deg, #1f4e79, #0d6efd)",
          color: "white",
          padding: "25px",
          borderRadius: "16px",
          marginBottom: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,.12)"
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "10px"
          }}
        >
          🤖 AI Supply Chain Overview
        </h2>

        <p
          style={{
            marginBottom: 0,
            lineHeight: "1.6"
          }}
        >
          NetworkIQ analyzes sales, inventory and warehouse
          data to identify demand patterns, inventory risks
          and opportunities for smarter supply-chain decisions.
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <Card
          icon="📦"
          title="Products"
          value={formatNumber(dashboard.total_products)}
        />

        <Card
          icon="💰"
          title="Total Sales"
          value={
            "₹ " + formatNumber(dashboard.total_sales)
          }
        />

        <Card
          icon="📈"
          title="Total Profit"
          value={
            "₹ " + formatNumber(dashboard.total_profit)
          }
        />

        <Card
          icon="🏢"
          title="Warehouses"
          value={formatNumber(dashboard.warehouses)}
        />

        <Card
          icon="📦"
          title="Total Inventory"
          value={formatNumber(dashboard.total_inventory)}
        />

        <Card
          icon="⚠️"
          title="Stockout Risk"
          value={
            loading
              ? "Loading..."
              : stockoutRisk
          }
          danger={stockouts > 0}
        />
      </div>

      {/* ================= DEMAND & SALES ================= */}

      <Section title="📊 Demand & Sales Analytics">
        <TopProductsChart />
        <SalesTrend />
      </Section>

      {/* ================= INVENTORY ================= */}

      <Section title="📦 Inventory Intelligence">
        <InventoryPieChart />
      </Section>

      {/* ================= AI DECISION SUPPORT ================= */}

      <Section title="🤖 AI Decision Support">

        {/* NEW: AI Alerts */}

        <AIAlerts />

        {/* Transfer Recommendations */}

        <RecommendationTable />

        {/* Business Insights */}

        <AIInsights />

      </Section>
    </div>
  );
}


/* =========================================================
   KPI CARD
========================================================= */

function Card({
  icon,
  title,
  value,
  danger = false
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        borderLeft: danger
          ? "5px solid #dc3545"
          : "5px solid #0d6efd",
        transition: "transform .2s",
        cursor: "default"
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#495057"
        }}
      >
        {icon} {title}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginTop: "15px",
          color: danger
            ? "#dc3545"
            : "#0d6efd"
        }}
      >
        {value}
      </div>
    </div>
  );
}


/* =========================================================
   SECTION
========================================================= */

function Section({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "35px"
      }}
    >
      <h2
        style={{
          color: "#1f4e79",
          marginBottom: "15px"
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}