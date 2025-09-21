
import { MenuItem, MenuCategory } from "@shared/schema";

export const menuCategories: MenuCategory[] = [
  {
    id: 1,
    name: "Cool Cool Beverages",
    slug: "beverages",
    displayOrder: 1
  },
  {
    id: 2,
    name: "Hi-Tea",
    slug: "hi-tea", 
    displayOrder: 2
  },
  {
    id: 3,
    name: "Sandwiches",
    slug: "sandwiches",
    displayOrder: 3
  },
  {
    id: 4, 
    name: "Snacks",
    slug: "snacks",
    displayOrder: 4
  },
  {
    id: 5,
    name: "Chinese Specialties",
    slug: "chinese",
    displayOrder: 5
  }
];

export const menuItems: MenuItem[] = [
  // Cool Cool Beverages
  {
    id: 1,
    name: "Canned & Seasonal Juice (Small)",
    price: 30,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1565454296317-b60bf5653ce1",
    isPopular: true,
    isAvailable: true
  },
  {
    id: 2,
    name: "Lassi (Sweet/Salted/Butter Milk)",
    price: 30,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
    isPopular: true,
    isAvailable: true
  },
  {
    id: 3,
    name: "Cold Coffee with Ice Cream",
    description: "Choice of Ice Cream",
    price: 100,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5",
    isPopular: true,
    isAvailable: true
  },
  {
    id: 4,
    name: "Milk Shakes",
    description: "Vanilla/Strawberry/Chocolate/Butterscotch",
    price: 60,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 5,
    name: "Jal Jeera",
    price: 40,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 6,
    name: "Soft Drink (300ml)",
    price: 25,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 7,
    name: "Fresh Lime Water (Sweet/Salted)",
    price: 30,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 8,
    name: "Mineral Water",
    price: 20,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1565454296317-b60bf5653ce1",
    isPopular: false,
    isAvailable: true
  },
  // Hi-Tea
  {
    id: 9,
    name: "Masala Maggi",
    price: 50,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1565655389996-02216623cf38",
    isPopular: true,
    isAvailable: true
  },
  {
    id: 10,
    name: "Poha with Sev",
    price: 20,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1601191905893-ada784b7024c",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 11,
    name: "Bread Pakora",
    price: 20,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1601191905893-ada784b7024c",
    isPopular: false,
    isAvailable: true
  },
  // Sandwiches
  {
    id: 12,
    name: "Veg Sandwich",
    price: 40,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 13,
    name: "Cheese Sandwich",
    price: 50,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 14,
    name: "Pasta Sandwich",
    price: 55,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 15,
    name: "Grilled Sandwich",
    price: 50,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 16,
    name: "Paneer Tikka Sandwich",
    price: 90,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: true,
    isAvailable: true
  },
  {
    id: 17,
    name: "Cottage Cheese Sandwich",
    price: 95,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 18,
    name: "Brown Bread Sandwich",
    price: 50,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: false,
    isAvailable: true
  },
  // Snacks
  {
    id: 19,
    name: "Spring Roll",
    price: 80,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 20,
    name: "French Fries",
    price: 75,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 21,
    name: "Mix Pakora",
    price: 85,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 22,
    name: "Paneer Pakora (8 pcs)",
    price: 95,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    isPopular: false,
    isAvailable: true
  },
  // Chinese Specialties
  {
    id: 23,
    name: "Veg Chowmein",
    price: 105,
    categoryId: 5,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: true,
    isAvailable: true
  },
  {
    id: 24,
    name: "Chilly Garlic Chowmein",
    price: 115,
    categoryId: 5,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    isPopular: false,
    isAvailable: true
  },
  {
    id: 25,
    name: "Singapore Chowmein",
    price: 140,
    categoryId: 5,
    imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41",
    isPopular: false,
    isAvailable: true
  }
];
