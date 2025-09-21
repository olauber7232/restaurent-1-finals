import { 
  users, 
  type User, 
  type InsertUser,
  menuCategories,
  type MenuCategory,
  type InsertMenuCategory,
  menuItems,
  type MenuItem,
  type InsertMenuItem,
  galleryImages,
  type GalleryImage,
  type InsertGalleryImage,
  orders,
  type Order,
  type InsertOrder,
  adminUsers,
  type AdminUser,
  type InsertAdminUser,
  deliveryBoys,
  type DeliveryBoy,
  type InsertDeliveryBoy
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin user methods
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  
  // Menu category methods
  getMenuCategories(): Promise<MenuCategory[]>;
  getMenuCategory(id: number): Promise<MenuCategory | undefined>;
  createMenuCategory(category: InsertMenuCategory): Promise<MenuCategory>;
  updateMenuCategory(id: number, category: Partial<InsertMenuCategory>): Promise<MenuCategory | undefined>;
  deleteMenuCategory(id: number): Promise<boolean>;
  
  // Menu item methods
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: number): Promise<boolean>;
  
  // Gallery image methods
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: number): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: number): Promise<boolean>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  updateOrderOTP(id: number, otp: string): Promise<Order | undefined>;
  assignDeliveryBoy(orderId: number, deliveryBoyId: number): Promise<Order | undefined>;
  deleteOrder(id: number): Promise<boolean>;
  
  // Delivery boy methods
  getDeliveryBoys(): Promise<DeliveryBoy[]>;
  getDeliveryBoy(id: number): Promise<DeliveryBoy | undefined>;
  getDeliveryBoyByUsername(username: string): Promise<DeliveryBoy | undefined>;
  createDeliveryBoy(deliveryBoy: InsertDeliveryBoy): Promise<DeliveryBoy>;
  updateDeliveryBoy(id: number, deliveryBoy: Partial<InsertDeliveryBoy>): Promise<DeliveryBoy | undefined>;
  deleteDeliveryBoy(id: number): Promise<boolean>;
  getOrdersForDeliveryBoy(deliveryBoyId: number): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private adminUsers: Map<number, AdminUser>;
  private menuCategories: Map<number, MenuCategory>;
  private menuItems: Map<number, MenuItem>;
  private galleryImages: Map<number, GalleryImage>;
  private orders: Map<number, Order>;
  private deliveryBoys: Map<number, DeliveryBoy>;
  
  private userCurrentId: number;
  private adminUserCurrentId: number;
  private menuCategoryCurrentId: number;
  private menuItemCurrentId: number;
  private galleryImageCurrentId: number;
  private orderCurrentId: number;
  private deliveryBoyCurrentId: number;

  constructor() {
    this.users = new Map();
    this.adminUsers = new Map();
    this.menuCategories = new Map();
    this.menuItems = new Map();
    this.galleryImages = new Map();
    this.orders = new Map();
    this.deliveryBoys = new Map();
    
    this.userCurrentId = 1;
    this.adminUserCurrentId = 1;
    this.menuCategoryCurrentId = 1;
    this.menuItemCurrentId = 1;
    this.galleryImageCurrentId = 1;
    this.orderCurrentId = 1;
    this.deliveryBoyCurrentId = 1;
    
    // Initialize with sample data
    this.initializeAdminData();
    this.initializeMenuData();
    this.initializeGalleryData();
    this.initializeDeliveryBoyData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Admin user methods
  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.username === username,
    );
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const id = this.adminUserCurrentId++;
    const now = new Date();
    const adminUser: AdminUser = { 
      ...insertAdminUser, 
      id,
      createdAt: now
    };
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }
  
  // Menu category methods
  async getMenuCategories(): Promise<MenuCategory[]> {
    return Array.from(this.menuCategories.values())
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  
  async getMenuCategory(id: number): Promise<MenuCategory | undefined> {
    return this.menuCategories.get(id);
  }
  
  async createMenuCategory(category: InsertMenuCategory): Promise<MenuCategory> {
    const id = this.menuCategoryCurrentId++;
    const menuCategory: MenuCategory = { ...category, id };
    this.menuCategories.set(id, menuCategory);
    return menuCategory;
  }

  async updateMenuCategory(id: number, category: Partial<InsertMenuCategory>): Promise<MenuCategory | undefined> {
    const existing = this.menuCategories.get(id);
    if (!existing) return undefined;
    
    const updated: MenuCategory = { ...existing, ...category };
    this.menuCategories.set(id, updated);
    return updated;
  }

  async deleteMenuCategory(id: number): Promise<boolean> {
    return this.menuCategories.delete(id);
  }
  
  // Menu item methods
  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }
  
  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }
  
  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values())
      .filter(item => item.categoryId === categoryId);
  }
  
  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const id = this.menuItemCurrentId++;
    const menuItem: MenuItem = { ...item, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const existing = this.menuItems.get(id);
    if (!existing) return undefined;
    
    const updated: MenuItem = { ...existing, ...item };
    this.menuItems.set(id, updated);
    return updated;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    return this.menuItems.delete(id);
  }
  
  // Gallery image methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values())
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  
  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }
  
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.galleryImageCurrentId++;
    const galleryImage: GalleryImage = { ...image, id };
    this.galleryImages.set(id, galleryImage);
    return galleryImage;
  }

  async updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const existing = this.galleryImages.get(id);
    if (!existing) return undefined;
    
    const updated: GalleryImage = { ...existing, ...image };
    this.galleryImages.set(id, updated);
    return updated;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values())
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const now = new Date();
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated: Order = { ...existing, status, updatedAt: new Date() };
    this.orders.set(id, updated);
    return updated;
  }

  async updateOrderOTP(id: number, otp: string): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated: Order = { ...existing, otp, updatedAt: new Date() };
    this.orders.set(id, updated);
    return updated;
  }

  async assignDeliveryBoy(orderId: number, deliveryBoyId: number): Promise<Order | undefined> {
    const existing = this.orders.get(orderId);
    if (!existing) return undefined;
    
    const updated: Order = { ...existing, assignedDeliveryBoy: deliveryBoyId, updatedAt: new Date() };
    this.orders.set(orderId, updated);
    return updated;
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orders.delete(id);
  }

  // Delivery boy methods
  async getDeliveryBoys(): Promise<DeliveryBoy[]> {
    return Array.from(this.deliveryBoys.values())
      .filter(boy => boy.isActive);
  }

  async getDeliveryBoy(id: number): Promise<DeliveryBoy | undefined> {
    return this.deliveryBoys.get(id);
  }

  async getDeliveryBoyByUsername(username: string): Promise<DeliveryBoy | undefined> {
    return Array.from(this.deliveryBoys.values()).find(
      (boy) => boy.username === username,
    );
  }

  async createDeliveryBoy(insertDeliveryBoy: InsertDeliveryBoy): Promise<DeliveryBoy> {
    const id = this.deliveryBoyCurrentId++;
    const now = new Date();
    const deliveryBoy: DeliveryBoy = { 
      ...insertDeliveryBoy, 
      id,
      createdAt: now
    };
    this.deliveryBoys.set(id, deliveryBoy);
    return deliveryBoy;
  }

  async updateDeliveryBoy(id: number, deliveryBoy: Partial<InsertDeliveryBoy>): Promise<DeliveryBoy | undefined> {
    const existing = this.deliveryBoys.get(id);
    if (!existing) return undefined;
    
    const updated: DeliveryBoy = { ...existing, ...deliveryBoy };
    this.deliveryBoys.set(id, updated);
    return updated;
  }

  async deleteDeliveryBoy(id: number): Promise<boolean> {
    return this.deliveryBoys.delete(id);
  }

  async getOrdersForDeliveryBoy(deliveryBoyId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.assignedDeliveryBoy === deliveryBoyId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }
  
  // Initialize admin data
  private async initializeAdminData() {
    // Create default admin user
    await this.createAdminUser({
      username: "admin",
      password: "admin123", // In production, this should be hashed
      role: "admin",
      isActive: true
    });
  }

  // Initialize data
  private async initializeMenuData() {
    // Create menu categories
    const beverages = await this.createMenuCategory({
      name: "Cool Cool Beverages",
      slug: "beverages",
      displayOrder: 1
    });
    
    const hiTea = await this.createMenuCategory({
      name: "Hi-Tea",
      slug: "hi-tea",
      displayOrder: 2
    });
    
    const sandwiches = await this.createMenuCategory({
      name: "Sandwiches",
      slug: "sandwiches",
      displayOrder: 3
    });
    
    const snacks = await this.createMenuCategory({
      name: "Snacks",
      slug: "snacks",
      displayOrder: 4
    });
    
    const chinese = await this.createMenuCategory({
      name: "Chinese Specialties",
      slug: "chinese",
      displayOrder: 5
    });
    
    const salads = await this.createMenuCategory({
      name: "From the Salad Board",
      slug: "salads",
      displayOrder: 6
    });
    
    const soups = await this.createMenuCategory({
      name: "Soups",
      slug: "soups",
      displayOrder: 7
    });
    
    const tandoor = await this.createMenuCategory({
      name: "Tandoor Specialties",
      slug: "tandoor",
      displayOrder: 8
    });
    
    const mainCourse = await this.createMenuCategory({
      name: "Main Course - Vegetarian Delights",
      slug: "main-course",
      displayOrder: 9
    });
    
    const thalis = await this.createMenuCategory({
      name: "Thalis",
      slug: "thalis",
      displayOrder: 10
    });
    
    const riceBiryani = await this.createMenuCategory({
      name: "Rice & Biryani",
      slug: "rice-biryani",
      displayOrder: 11
    });
    
    const breads = await this.createMenuCategory({
      name: "Indian Breads",
      slug: "breads",
      displayOrder: 12
    });
    
    // Create menu items
    // Beverages
    await this.createMenuItem({
      name: "Canned & Seasonal Juice (Small)",
      description: "Refreshing fruit juice in a can",
      price: 30,
      categoryId: beverages.id,
      imageUrl: "https://images.unsplash.com/photo-1565454296317-b60bf5653ce1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Lassi (Sweet/Salted/Butter Milk)",
      description: "Traditional yogurt-based drink available in different flavors",
      price: 30,
      categoryId: beverages.id,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Cold Coffee with Ice Cream",
      description: "Creamy coffee with choice of ice cream flavors",
      price: 100,
      categoryId: beverages.id,
      imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    // Hi-Tea
    await this.createMenuItem({
      name: "Masala Maggi",
      description: "Classic instant noodles with special Indian spices",
      price: 50,
      categoryId: hiTea.id,
      imageUrl: "https://images.unsplash.com/photo-1565655389996-02216623cf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: false,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Poha with Sev",
      description: "Flattened rice cooked with spices and topped with crispy sev",
      price: 20,
      categoryId: hiTea.id,
      imageUrl: "https://images.unsplash.com/photo-1601191905893-ada784b7024c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: false,
      isAvailable: true
    });
    
    // Sandwich categories
    await this.createMenuItem({
      name: "Veg Sandwich",
      description: "Fresh vegetables with herbs and sauces between bread slices",
      price: 40,
      categoryId: sandwiches.id,
      imageUrl: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: false,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Paneer Tikka Sandwich",
      description: "Grilled cottage cheese with spices in a sandwich",
      price: 90,
      categoryId: sandwiches.id,
      imageUrl: "https://images.unsplash.com/photo-1513267048331-5611cad62e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    // Tandoor
    await this.createMenuItem({
      name: "Paneer Tikka Lazawab",
      description: "Marinated cottage cheese grilled to perfection",
      price: 250,
      categoryId: tandoor.id,
      imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Hara Bhara Kebab",
      description: "Vegetable kebabs made with spinach and peas",
      price: 140,
      categoryId: tandoor.id,
      imageUrl: "https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: false,
      isAvailable: true
    });
    
    // Main Course
    await this.createMenuItem({
      name: "Paneer Butter Masala",
      description: "Cottage cheese in rich tomato butter gravy",
      price: 190,
      categoryId: mainCourse.id,
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Malai Kofta",
      description: "Potato and cheese dumplings in creamy gravy",
      price: 180,
      categoryId: mainCourse.id,
      imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
    
    await this.createMenuItem({
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked to perfection",
      price: 160,
      categoryId: mainCourse.id,
      imageUrl: "https://images.unsplash.com/photo-1546833160-1ae5d4bf6d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPopular: true,
      isAvailable: true
    });
  }
  
  private async initializeGalleryData() {
    await this.createGalleryImage({
      title: "Restaurant Interior",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      altText: "Elegant restaurant interior with comfortable seating",
      displayOrder: 1
    });
    
    await this.createGalleryImage({
      title: "Restaurant Seating",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      altText: "Comfortable dining area with elegant decor",
      displayOrder: 2
    });
    
    await this.createGalleryImage({
      title: "Restaurant Table Setup",
      imageUrl: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      altText: "Beautifully arranged table setting",
      displayOrder: 3
    });
    
    await this.createGalleryImage({
      title: "Paneer Dish",
      imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      altText: "Delicious paneer dish served elegantly",
      displayOrder: 4
    });
    
    await this.createGalleryImage({
      title: "Restaurant Exterior",
      imageUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      altText: "Welcoming exterior of the restaurant",
      displayOrder: 5
    });
    
    await this.createGalleryImage({
      title: "Indian Food",
      imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      altText: "Authentic Indian cuisine beautifully presented",
      displayOrder: 6
    });
  }

  private async initializeDeliveryBoyData() {
    // Create sample delivery boys
    await this.createDeliveryBoy({
      name: "Raj Kumar",
      phone: "8302718516",
      username: "raj_delivery",
      password: "raj123",
      isActive: true
    });

    await this.createDeliveryBoy({
      name: "Amit Singh",
      phone: "9876543210",
      username: "amit_delivery",
      password: "amit123",
      isActive: true
    });
  }
}

export const storage = new MemStorage();
