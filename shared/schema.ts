import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema remains the same as base
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Menu categories
export const menuCategories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  displayOrder: integer("display_order").notNull(),
});

export const insertMenuCategorySchema = createInsertSchema(menuCategories).pick({
  name: true,
  slug: true,
  displayOrder: true,
});

// Menu items
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  categoryId: integer("category_id").notNull(),
  imageUrl: text("image_url"),
  isPopular: boolean("is_popular").default(false),
  isAvailable: boolean("is_available").default(true),
});

export const insertMenuItemSchema = createInsertSchema(menuItems).pick({
  name: true,
  description: true,
  price: true,
  categoryId: true,
  imageUrl: true,
  isPopular: true,
  isAvailable: true,
});

// Gallery images
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  displayOrder: integer("display_order").notNull(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  title: true,
  imageUrl: true,
  altText: true,
  displayOrder: true,
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  orderItems: text("order_items").notNull(), // JSON string
  totalAmount: integer("total_amount").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, confirmed, preparing, ready, delivered, cancelled
  orderType: varchar("order_type", { length: 20 }).notNull().default("pickup"), // pickup, delivery
  notes: text("notes"),
  otp: varchar("otp", { length: 6 }),
  assignedDeliveryBoy: integer("assigned_delivery_boy"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Delivery Boys table
export const deliveryBoys = pgTable("delivery_boys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  customerName: true,
  customerPhone: true,
  customerAddress: true,
  orderItems: true,
  totalAmount: true,
  status: true,
  orderType: true,
  notes: true,
  otp: true,
  assignedDeliveryBoy: true,
});

export const insertDeliveryBoySchema = createInsertSchema(deliveryBoys).pick({
  name: true,
  phone: true,
  username: true,
  password: true,
  isActive: true,
});

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("admin"), // admin, manager
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  password: true,
  role: true,
  isActive: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMenuCategory = z.infer<typeof insertMenuCategorySchema>;
export type MenuCategory = typeof menuCategories.$inferSelect;

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export type InsertDeliveryBoy = z.infer<typeof insertDeliveryBoySchema>;
export type DeliveryBoy = typeof deliveryBoys.$inferSelect;
