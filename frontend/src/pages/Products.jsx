import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/demand")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Products API error:", error);
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
        📦 Product Analytics
      </h1>

      <p style={{ color: "gray" }}>
        Top-selling products based on demand and sales data
      </p>

      {loading ? (
        <h3>Loading products...</h3>
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
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Sales</th>
                <th style={thStyle}>Profit</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    {product["Product Name"]}
                  </td>

                  <td style={tdStyle}>
                    {product.Quantity}
                  </td>

                  <td style={tdStyle}>
                    ₹ {Number(product.Sales || 0).toLocaleString("en-IN")}
                  </td>

                  <td style={tdStyle}>
                    ₹ {Number(product.Profit || 0).toLocaleString("en-IN")}
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
  padding: "15px",
  borderBottom: "2px solid #ddd",
  color: "#1f4e79"
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee"
};