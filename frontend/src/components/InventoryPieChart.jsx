import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function InventoryPieChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/inventory")
      .then((res) => res.json())
      .then((data) => {
        const counts = {};

        data.forEach((item) => {
          const status = item.Inventory_Status || "OK";
          counts[status] = (counts[status] || 0) + 1;
        });

        setChartData(
          Object.keys(counts).map((key) => ({
            name: key,
            value: counts[key],
          }))
        );
      });
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        marginTop: 25,
        borderRadius: 15,
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h2>📦 Inventory Health</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}