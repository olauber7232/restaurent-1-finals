
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { FaTrash, FaEye, FaMotorcycle } from "react-icons/fa";
import type { Order, DeliveryBoy } from "@shared/schema";

const AdminOrdersTab: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  const { data: deliveryBoys } = useQuery<DeliveryBoy[]>({
    queryKey: ["/api/admin/delivery-boys"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update order status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: number) => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete order");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Success",
        description: "Order deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    },
  });

  const assignDeliveryBoyMutation = useMutation({
    mutationFn: async ({ orderId, deliveryBoyId }: { orderId: number; deliveryBoyId: number }) => {
      const response = await fetch(`/api/admin/orders/${orderId}/assign/${deliveryBoyId}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to assign delivery boy");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Success",
        description: "Delivery boy assigned successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to assign delivery boy",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-orange-100 text-orange-800";
      case "ready": return "bg-green-100 text-green-800";
      case "delivered": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
        <CardDescription>
          Manage customer orders and update their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Order #{order.id}</h4>
                  <p className="text-sm text-gray-600">
                    Customer: {order.customerName} | Phone: {order.customerPhone}
                  </p>
                  <p className="text-sm text-gray-600">
                    Amount: ₹{order.totalAmount} | Type: {order.orderType}
                  </p>
                  {order.customerAddress && (
                    <p className="text-sm text-gray-600">Address: {order.customerAddress}</p>
                  )}
                  {order.otp && (
                    <p className="text-sm text-gray-600">OTP: <strong>{order.otp}</strong></p>
                  )}
                  {order.assignedDeliveryBoy && (
                    <p className="text-sm text-gray-600">
                      Delivery Boy: {deliveryBoys?.find(db => db.id === order.assignedDeliveryBoy)?.name || 'Unknown'}
                    </p>
                  )}
                  {order.notes && (
                    <p className="text-sm text-gray-600">Notes: {order.notes}</p>
                  )}
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

              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Status:</span>
                  <Select
                    value={order.status}
                    onValueChange={(status) => 
                      updateStatusMutation.mutate({ orderId: order.id, status })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(order.status === 'confirmed' || order.status === 'preparing' || order.status === 'ready') && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Assign Delivery Boy:</span>
                    <Select
                      value={order.assignedDeliveryBoy?.toString() || ""}
                      onValueChange={(deliveryBoyId) => 
                        assignDeliveryBoyMutation.mutate({ 
                          orderId: order.id, 
                          deliveryBoyId: parseInt(deliveryBoyId) 
                        })
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select delivery boy" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryBoys?.map((deliveryBoy) => (
                          <SelectItem key={deliveryBoy.id} value={deliveryBoy.id.toString()}>
                            <div className="flex items-center">
                              <FaMotorcycle className="mr-2" />
                              {deliveryBoy.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteOrderMutation.mutate(order.id)}
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Created: {new Date(order.createdAt || "").toLocaleString()}
                {order.updatedAt && (
                  <span> | Updated: {new Date(order.updatedAt).toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}

          {!orders || orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersTab;
