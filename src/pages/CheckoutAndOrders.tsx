import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  Banknote,
  Clock,
  Truck,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useCart, useAuth } from "../context";
import { usePaystackPayment } from "react-paystack";
import { placeOrder, getMyOrders } from "../api";
import type { Order } from "../types";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--card2)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  fontFamily: "var(--body)",
  fontSize: 14,
  outline: "none",
};

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState<"paystack" | "cash">("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    address: user?.address ?? "",
    phone: user?.phone ?? "",
    note: "",
  });

  const deliveryFee = 500;
  const serviceFee = 150;
  const total = cartTotal + deliveryFee + serviceFee;

  const paystackConfig = {
    reference: `chopfast_${Date.now()}`,
    email: user?.email ?? "customer@chopfast.ng",
    amount: total * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  // This actually saves the order to MongoDB via your backend.
  // Called after a successful Paystack payment OR for cash on delivery.
  const saveOrderToBackend = async (
    paymentMethod: "paystack" | "cash",
    paymentStatus: "paid" | "pending",
  ) => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!form.address || !form.phone) {
      setError("Please fill in your address and phone number.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const firstItem = cart[0];
      await placeOrder(
        {
          restaurantId: firstItem.restaurantId,
          restaurantName: firstItem.restaurantName,
          items: cart.map((item) => ({
            menuItemId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total,
          deliveryFee,
          address: form.address,
          phone: form.phone,
          note: form.note,
          paymentMethod,
          paymentStatus,
        },
        token,
      );

      clearCart();
      navigate("/orders?success=true");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save your order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    if (!form.address || !form.phone) {
      setError("Please fill in your address and phone number.");
      return;
    }
    setError("");

    if (payMethod === "paystack") {
      initializePayment({
        onSuccess: () => {
          // Payment succeeded on Paystack's side — NOW save the order to our DB.
          saveOrderToBackend("paystack", "paid");
        },
        onClose: () => {
          console.log("Payment popup closed without completing");
        },
      });
    } else {
      saveOrderToBackend("cash", "pending");
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>
      <h1
        style={{
          fontFamily: "var(--display)",
          fontSize: 28,
          fontWeight: 900,
          marginBottom: 6,
        }}
      >
        Checkout
      </h1>
      <p style={{ color: "var(--text2)", marginBottom: 32, fontSize: 14 }}>
        Complete your order details below
      </p>

      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10,
            padding: "12px 16px",
            color: "#ef4444",
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 22,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Delivery details
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Full name
              </label>
              <input
                value={user?.name ?? ""}
                readOnly
                style={{ ...inputStyle, opacity: 0.6 }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Phone number *
              </label>
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="080XXXXXXXX"
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
                  textTransform: "uppercase" as const,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Delivery address *
              </label>
              <input
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                placeholder="Full delivery address"
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
                  textTransform: "uppercase" as const,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Order note (optional)
              </label>
              <input
                value={form.note}
                onChange={(e) =>
                  setForm((f) => ({ ...f, note: e.target.value }))
                }
                placeholder="e.g. No onions please"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--border2)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 22,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Payment method
          </h3>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              {
                id: "paystack",
                label: "Pay with Paystack",
                icon: <CreditCard size={16} />,
                sub: "Card, bank transfer, USSD",
              },
              {
                id: "cash",
                label: "Pay on delivery",
                icon: <Banknote size={16} />,
                sub: "Cash at your door",
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPayMethod(opt.id as typeof payMethod)}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  border: "2px solid",
                  borderColor:
                    payMethod === opt.id ? "var(--orange)" : "var(--border)",
                  background:
                    payMethod === opt.id
                      ? "var(--orange-light)"
                      : "var(--card2)",
                  color:
                    payMethod === opt.id ? "var(--orange2)" : "var(--text2)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left" as const,
                }}
              >
                <div style={{ marginBottom: 6 }}>{opt.icon}</div>
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {opt.label}
                </p>
                <p style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                  {opt.sub}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 22,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            Order summary
          </h3>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13.5,
                marginBottom: 8,
              }}
            >
              <span style={{ color: "var(--text2)" }}>
                {item.name} × {item.quantity}
              </span>
              <span style={{ fontFamily: "var(--mono)" }}>
                {fmt(item.price * item.quantity)}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: 12,
              paddingTop: 12,
            }}
          >
            {[
              ["Delivery fee", fmt(deliveryFee)],
              ["Service fee", fmt(serviceFee)],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: "var(--text2)" }}>{l}</span>
                <span style={{ fontFamily: "var(--mono)" }}>{v}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "var(--orange)",
                }}
              >
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleOrder}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: loading ? "var(--muted)" : "var(--orange)",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontFamily: "var(--mono)",
            fontSize: 15,
            fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? (
            <>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />{" "}
              Saving order...
            </>
          ) : (
            `Place order · ${fmt(total)}`
          )}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ─── ORDERS PAGE (real data from backend) ─────────────────────

