import { useEffect, useState } from "react";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recommendations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        return response.json();
      })
      .then((data) => {
        console.log("AI Recommendations:", data);
        setRecommendations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Recommendation error:", err);
        setError("Unable to load recommendations");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      {/* Header */}

      <h1
        style={{
          color: "#1f4e79",
          marginBottom: "10px"
        }}
      >
        🤖 AI Supply Chain Recommendations
      </h1>

      <p
        style={{
          color: "#6c757d",
          fontSize: "18px",
          marginBottom: "30px"
        }}
      >
        AI-powered inventory transfer decisions based on
        warehouse stock levels and demand.
      </p>

      {/* Main Card */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 5px 15px rgba(0,0,0,.10)"
        }}
      >
        <h2
          style={{
            marginTop: 0,
            color: "#1f4e79"
          }}
        >
          🚚 Recommended Inventory Transfers
        </h2>

        {/* Loading */}

        {loading && (
          <p>🤖 Analyzing inventory...</p>
        )}

        {/* Error */}

        {error && (
          <p style={{ color: "#dc3545" }}>
            ❌ {error}
          </p>
        )}

        {/* No recommendations */}

        {!loading &&
          !error &&
          recommendations.length === 0 && (
            <div
              style={{
                padding: "25px",
                background: "#e8f5e9",
                borderRadius: "10px",
                color: "#198754"
              }}
            >
              <h3>✅ No transfer required</h3>

              <p>
                No warehouse currently has enough surplus
                inventory to satisfy another warehouse's
                shortage.
              </p>
            </div>
          )}

        {/* Recommendations */}

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
                    <th style={thStyle}>
                      Transfer Quantity
                    </th>
                    <th style={thStyle}>
                      Source Stock
                    </th>
                    <th style={thStyle}>
                      Destination Stock
                    </th>
                    <th style={thStyle}>
                      Demand Forecast
                    </th>
                    <th style={thStyle}>
                      Recommendation
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recommendations
                    .slice(0, 20)
                    .map((item, index) => (
                      <tr key={index}>

                        {/* SKU */}

                        <td style={tdStyle}>
                          <strong>
                            {item.SKU}
                          </strong>
                        </td>

                        {/* FROM */}

                        <td style={tdStyle}>
                          <span
                            style={{
                              background: "#e8f5e9",
                              color: "#198754",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              fontWeight: "600"
                            }}
                          >
                            {item.From_Warehouse}
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
                            {item.To_Warehouse}
                          </span>
                        </td>

                        {/* QUANTITY */}

                        <td
                          style={{
                            ...tdStyle,
                            fontWeight: "700",
                            color: "#0d6efd"
                          }}
                        >
                          {Number(
                            item.Transfer_Quantity || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        {/* SOURCE STOCK */}

                        <td style={tdStyle}>
                          {Number(
                            item.Source_Inventory || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        {/* DESTINATION STOCK */}

                        <td style={tdStyle}>
                          {Number(
                            item.Destination_Inventory || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        {/* DEMAND */}

                        <td style={tdStyle}>
                          {Number(
                            item.Demand_Forecast || 0
                          ).toFixed(2)}
                        </td>

                        {/* RECOMMENDATION */}

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
                            {item.Recommendation}
                          </span>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Reason */}

              <div
                style={{
                  marginTop: "25px",
                  padding: "18px",
                  background: "#f8f9fa",
                  borderRadius: "10px"
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  🧠 AI Reasoning
                </h3>

                {recommendations
                  .slice(0, 5)
                  .map((item, index) => (
                    <p key={index}>
                      <strong>{item.SKU}</strong>:{" "}
                      {item.Reason}
                    </p>
                  ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  whiteSpace: "nowrap"
};

export default Recommendations;