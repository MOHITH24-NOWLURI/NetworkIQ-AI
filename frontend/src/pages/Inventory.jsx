import { useEffect, useState } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/inventory")
      .then((res) => res.json())
      .then((data) => {
        setInventory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Inventory API error:", error);
        setLoading(false);
      });
  }, []);

  const statusStyle = (status) => {
    if (status === "LOW") {
      return {
        color: "#dc3545",
        fontWeight: "bold"
      };
    }

    if (status === "OK") {
      return {
        color: "#198754",
        fontWeight: "bold"
      };
    }

    return {};
  };

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
        📦 Inventory Management
      </h1>

      <p style={{ color: "gray" }}>
        Monitor inventory levels, demand forecasts and reorder status
      </p>

      {loading ? (
        <h3>Loading inventory data...</h3>
      ) : (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            marginTop: "25px",
            overflowX: "auto"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>SKU</th>
                <th style={thStyle}>Warehouse</th>
                <th style={thStyle}>Units Sold</th>
                <th style={thStyle}>Inventory</th>
                <th style={thStyle}>Reorder Point</th>
                <th style={thStyle}>Demand Forecast</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    {item.Date}
                  </td>

                  <td style={tdStyle}>
                    {item.SKU_ID}
                  </td>

                  <td style={tdStyle}>
                    {item.Warehouse_ID}
                  </td>

                  <td style={tdStyle}>
                    {item.Units_Sold}
                  </td>

                  <td style={tdStyle}>
                    {Number(item.Inventory_Level || 0).toLocaleString("en-IN")}
                  </td>

                  <td style={tdStyle}>
                    {item.Reorder_Point}
                  </td>

                  <td style={tdStyle}>
                    {Number(item.Demand_Forecast || 0).toFixed(2)}
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      ...statusStyle(item.Inventory_Status)
                    }}
                  >
                    {item.Inventory_Status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "2px solid #ddd",
  color: "#1f4e79",
  whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  whiteSpace: "nowrap"
};