const STATUS_STEPS = ["confirmed", "preparing", "ready", "delivered"];
const STATUS_LABELS: Record<string, string> = {
  pending: "Order placed",
  confirmed: "Order confirmed",
  preparing: "Preparing your food",
  ready: "Ready for pickup",
  delivered: "Delivered 🎉",
};

export const Orders = () => {
  const location = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  const justOrdered =
    new URLSearchParams(location.search).get("success") === "true";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getMyOrders(token);
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setError("Couldn't load your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, navigate]);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      {justOrdered && (
        <div
          className="fade-up"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 14,
            padding: "18px 20px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CheckCircle2
            size={22}
            style={{ color: "var(--green)", flexShrink: 0 }}
          />
          <div>
            <p
              style={{
                fontFamily: "var(--display)",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--green)",
              }}
            >
              Order placed successfully! 🎉
            </p>
            <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 2 }}>
              Your food is being prepared. Track it below.
            </p>
          </div>
        </div>
      )}

      <h1
        style={{
          fontFamily: "var(--display)",
          fontSize: 28,
          fontWeight: 900,
          marginBottom: 28,
        }}
      >
        Your Orders
      </h1>

      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 0",
            gap: 12,
          }}
        >
          <Loader2
            size={24}
            style={{
              color: "var(--orange)",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "var(--text2)", fontSize: 14 }}>
            Loading your orders...
          </p>
        </div>
      )}

      {!loading && error && (
        <p
          style={{
            textAlign: "center",
            color: "var(--text2)",
            padding: "40px 0",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && orders.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <p style={{ color: "var(--text2)", fontSize: 15 }}>
            You haven't placed any orders yet.
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {orders.map((order) => {
          const stepIndex = STATUS_STEPS.indexOf(order.status);
          return (
            <div
              key={order._id}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 22,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      {order.restaurantName}
                    </h3>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: "var(--mono)",
                        padding: "3px 8px",
                        borderRadius: 99,
                        background:
                          order.status === "delivered"
                            ? "rgba(34,197,94,0.1)"
                            : "var(--orange-light)",
                        color:
                          order.status === "delivered"
                            ? "var(--green)"
                            : "var(--orange)",
                        border: `1px solid ${order.status === "delivered" ? "rgba(34,197,94,0.3)" : "var(--border2)"}`,
                        textTransform: "uppercase" as const,
                      }}
                    >
                      {order.status}
                    </span>
                    {order.paymentStatus === "paid" && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: "var(--mono)",
                          padding: "3px 8px",
                          borderRadius: 99,
                          background: "rgba(34,197,94,0.1)",
                          color: "var(--green)",
                          border: "1px solid rgba(34,197,94,0.3)",
                        }}
                      >
                        PAID
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--text2)" }}>
                    {order.items.map((i) => i.name).join(" · ")}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--orange)",
                    }}
                  >
                    ₦{order.total.toLocaleString()}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>

              {order.status !== "delivered" && order.status !== "cancelled" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  {STATUS_STEPS.map((step, i) => (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flex: i < STATUS_STEPS.length - 1 ? 1 : 0,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          flexShrink: 0,
                          background:
                            i <= stepIndex ? "var(--orange)" : "var(--card2)",
                          border: `2px solid ${i <= stepIndex ? "var(--orange)" : "var(--border)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s",
                        }}
                      >
                        {i < stepIndex ? (
                          <CheckCircle size={14} color="#fff" />
                        ) : i === stepIndex ? (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#fff",
                              animation: "pulse 1.5s infinite",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--muted)",
                            }}
                          />
                        )}
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            height: 2,
                            background:
                              i < stepIndex ? "var(--orange)" : "var(--border)",
                            transition: "all 0.3s",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 14,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12.5,
                    color: "var(--text2)",
                  }}
                >
                  <Clock size={12} /> Est. {order.estimatedDelivery}
                </span>
                {order.status !== "delivered" && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12.5,
                      color: "var(--orange)",
                    }}
                  >
                    <Truck size={12} /> {STATUS_LABELS[order.status]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
