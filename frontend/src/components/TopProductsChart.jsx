import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function TopProductsChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/demand")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        marginTop: 30,
        borderRadius: 15,
        boxShadow: "0 0 10px rgba(0,0,0,.15)"
      }}
    >
      <h2>📈 Top Selling Products</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis
            dataKey="Product Name"
            angle={-20}
            interval={0}
            height={90}
            textAnchor="end"
          />
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="Quantity"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}