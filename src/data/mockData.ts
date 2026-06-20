import type { Restaurant, MenuItem } from "../types";

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Mama Titi's Kitchen",
    description:
      "Authentic Nigerian home cooking. The taste of Lagos in every bite.",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&q=80",
    category: "Local Nigerian",
    rating: 4.9,
    reviewCount: 342,
    deliveryTime: "25-40 min",
    deliveryFee: 500,
    minOrder: 2000,
    address: "14 Bode Thomas St, Surulere, Lagos",
    isOpen: true,
    tags: ["Jollof Rice", "Egusi", "Pounded Yam", "Popular"],
    lat: 6.4969,
    lng: 3.3544,
  },
  {
    id: "r2",
    name: "Suya Spot Lagos",
    description:
      "Premium Hausa suya grilled fresh every hour. Best suya in Lagos, guaranteed.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
    category: "Grills & BBQ",
    rating: 4.8,
    reviewCount: 289,
    deliveryTime: "20-35 min",
    deliveryFee: 400,
    minOrder: 1500,
    address: "7 Allen Avenue, Ikeja, Lagos",
    isOpen: true,
    tags: ["Suya", "Grilled", "BBQ", "Spicy"],
    lat: 6.6018,
    lng: 3.3515,
  },
  {
    id: "r3",
    name: "Puff Puff Palace",
    description:
      "Lagos street food elevated. Puff puff, akara, boli — made fresh, delivered fast.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    category: "Street Food",
    rating: 4.7,
    reviewCount: 198,
    deliveryTime: "15-25 min",
    deliveryFee: 300,
    minOrder: 800,
    address: "22 Broad Street, Lagos Island",
    isOpen: true,
    tags: ["Puff Puff", "Akara", "Snacks", "Fast"],
    lat: 6.4531,
    lng: 3.3958,
  },
  {
    id: "r4",
    name: "Dragon & Jollof",
    description:
      "The best of Chinese and Nigerian cuisine fused into one unforgettable menu.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=80",
    category: "Chinese-Nigerian",
    rating: 4.6,
    reviewCount: 156,
    deliveryTime: "30-45 min",
    deliveryFee: 600,
    minOrder: 3000,
    address: "5 Adeola Odeku, Victoria Island, Lagos",
    isOpen: true,
    tags: ["Fried Rice", "Noodles", "Fusion", "Premium"],
    lat: 6.4281,
    lng: 3.4219,
  },
  {
    id: "r5",
    name: "The Soup Sanctuary",
    description:
      "Every Nigerian soup you love — Egusi, Ofe Onugbu, Afang, Ogbono — with fresh swallow.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    category: "Soups & Swallow",
    rating: 4.8,
    reviewCount: 267,
    deliveryTime: "35-50 min",
    deliveryFee: 500,
    minOrder: 2500,
    address: "33 Awolowo Road, Ikoyi, Lagos",
    isOpen: true,
    tags: ["Egusi", "Pounded Yam", "Afang", "Traditional"],
    lat: 6.4474,
    lng: 3.4553,
  },
  {
    id: "r6",
    name: "Continental Bites",
    description:
      "International cuisine with a Lagos twist. Steaks, pasta, burgers — made for the city.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    category: "Continental",
    rating: 4.5,
    reviewCount: 143,
    deliveryTime: "30-45 min",
    deliveryFee: 700,
    minOrder: 4000,
    address: "1 Ozumba Mbadiwe, Victoria Island, Lagos",
    isOpen: false,
    tags: ["Burgers", "Pasta", "Steaks", "Premium"],
    lat: 6.428,
    lng: 3.4106,
  },
];

