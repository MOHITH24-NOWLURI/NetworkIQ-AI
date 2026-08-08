import { useEffect, useState } from "react";

export default function AIAlerts() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recommendations")
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("AI Alerts Error:", error);
        setLoading(false);
      });
  }, []);

  const highPriority = recommendations.filter(
    (item) => item.Priority === "HIGH"
  );

  const mediumPriority = recommendations.filter(
    (item) => item.Priority === "MEDIUM"
  );

  if (loading) {
    return (
      <div style={cardStyle}>
        <h2>🚨 AI Supply Chain Alerts</h2>
        <p>Analyzing inventory risks...</p>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#1f4e79"
            }}
          >
            🚨 AI Supply Chain Alerts
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#6c757d"
            }}
          >
            Priority actions identified by NetworkIQ AI
          </p>
        </div>

        <div
          style={{
            background:
              highPriority.length > 0
                ? "#f8d7da"
                : "#d1e7dd",
            color:
              highPriority.length > 0
                ? "#842029"
                : "#0f5132",
            padding: "10px 16px",
            borderRadius: "20px",
            fontWeight: "700"
          }}
        >
          {highPriority.length > 0
            ? `🔴 ${highPriority.length} HIGH`
            : "🟢 No Critical Alerts"}
        </div>
      </div>

      {highPriority.length === 0 &&
        mediumPriority.length === 0 && (
          <div
            style={{
              background: "#d1e7dd",
              color: "#0f5132",
              padding: "18px",
              borderRadius: "10px"
            }}
          >
            ✅ Inventory conditions are currently stable.
          </div>
        )}

      {highPriority.length > 0 &&
        highPriority.slice(0, 5).map((item, index) => (
          <Alert
            key={`high-${index}`}
            item={item}
            priority="HIGH"
          />
        ))}

      {mediumPriority.length > 0 &&
        mediumPriority.slice(0, 3).map((item, index) => (
          <Alert
            key={`medium-${index}`}
            item={item}
            priority="MEDIUM"
          />
        ))}
    </div>
  );
}


function Alert({ item, priority }) {
  const isHigh = priority === "HIGH";

  return (
    <div
      style={{
        borderLeft: isHigh
          ? "5px solid #dc3545"
          : "5px solid #ffc107",

        background: isHigh
          ? "#fff5f5"
          : "#fffaf0",

        padding: "16px",
        borderRadius: "8px",
        marginBottom: "12px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <strong>
          {isHigh ? "🔴 HIGH PRIORITY" : "🟠 MEDIUM PRIORITY"}
        </strong>

        <span>
          SKU: <strong>{item.SKU}</strong>
        </span>
      </div>

      <p style={{ marginBottom: "8px" }}>
        🚚 Transfer{" "}
        <strong>
          {item.Transfer_Quantity}
        </strong>{" "}
        units from{" "}
        <strong>
          {item.From_Warehouse}
        </strong>{" "}
        →{" "}
        <strong>
          {item.To_Warehouse}
        </strong>
      </p>

      <p
        style={{
          margin: 0,
          color: "#555"
        }}
      >
        🧠 {item.Reason}
      </p>
    </div>
  );
}


const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0,0,0,.10)",
  marginTop: "25px"
};