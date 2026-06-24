export type FoodCategory =
  | "All"
  | "Local Nigerian"
  | "Street Food"
  | "Continental"
  | "Chinese-Nigerian"
  | "Grills & BBQ"
  | "Soups & Swallow"
  | "Pastries & Drinks";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type UserRole = "customer" | "admin" | "superadmin";

export type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  address?: string;
  token?: string;
};

export type MenuItem = {
  _id?: string;
  id?: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  available: boolean;
  prepTime: number;
};

export type Restaurant = {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  image: string;
  coverImage: string;
  category: FoodCategory;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  isOpen: boolean;
  tags: string[];
  lat?: number;
  lng?: number;
};

export type CartItem = MenuItem & {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
};

export type Order = {
  _id?: string;
  id?: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: {
    _id?: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  deliveryFee: number;
  status: OrderStatus;
  address: string;
  createdAt: string;
  estimatedDelivery: string;
  paymentMethod: "paystack" | "cash";
  paymentStatus: "pending" | "paid";
};
