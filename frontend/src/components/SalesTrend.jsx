import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function SalesTrend() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/demand")
      .then((res) => res.json())
      .then((rows) => {
        const chart = rows.map((r) => ({
          name: r["Product Name"],
          sales: r.Sales
        }));
        setData(chart);
      });
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 15,
        marginTop: 30,
        boxShadow: "0 5px 15px rgba(0,0,0,.1)"
      }}
    >
      <h2>📈 Sales Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#0d6efd"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}