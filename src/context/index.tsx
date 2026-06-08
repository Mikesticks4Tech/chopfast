import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem, User } from "../types";
import { demoUser } from "../data/mockData";

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
      const existing = prev.find((c) => c.id === item.id);
      if (existing)
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      return [...prev, { ...item, quantity: 1, restaurantId, restaurantName }];
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
  isAuthenticated: boolean;
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
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _pw: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    if (email) {
      setUser({ ...demoUser, email });
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    _pw: string,
    phone: string,
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 900));
    setUser({ ...demoUser, name, email, phone });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
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
