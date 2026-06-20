import { useState, useMemo } from "react";
import { Search, Star, Clock, ChevronRight, Flame, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { restaurants } from "../data/mockData";
import type { FoodCategory, Restaurant } from "../types";
import MapView from "../components/MapView";

const CATEGORIES: { label: FoodCategory | "All"; emoji: string }[] = [
  { label: "All", emoji: "🍽️" },
  { label: "Local Nigerian", emoji: "🫕" },
  { label: "Street Food", emoji: "🌮" },
  { label: "Grills & BBQ", emoji: "🔥" },
  { label: "Soups & Swallow", emoji: "🍲" },
  { label: "Chinese-Nigerian", emoji: "🥢" },
  { label: "Continental", emoji: "🍔" },
  { label: "Pastries & Drinks", emoji: "☕" },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const Home = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>(
    "Detecting your location...",
  );

  const filtered = useMemo(() => {
    let r = [...restaurants];
    if (search)
      r = r.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      );
    if (activeCategory !== "All")
      r = r.filter((x) => x.category === activeCategory);
    return r;
  }, [search, activeCategory]);

  const featured = restaurants.filter((r) => r.isOpen).slice(0, 3);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedLocation(restaurant.address);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "64px 24px 80px",
          background: "linear-gradient(180deg, #1a0f00 0%, var(--bg) 100%)",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,43,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            className="fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--orange-light)",
              border: "1px solid var(--border2)",
              borderRadius: 99,
              padding: "6px 14px",
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 12 }}>📍</span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--orange2)",
                fontWeight: 600,
              }}
            >
              {selectedLocation}
            </span>
          </div>

          <h1
            className="fade-up-1"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 900,
              fontSize: "clamp(40px, 7vw, 72px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Your favourite
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--orange)",
              }}
            >
              Nigerian meals,
            </span>
            <br />
            delivered fast. 🍽️
          </h1>

          <p
            className="fade-up-2"
            style={{
              fontSize: 17,
              color: "var(--text2)",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 480,
              margin: "0 auto 40px",
            }}
          >
            From smoky suya to party jollof — order from the best restaurants in
            Lagos and get it delivered hot.
          </p>

          {/* Search bar */}
          <div
            className="fade-up-3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--card)",
              border: "1px solid var(--border2)",
              borderRadius: 16,
              padding: "6px 6px 6px 20px",
              maxWidth: 520,
              margin: "0 auto",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            }}
          >
            <Search
              size={18}
              style={{ color: "var(--muted)", flexShrink: 0 }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jollof rice, suya, puff puff..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "var(--text)",
                fontFamily: "var(--body)",
              }}
            />
            <button
              style={{
                background: "var(--orange)",
                color: "#fff",
                border: "none",
                borderRadius: 11,
                padding: "12px 24px",
                fontFamily: "var(--mono)",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--orange2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--orange)")
              }
            >
              Find food →
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              ["500+", "Meals available"],
              ["30 min", "Avg delivery"],
              ["4.8★", "Avg rating"],
            ].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--orange)",
                  }}
                >
                  {val}
                </p>
                <p
                  style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        style={{ padding: "40px 24px 0", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {CATEGORIES.map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 18px",
                borderRadius: 99,
                border: "1px solid",
                borderColor:
                  activeCategory === label ? "var(--orange)" : "var(--border)",
                background:
                  activeCategory === label
                    ? "var(--orange-light)"
                    : "var(--card)",
                color:
                  activeCategory === label ? "var(--orange2)" : "var(--text2)",
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span>{emoji}</span> {label}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {activeCategory === "All" && !search && (
        <section
          style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Flame size={18} style={{ color: "var(--orange)" }} />
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                Featured today
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {featured.map((r, i) => (
              <Link
                key={r.id}
                to={`/menu/${r.id}`}
                style={{ textDecoration: "none" }}
                className={`fade-up-${i as 0 | 1 | 2}`}
              >
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    transition: "all 0.25s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border2)";
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "var(--shadow-orange)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 180,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(12,10,8,0.8) 0%, transparent 60%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "var(--orange)",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: "var(--mono)",
                        padding: "4px 10px",
                        borderRadius: 99,
                        letterSpacing: "0.06em",
                      }}
                    >
                      FEATURED
                    </div>
                    {!r.isOpen && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: 13,
                            color: "var(--text2)",
                            fontWeight: 600,
                          }}
                        >
                          Currently closed
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {r.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text2)",
                        marginBottom: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      {r.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12.5,
                          }}
                        >
                          <Star
                            size={12}
                            fill="var(--gold)"
                            color="var(--gold)"
                          />{" "}
                          {r.rating} ({r.reviewCount})
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12.5,
                            color: "var(--text2)",
                          }}
                        >
                          <Clock size={12} /> {r.deliveryTime}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 12,
                          color: "var(--text2)",
                        }}
                      >
                        +{fmt(r.deliveryFee)} delivery
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MAP SECTION */}
      {activeCategory === "All" && !search && (
        <section
          style={{ padding: "0 24px 40px", maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 18 }}>📍</span>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Restaurants near you
            </h2>
          </div>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            <MapView
              restaurants={restaurants}
              onSelectRestaurant={handleSelectRestaurant}
              onLocationChange={(address) => setSelectedLocation(address)}
            />
          </div>
        </section>
      )}

      {/* ALL RESTAURANTS */}
      <section
        style={{ padding: "16px 24px 80px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <Zap size={18} style={{ color: "var(--orange)" }} />
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {activeCategory === "All" ? "All restaurants" : activeCategory}
          </h2>
          <span style={{ fontSize: 13, color: "var(--muted)", marginLeft: 4 }}>
            ({filtered.length})
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ color: "var(--text2)", fontSize: 15 }}>
              No restaurants found for "{search}"
            </p>
            <button
              onClick={() => setSearch("")}
              style={{
                marginTop: 16,
                color: "var(--orange)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((r) => (
              <Link
                key={r.id}
                to={`/menu/${r.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "14px 16px",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border2)";
                    el.style.background = "var(--card2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--card)";
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {!r.isOpen && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.55)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        >
                          CLOSED
                        </span>
                      </div>
                    )}
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
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        {r.name}
                      </h3>
                      {r.isOpen && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "var(--green)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text2)",
                        marginBottom: 8,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.description}
                    </p>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 12.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Star
                          size={11}
                          fill="var(--gold)"
                          color="var(--gold)"
                        />{" "}
                        {r.rating}
                      </span>
                      <span
                        style={{
                          fontSize: 12.5,
                          color: "var(--text2)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Clock size={11} /> {r.deliveryTime}
                      </span>
                      <span style={{ fontSize: 12.5, color: "var(--text2)" }}>
                        Min: {fmt(r.minOrder)}
                      </span>
                      <span style={{ fontSize: 12.5, color: "var(--text2)" }}>
                        Delivery: {fmt(r.deliveryFee)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{ color: "var(--muted)", flexShrink: 0 }}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
