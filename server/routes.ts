import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Request, Response } from "express";
import { whatsappService } from "./whatsapp.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the menu items
  app.get("/api/menu-categories", async (_req, res) => {
    try {
      const categories = await storage.getMenuCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu categories" });
    }
  });

  app.get("/api/menu-items", async (_req, res) => {
    try {
      const menuItems = await storage.getMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu-items/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const menuItems = await storage.getMenuItemsByCategory(categoryId);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items for category" });
    }
  });

  app.get("/api/gallery-images", async (_req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  // Admin Authentication
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const admin = await storage.getAdminUserByUsername(username);
      
      if (!admin || admin.password !== password || !admin.isActive) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        message: "Login successful", 
        admin: { 
          id: admin.id, 
          username: admin.username, 
          role: admin.role 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin Orders Management
  app.get("/api/admin/orders", async (_req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/admin/orders", async (req: Request, res: Response) => {
    try {
      const order = await storage.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.put("/api/admin/orders/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      let order = await storage.updateOrderStatus(id, status);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // If status is confirmed, generate OTP and send WhatsApp message
      if (status === 'confirmed') {
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
        order = await storage.updateOrderOTP(id, otp);
        
        // Send WhatsApp message
        if (order) {
          await whatsappService.sendOrderConfirmation(order.customerPhone, order.id, otp);
        }
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  app.delete("/api/admin/orders/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteOrder(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete order" });
    }
  });

  // Admin Menu Categories Management
  app.post("/api/admin/menu-categories", async (req: Request, res: Response) => {
    try {
      const category = await storage.createMenuCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to create menu category" });
    }
  });

  app.put("/api/admin/menu-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.updateMenuCategory(id, req.body);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to update menu category" });
    }
  });

  app.delete("/api/admin/menu-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMenuCategory(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete menu category" });
    }
  });

  // Admin Menu Items Management
  app.post("/api/admin/menu-items", async (req: Request, res: Response) => {
    try {
      const item = await storage.createMenuItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  app.put("/api/admin/menu-items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.updateMenuItem(id, req.body);
      
      if (!item) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });

  app.delete("/api/admin/menu-items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMenuItem(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      
      res.json({ message: "Menu item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete menu item" });
    }
  });

  // Admin Gallery Management
  app.post("/api/admin/gallery-images", async (req: Request, res: Response) => {
    try {
      const image = await storage.createGalleryImage(req.body);
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ message: "Failed to create gallery image" });
    }
  });

  app.put("/api/admin/gallery-images/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.updateGalleryImage(id, req.body);
      
      if (!image) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: "Failed to update gallery image" });
    }
  });

  app.delete("/api/admin/gallery-images/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGalleryImage(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.json({ message: "Gallery image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  // Public order creation endpoint
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const order = await storage.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Delivery Boy Authentication
  app.post("/api/delivery/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const deliveryBoy = await storage.getDeliveryBoyByUsername(username);
      
      if (!deliveryBoy || deliveryBoy.password !== password || !deliveryBoy.isActive) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        message: "Login successful", 
        deliveryBoy: { 
          id: deliveryBoy.id, 
          name: deliveryBoy.name, 
          username: deliveryBoy.username 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Delivery Boy Orders
  app.get("/api/delivery/orders/:deliveryBoyId", async (req: Request, res: Response) => {
    try {
      const deliveryBoyId = parseInt(req.params.deliveryBoyId);
      const orders = await storage.getOrdersForDeliveryBoy(deliveryBoyId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Verify OTP and Complete Delivery
  app.post("/api/delivery/verify-otp", async (req: Request, res: Response) => {
    try {
      const { orderId, otp } = req.body;
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      if (order.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      
      // Update order status to delivered
      const updatedOrder = await storage.updateOrderStatus(orderId, 'delivered');
      res.json({ message: "Order delivered successfully", order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify OTP" });
    }
  });

  // Admin Delivery Boy Management
  app.get("/api/admin/delivery-boys", async (_req, res) => {
    try {
      const deliveryBoys = await storage.getDeliveryBoys();
      res.json(deliveryBoys);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch delivery boys" });
    }
  });

  app.post("/api/admin/delivery-boys", async (req: Request, res: Response) => {
    try {
      const deliveryBoy = await storage.createDeliveryBoy(req.body);
      res.status(201).json(deliveryBoy);
    } catch (error) {
      res.status(500).json({ message: "Failed to create delivery boy" });
    }
  });

  app.put("/api/admin/orders/:orderId/assign/:deliveryBoyId", async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const deliveryBoyId = parseInt(req.params.deliveryBoyId);
      
      const order = await storage.assignDeliveryBoy(orderId, deliveryBoyId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to assign delivery boy" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
