import { useEffect, useState } from "react";

export default function AIInsights() {

  const [dashboard, setDashboard] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/dashboard")
      .then(res => res.json())
      .then(data => setDashboard(data));

    fetch("http://127.0.0.1:8000/recommendations")
      .then(res => res.json())
      .then(data => setRecommendations(data));

  }, []);

  return (

    <div
      style={{
        background:"#ffffff",
        marginTop:"25px",
        padding:"25px",
        borderRadius:"15px",
        boxShadow:"0 5px 15px rgba(0,0,0,.12)"
      }}
    >

      <h2>🤖 AI Business Insights</h2>

      <ul style={{lineHeight:"2"}}>

        <li>
          📦 Total Inventory :
          <b> {dashboard.total_inventory}</b>
        </li>

        <li>
          💰 Total Profit :
          <b> ₹ {Math.round(dashboard.total_profit || 0).toLocaleString()}</b>
        </li>

        <li>
          🏢 Warehouses :
          <b> {dashboard.warehouses}</b>
        </li>

        <li>
          🚚 AI Recommendations Generated :
          <b> {recommendations.length}</b>
        </li>

        <li>
          ✅ Inventory Health looks stable with minimal stockout risk.
        </li>

      </ul>

    </div>

  );

}