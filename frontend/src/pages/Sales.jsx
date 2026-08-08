import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/demand")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sales API error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Segoe UI"
      }}
    >
      <h1 style={{ color: "#1f4e79" }}>
        💰 Sales Analytics
      </h1>

      <p style={{ color: "gray" }}>
        Sales performance across top products
      </p>

      {loading ? (
        <h3>Loading sales data...</h3>
      ) : (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            marginTop: "25px"
          }}
        >
          <h2>📈 Product Sales Performance</h2>

          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="Product Name"
                angle={-25}
                textAnchor="end"
                height={100}
                interval={0}
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="Sales"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}