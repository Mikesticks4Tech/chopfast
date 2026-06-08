import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, MapPin } from "lucide-react";
import { useCart, useAuth } from "../../context";
import { useState } from "react";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(12,10,8,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--orange)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              boxShadow: "var(--shadow-orange)",
            }}
          >
            🍽️
          </div>
          <span
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: 20,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Chop<span style={{ color: "var(--orange)" }}>Fast</span>
          </span>
        </Link>

        {/* Location pill — desktop */}
        {isHome && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--card2)",
              border: "1px solid var(--border)",
              borderRadius: 99,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            <MapPin size={13} style={{ color: "var(--orange)" }} />
            <span style={{ fontSize: 13, color: "var(--text2)" }}>
              Lagos, Nigeria
            </span>
          </div>
        )}

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text2)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 99,
                border: "1px solid var(--border)",
                transition: "all 0.15s",
              }}
            >
              Sign in
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              background: cartCount > 0 ? "var(--orange)" : "var(--card2)",
              border: "1px solid",
              borderColor: cartCount > 0 ? "var(--orange)" : "var(--border)",
              borderRadius: 12,
              textDecoration: "none",
              color: cartCount > 0 ? "#fff" : "var(--text2)",
              transition: "all 0.2s",
              boxShadow: cartCount > 0 ? "var(--shadow-orange)" : "none",
            }}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "var(--orange)",
                  fontSize: 10,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
