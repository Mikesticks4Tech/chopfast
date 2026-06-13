const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ─── AUTH ────────────────────────────────────────────
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, phone }),
  });
  return res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getMe = async (token: string) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// ─── RESTAURANTS ─────────────────────────────────────
export const getRestaurants = async (category?: string, search?: string) => {
  let url = `${BASE_URL}/restaurants?`;
  if (category && category !== "All") url += `category=${category}&`;
  if (search) url += `search=${search}`;
  const res = await fetch(url);
  return res.json();
};

// ─── MENU ────────────────────────────────────────────
export const getMenuItems = async (restaurantId: string) => {
  const res = await fetch(`${BASE_URL}/menu/${restaurantId}`);
  return res.json();
};

// ─── ORDERS ──────────────────────────────────────────
export const placeOrder = async (orderData: object, token: string) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const getMyOrders = async (token: string) => {
  const res = await fetch(`${BASE_URL}/orders/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
