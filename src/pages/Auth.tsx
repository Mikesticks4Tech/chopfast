import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  fontFamily: "var(--body)",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const ok = await login(form.email, form.password);
    setLoading(false);
    if (ok) navigate("/");
    else setError("Invalid credentials. Try again.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse at top, #1a0f00 0%, var(--bg) 60%)",
      }}
    >
      <div className="fade-up" style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: 28,
              fontWeight: 900,
              marginBottom: 6,
            }}
          >
            Welcome back
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14 }}>
            Sign in to continue ordering
          </p>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "32px 28px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#ef4444",
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <label
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="mike@example.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--border2)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 42 }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--border2)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    display: "flex",
                  }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 6,
                width: "100%",
                padding: "13px",
                background: loading ? "var(--muted)" : "var(--orange)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontFamily: "var(--mono)",
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.15s",
                boxShadow: loading ? "none" : "var(--shadow-orange)",
              }}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
            {loading && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 4,
                }}
              >
                ⏳ This may take a few seconds on first load...
              </p>
            )}
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "var(--text2)",
          }}
        >
          New to ChopFast?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--orange)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.phone) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const ok = await register(form.name, form.email, form.password, form.phone);
    setLoading(false);
    if (ok) navigate("/");
    else setError("Registration failed. Please try again.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse at top, #1a0f00 0%, var(--bg) 60%)",
      }}
    >
      <div className="fade-up" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: 28,
              fontWeight: 900,
              marginBottom: 6,
            }}
          >
            Join ChopFast
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14 }}>
            Order your favourite Nigerian meals in minutes
          </p>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "32px 28px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#ef4444",
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {[
              {
                key: "name",
                label: "Full name",
                type: "text",
                placeholder: "Mike Adeyemi",
              },
              {
                key: "email",
                label: "Email",
                type: "email",
                placeholder: "mike@example.com",
              },
              {
                key: "phone",
                label: "Phone number",
                type: "tel",
                placeholder: "080XXXXXXXX",
              },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--border2)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            ))}

            <div>
              <label
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  style={{ ...inputStyle, paddingRight: 42 }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--border2)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    display: "flex",
                  }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 6,
                width: "100%",
                padding: "13px",
                background: loading ? "var(--muted)" : "var(--orange)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontFamily: "var(--mono)",
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.15s",
                boxShadow: loading ? "none" : "var(--shadow-orange)",
              }}
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            {loading && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 4,
                }}
              >
                ⏳ First load may take up to 30 seconds...
              </p>
            )}
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "var(--text2)",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--orange)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