export const menuItems: MenuItem[] = [
  // Mama Titi's
  {
    id: "m1",
    restaurantId: "r1",
    name: "Party Jollof Rice + Chicken",
    description:
      "Smoky party jollof cooked in a pot, served with a full chicken leg and coleslaw.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
    category: "Rice",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 20,
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "Egusi Soup + Pounded Yam",
    description:
      "Rich egusi soup with assorted meat and stockfish. Served with smooth pounded yam.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    category: "Soup",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 25,
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Fried Plantain + Beans",
    description:
      "Sweet ripe plantain fried golden, paired with seasoned honey beans. A classic Lagos combo.",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "Sides",
    popular: false,
    spicy: false,
    available: true,
    prepTime: 15,
  },
  {
    id: "m4",
    restaurantId: "r1",
    name: "Banga Soup + Starch",
    description:
      "Delta-style banga soup with fresh periwinkle, served with yellow starch.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    category: "Soup",
    popular: false,
    spicy: false,
    available: true,
    prepTime: 30,
  },

  // Suya Spot
  {
    id: "m5",
    restaurantId: "r2",
    name: "Beef Suya (500g)",
    description:
      "Premium Hausa-style beef suya, marinated in spiced yaji, grilled over open flame.",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    category: "Grills",
    popular: true,
    spicy: true,
    available: true,
    prepTime: 20,
  },
  {
    id: "m6",
    restaurantId: "r2",
    name: "Chicken Suya (4 pieces)",
    description:
      "Juicy chicken pieces coated in authentic suya spice and grilled to perfection.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    category: "Grills",
    popular: true,
    spicy: true,
    available: true,
    prepTime: 25,
  },
  {
    id: "m7",
    restaurantId: "r2",
    name: "Ram Suya Special",
    description:
      "Tender ram meat suya — only available on weekends. A true Lagos delicacy.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    category: "Grills",
    popular: false,
    spicy: true,
    available: true,
    prepTime: 30,
  },
  {
    id: "m8",
    restaurantId: "r2",
    name: "Suya + Fried Yam Combo",
    description:
      "A generous portion of suya served with crispy fried yam and pepper sauce.",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "Combos",
    popular: true,
    spicy: true,
    available: true,
    prepTime: 25,
  },

  // Puff Puff Palace
  {
    id: "m9",
    restaurantId: "r3",
    name: "Puff Puff (12 pieces)",
    description:
      "Soft, fluffy, golden puff puff made fresh every 30 minutes. Lagos favourite snack.",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "Snacks",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 10,
  },
  {
    id: "m10",
    restaurantId: "r3",
    name: "Akara + Pap",
    description:
      "Crispy bean cakes served hot with smooth ogi (pap). A proper Nigerian breakfast.",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
    category: "Breakfast",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 15,
  },
  {
    id: "m11",
    restaurantId: "r3",
    name: "Boli + Groundnut",
    description:
      "Roasted plantain served with seasoned groundnut. Classic Lagos street food.",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "Snacks",
    popular: false,
    spicy: false,
    available: true,
    prepTime: 12,
  },

  // Dragon & Jollof
  {
    id: "m12",
    restaurantId: "r4",
    name: "Nigerian Fried Rice + Beef",
    description:
      "Chinese-style fried rice made with Nigerian spices, served with peppered beef.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    category: "Rice",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 25,
  },
  {
    id: "m13",
    restaurantId: "r4",
    name: "Peppered Noodles + Chicken",
    description:
      "Stir-fried noodles with Nigerian pepper sauce and grilled chicken breast.",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    category: "Noodles",
    popular: true,
    spicy: true,
    available: true,
    prepTime: 20,
  },
  {
    id: "m14",
    restaurantId: "r4",
    name: "Sweet & Sour Goat Meat",
    description:
      "Tender Nigerian goat meat in a tangy Chinese-style sweet and sour sauce.",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    category: "Mains",
    popular: false,
    spicy: false,
    available: true,
    prepTime: 30,
  },

  // The Soup Sanctuary
  {
    id: "m15",
    restaurantId: "r5",
    name: "Afang Soup + Wheat",
    description:
      "Rich Efik afang soup with periwinkle and assorted meat. Served with wheat swallow.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    category: "Soup",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 35,
  },
  {
    id: "m16",
    restaurantId: "r5",
    name: "Ogbono Soup + Eba",
    description:
      "Thick ogbono soup with dried fish and meat, served with perfectly made eba.",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    category: "Soup",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 30,
  },
  {
    id: "m17",
    restaurantId: "r5",
    name: "Ofe Onugbu + Fufu",
    description:
      "Bitter leaf soup Anambra-style with soft fufu. Authentic and satisfying.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    category: "Soup",
    popular: false,
    spicy: false,
    available: true,
    prepTime: 35,
  },

  // Continental Bites
  {
    id: "m18",
    restaurantId: "r6",
    name: "Smash Burger + Fries",
    description:
      "Double smash patty with caramelised onions, cheese, and house sauce. Served with fries.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    category: "Burgers",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 20,
  },
  {
    id: "m19",
    restaurantId: "r6",
    name: "Creamy Chicken Pasta",
    description:
      "Penne pasta in rich cream sauce with grilled chicken, mushrooms and parmesan.",
    price: 5800,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    category: "Pasta",
    popular: true,
    spicy: false,
    available: true,
    prepTime: 25,
  },
];

export const demoUser = {
  id: "u1",
  name: "Mike Idowu",
  email: "mike@chopfast.ng",
  phone: "08012345678",
  role: "customer" as const,
  address: "14 Bode Thomas St, Surulere, Lagos",
};
