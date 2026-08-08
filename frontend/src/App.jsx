import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>

      <div style={{ minHeight: "100vh" }}>

        {/* Navigation Bar */}

        <nav
          style={{
            background: "#1f4e79",
            padding: "15px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white"
          }}
        >

          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            🚀 NetworkIQ AI
          </div>

          <div
            style={{
              display: "flex",
              gap: "25px"
            }}
          >

            <NavLink to="/">
              Dashboard
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>

            <NavLink to="/sales">
              Sales
            </NavLink>

            <NavLink to="/inventory">
              Inventory
            </NavLink>

            <NavLink to="/recommendations">
              🤖 AI Recommendations
            </NavLink>

          </div>

        </nav>


        {/* Pages */}

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/sales"
            element={<Sales />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/recommendations"
            element={<Recommendations />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}


function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        color: "white",
        textDecoration: "none",
        fontWeight: "500",
        padding: "8px 12px",
        borderRadius: "8px"
      }}
    >
      {children}
    </Link>
  );
}


export default App;