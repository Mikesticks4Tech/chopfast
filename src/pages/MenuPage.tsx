import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Plus,
  Minus,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { restaurants, menuItems } from "../data/mockData";
import { useCart } from "../context";
import { useState } from "react";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const MenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const restaurant = restaurants.find((r) => r.id === id);
  const items = menuItems.filter((m) => m.restaurantId === id);
  const categories = [...new Set(items.map((m) => m.category))];

  if (!restaurant)
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <p style={{ color: "var(--text2)" }}>Restaurant not found.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 16,
            color: "var(--orange)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          ← Go back
        </button>
      </div>
    );

  const handleAdd = (item: (typeof items)[0]) => {
    addToCart(item, restaurant.id, restaurant.name);
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const getQty = (itemId: string) =>
    cart.find((c) => c.id === itemId)?.quantity ?? 0;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Cover */}
      <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, var(--bg) 0%, rgba(12,10,8,0.5) 60%, transparent 100%)",
          }}
        />
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Restaurant info */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginTop: -40, marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 28,
                  fontWeight: 900,
                  marginBottom: 6,
                }}
              >
                {restaurant.name}
              </h1>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: 14,
                  marginBottom: 12,
                  maxWidth: 500,
                }}
              >
                {restaurant.description}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 13,
                  }}
                >
                  <Star size={13} fill="var(--gold)" color="var(--gold)" />{" "}
                  {restaurant.rating} ({restaurant.reviewCount} reviews)
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 13,
                    color: "var(--text2)",
                  }}
                >
                  <Clock size={13} /> {restaurant.deliveryTime}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 13,
                    color: "var(--text2)",
                  }}
                >
                  <MapPin size={13} /> {restaurant.address}
                </span>
              </div>
            </div>
            <div
              style={{
                background: "var(--card2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "14px 18px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  marginBottom: 4,
                }}
              >
                DELIVERY FEE
              </p>
              <p
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "var(--orange)",
                }}
              >
                {fmt(restaurant.deliveryFee)}
              </p>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--muted)",
                  marginTop: 4,
                }}
              >
                Min order: {fmt(restaurant.minOrder)}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 16,
                paddingBottom: 10,
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {cat}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items
                .filter((m) => m.category === cat)
                .map((item) => {
                  const qty = getQty(item.id);
                  const justAdded = added === item.id;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        background: "var(--card)",
                        border: "1px solid",
                        borderColor:
                          qty > 0 ? "var(--border2)" : "var(--border)",
                        borderRadius: 14,
                        padding: "14px 16px",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
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
                              fontSize: 15,
                              fontWeight: 700,
                            }}
                          >
                            {item.name}
                          </h3>
                          {item.popular && (
                            <span
                              style={{
                                fontSize: 9,
                                fontWeight: 700,
                                fontFamily: "var(--mono)",
                                background: "var(--orange-light)",
                                color: "var(--orange)",
                                border: "1px solid var(--border2)",
                                padding: "2px 8px",
                                borderRadius: 99,
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <Flame size={8} /> POPULAR
                            </span>
                          )}
                          {item.spicy && (
                            <span style={{ fontSize: 13 }}>🌶️</span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: 12.5,
                            color: "var(--text2)",
                            marginBottom: 8,
                            lineHeight: 1.5,
                          }}
                        >
                          {item.description}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "var(--display)",
                              fontSize: 17,
                              fontWeight: 800,
                              color: "var(--orange)",
                            }}
                          >
                            {fmt(item.price)}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            {qty > 0 ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <button
                                  onClick={() => decreaseQty(item.id)}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 8,
                                    background: "var(--card2)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Minus size={13} />
                                </button>
                                <span
                                  style={{
                                    fontFamily: "var(--mono)",
                                    fontWeight: 700,
                                    minWidth: 16,
                                    textAlign: "center",
                                  }}
                                >
                                  {qty}
                                </span>
                                <button
                                  onClick={() => increaseQty(item.id)}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 8,
                                    background: "var(--orange)",
                                    border: "none",
                                    color: "#fff",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAdd(item)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  background: justAdded
                                    ? "var(--green)"
                                    : "var(--orange)",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: 8,
                                  padding: "8px 14px",
                                  fontFamily: "var(--mono)",
                                  fontSize: 12,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                              >
                                {justAdded ? (
                                  <>
                                    <CheckCircle2 size={13} /> Added
                                  </>
                                ) : (
                                  <>
                                    <Plus size={13} /> Add
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
