
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  FaMotorcycle, 
  FaSignOutAlt, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaCheckCircle,
  FaClock,
  FaRoute
} from "react-icons/fa";
import type { Order } from "@shared/schema";

const DeliveryDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedDeliveryBoy = localStorage.getItem("deliveryBoy");
    if (!storedDeliveryBoy) {
      setLocation("/delivery/login");
      return;
    }
    setDeliveryBoy(JSON.parse(storedDeliveryBoy));
  }, [setLocation]);

  const { data: orders, refetch } = useQuery<Order[]>({
    queryKey: [`/api/delivery/orders/${deliveryBoy?.id}`],
    enabled: !!deliveryBoy?.id,
  });

  const handleLogout = () => {
    localStorage.removeItem("deliveryBoy");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setLocation("/delivery/login");
  };

  const verifyOTP = async () => {
    if (!selectedOrder || !otpInput) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/delivery/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          otp: otpInput,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Order delivered successfully!",
        });
        setOtpInput("");
        setSelectedOrder(null);
        refetch();
      } else {
        toast({
          title: "Error",
          description: data.message || "Invalid OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      });
    }
  };

  const getGoogleMapsLink = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-orange-100 text-orange-800";
      case "ready": return "bg-green-100 text-green-800";
      case "delivered": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!deliveryBoy) {
    return <div>Loading...</div>;
  }

  const assignedOrders = orders?.filter(order => 
    order.assignedDeliveryBoy === deliveryBoy.id && 
    order.status !== 'delivered' && 
    order.status !== 'cancelled'
  ) || [];

  const completedOrders = orders?.filter(order => 
    order.assignedDeliveryBoy === deliveryBoy.id && 
    order.status === 'delivered'
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <FaMotorcycle className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Delivery Dashboard</h1>
              <p className="text-gray-600">Welcome, {deliveryBoy.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Orders</CardTitle>
              <FaClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Orders to deliver
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <FaCheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <FaMotorcycle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                All time orders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Deliveries</CardTitle>
            <CardDescription>
              Orders assigned to you for delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assignedOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No orders assigned currently
              </div>
            ) : (
              <div className="space-y-4">
                {assignedOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">
                          Customer: {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Phone: {order.customerPhone}
                        </p>
                        <p className="text-sm text-gray-600">
                          Amount: ₹{order.totalAmount}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium mb-2">Order Items:</h5>
                      <div className="text-sm">
                        {JSON.parse(order.orderItems).map((item: any, index: number) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.customerAddress && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h5 className="font-medium mb-2 flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          Delivery Address:
                        </h5>
                        <p className="text-sm">{order.customerAddress}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            asChild
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <a 
                              href={getGoogleMapsLink(order.customerAddress)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <FaRoute className="mr-2" /> Get Directions
                            </a>
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                          >
                            <a href={`tel:${order.customerPhone}`}>
                              <FaPhone className="mr-2" /> Call Customer
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}

                    {order.status === 'ready' && order.otp && (
                      <div className="bg-green-50 p-3 rounded">
                        <h5 className="font-medium mb-2">Complete Delivery:</h5>
                        <p className="text-sm mb-3">
                          Ask customer for their OTP to complete the delivery
                        </p>
                        <div className="flex space-x-2">
                          <Input
                            type="text"
                            placeholder="Enter OTP from customer"
                            value={selectedOrder?.id === order.id ? otpInput : ""}
                            onChange={(e) => {
                              setSelectedOrder(order);
                              setOtpInput(e.target.value);
                            }}
                            className="flex-1"
                          />
                          <Button
                            onClick={verifyOTP}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <FaCheckCircle className="mr-2" /> Complete
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Created: {new Date(order.createdAt || "").toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Completed Orders */}
        {completedOrders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
              <CardDescription>
                Your recent successful deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.totalAmount}</p>
                      <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
