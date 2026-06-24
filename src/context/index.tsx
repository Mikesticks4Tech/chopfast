import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem, User } from "../types";
import { loginUser, registerUser } from "../api";

// ─── CART CONTEXT ───────────────────────────────────────────
type CartContextType = {
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
  ) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
  ) => {
    setCart((prev) => {
      const existing = prev.find((c) => c._id === item._id);
      if (existing)
        return prev.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      return [
        ...prev,
        { ...item, _id: item._id, quantity: 1, restaurantId, restaurantName },
      ];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c.id !== id));
  const increaseQty = (id: string) =>
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)),
    );
  const decreaseQty = (id: string) =>
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0),
    );
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

// ─── AUTH CONTEXT ────────────────────────────────────────────
type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
  ) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("chopfast_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("chopfast_token"),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        setUser(data);
        setToken(data.token);
        localStorage.setItem("chopfast_user", JSON.stringify(data));
        localStorage.setItem("chopfast_token", data.token);
        return true;
      } else {
        setError(data.message || "Login failed");
        return false;
      }
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const data = await registerUser(name, email, password, phone);
      if (data.token) {
        setUser(data);
        setToken(data.token);
        localStorage.setItem("chopfast_user", JSON.stringify(data));
        localStorage.setItem("chopfast_token", data.token);
        return true;
      } else {
        setError(data.message || "Registration failed");
        return false;
      }
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("chopfast_user");
    localStorage.removeItem("chopfast_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
