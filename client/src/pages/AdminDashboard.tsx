
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { toast } from "@/hooks/use-toast";
import { 
  FaShoppingCart, 
  FaUtensils, 
  FaImages, 
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaPlus
} from "react-icons/fa";
import type { Order, MenuCategory, MenuItem, GalleryImage } from "@shared/schema";
import AdminOrdersTab from "@/components/AdminOrdersTab";
import AdminMenuTab from "@/components/AdminMenuTab";
import AdminGalleryTab from "@/components/AdminGalleryTab";

const AdminDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    if (!storedAdmin) {
      setLocation("/admin/login");
      return;
    }
    setAdminUser(JSON.parse(storedAdmin));
  }, [setLocation]);

  const { data: orders } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  const { data: menuItems } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery-images"],
  });

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setLocation("/admin/login");
  };

  if (!adminUser) {
    return <div>Loading...</div>;
  }

  const pendingOrders = orders?.filter(order => order.status === "pending").length || 0;
  const totalMenuItems = menuItems?.length || 0;
  const totalGalleryImages = galleryImages?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Daily Food House Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{adminUser.username}</span>
            </span>
            <Button variant="outline" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <FaShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                Orders waiting for confirmation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
              <FaUtensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMenuItems}</div>
              <p className="text-xs text-muted-foreground">
                Total items in menu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <FaImages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGalleryImages}</div>
              <p className="text-xs text-muted-foreground">
                Images in gallery
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders Management</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="gallery">Gallery Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AdminOrdersTab />
          </TabsContent>

          <TabsContent value="menu">
            <AdminMenuTab />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGalleryTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
