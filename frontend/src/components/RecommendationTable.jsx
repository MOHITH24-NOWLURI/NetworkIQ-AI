import { useEffect, useState } from "react";

export default function RecommendationTable() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recommendations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load recommendations");
        }

        return res.json();
      })
      .then((data) => {
        console.log("Dashboard AI Recommendations:", data);
        setRecommendations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Recommendation error:", err);
        setError("Unable to load AI recommendations");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.10)",
        marginTop: "20px"
      }}
    >
      <h2
        style={{
          color: "#1f4e79",
          marginTop: 0
        }}
      >
        🤖 AI SKU Recommendations
      </h2>

      <p style={{ color: "#6c757d" }}>
        AI-generated inventory transfer decisions based on
        current stock and demand forecast.
      </p>

      {loading && (
        <p>🤖 Analyzing inventory...</p>
      )}

      {error && (
        <p style={{ color: "#dc3545" }}>
          ❌ {error}
        </p>
      )}

      {!loading &&
        !error &&
        recommendations.length === 0 && (
          <div
            style={{
              padding: "20px",
              background: "#e8f5e9",
              borderRadius: "10px",
              color: "#198754"
            }}
          >
            ✅ No inventory transfers are currently required.
          </div>
        )}

      {!loading &&
        !error &&
        recommendations.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px"
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#1f4e79",
                    color: "white"
                  }}
                >
                  <th style={thStyle}>SKU</th>
                  <th style={thStyle}>From</th>
                  <th style={thStyle}>To</th>
                  <th style={thStyle}>Transfer Qty</th>
                  <th style={thStyle}>Priority</th>
                  <th style={thStyle}>Demand</th>
                  <th style={thStyle}>AI Decision</th>
                </tr>
              </thead>

              <tbody>
                {recommendations
                  .slice(0, 10)
                  .map((item, index) => (
                    <tr key={index}>

                      {/* SKU */}
                      <td style={tdStyle}>
                        <strong>
                          {item.SKU || "-"}
                        </strong>
                      </td>

                      {/* FROM */}
                      <td style={tdStyle}>
                        <span
                          style={{
                            background: "#d1e7dd",
                            color: "#0f5132",
                            padding: "6px 10px",
                            borderRadius: "8px",
                            fontWeight: "600"
                          }}
                        >
                          {item.From_Warehouse || "-"}
                        </span>
                      </td>

                      {/* TO */}
                      <td style={tdStyle}>
                        <span
                          style={{
                            background: "#fff3cd",
                            color: "#856404",
                            padding: "6px 10px",
                            borderRadius: "8px",
                            fontWeight: "600"
                          }}
                        >
                          {item.To_Warehouse || "-"}
                        </span>
                      </td>

                      {/* TRANSFER QUANTITY */}
                      <td
                        style={{
                          ...tdStyle,
                          color: "#0d6efd",
                          fontWeight: "700"
                        }}
                      >
                        {Number(
                          item.Transfer_Quantity || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      {/* PRIORITY */}
                      <td style={tdStyle}>
                        <PriorityBadge
                          priority={item.Priority}
                        />
                      </td>

                      {/* DEMAND FORECAST */}
                      <td style={tdStyle}>
                        {Number(
                          item.Demand_Forecast || 0
                        ).toFixed(2)}
                      </td>

                      {/* AI DECISION */}
                      <td style={tdStyle}>
                        <span
                          style={{
                            background: "#d1ecf1",
                            color: "#0c5460",
                            padding: "7px 12px",
                            borderRadius: "20px",
                            fontWeight: "600"
                          }}
                        >
                          {item.Recommendation || "-"}
                        </span>
                      </td>

                    </tr>
                  ))}
              </tbody>
            </table>

            {/* AI reasoning */}

            <div
              style={{
                marginTop: "20px",
                padding: "18px",
                background: "#f8f9fa",
                borderRadius: "10px"
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                🧠 AI Reasoning
              </h3>

              {recommendations
                .slice(0, 3)
                .map((item, index) => (
                  <p key={index}>
                    <strong>{item.SKU}</strong>:{" "}
                    {item.Reason || "Transfer recommended based on inventory conditions."}
                  </p>
                ))}
            </div>
          </div>
        )}
    </div>
  );
}


function PriorityBadge({ priority }) {
  if (priority === "HIGH") {
    return (
      <span
        style={{
          background: "#f8d7da",
          color: "#842029",
          padding: "6px 10px",
          borderRadius: "20px",
          fontWeight: "700"
        }}
      >
        🔴 HIGH
      </span>
    );
  }

  if (priority === "MEDIUM") {
    return (
      <span
        style={{
          background: "#fff3cd",
          color: "#856404",
          padding: "6px 10px",
          borderRadius: "20px",
          fontWeight: "700"
        }}
      >
        🟠 MEDIUM
      </span>
    );
  }

  return (
    <span
      style={{
        background: "#d1e7dd",
        color: "#0f5132",
        padding: "6px 10px",
        borderRadius: "20px",
        fontWeight: "700"
      }}
    >
      🟢 LOW
    </span>
  );
}


const thStyle = {
  padding: "13px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "13px",
  borderBottom: "1px solid #eee",
  whiteSpace: "nowrap"
};