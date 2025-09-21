
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import type { MenuCategory, MenuItem, InsertMenuCategory, InsertMenuItem } from "@shared/schema";

const AdminMenuTab: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);

  const { data: categories } = useQuery<MenuCategory[]>({
    queryKey: ["/api/menu-categories"],
  });

  const { data: menuItems } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: async (category: InsertMenuCategory) => {
      const response = await fetch("/api/admin/menu-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error("Failed to create category");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-categories"] });
      toast({ title: "Success", description: "Category created successfully" });
      setShowCategoryDialog(false);
      setSelectedCategory(null);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, category }: { id: number; category: Partial<InsertMenuCategory> }) => {
      const response = await fetch(`/api/admin/menu-categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error("Failed to update category");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-categories"] });
      toast({ title: "Success", description: "Category updated successfully" });
      setShowCategoryDialog(false);
      setSelectedCategory(null);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/menu-categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-categories"] });
      toast({ title: "Success", description: "Category deleted successfully" });
    },
  });

  // Menu item mutations
  const createItemMutation = useMutation({
    mutationFn: async (item: InsertMenuItem) => {
      const response = await fetch("/api/admin/menu-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error("Failed to create menu item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "Success", description: "Menu item created successfully" });
      setShowItemDialog(false);
      setSelectedItem(null);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, item }: { id: number; item: Partial<InsertMenuItem> }) => {
      const response = await fetch(`/api/admin/menu-items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error("Failed to update menu item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "Success", description: "Menu item updated successfully" });
      setShowItemDialog(false);
      setSelectedItem(null);
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/menu-items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete menu item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "Success", description: "Menu item deleted successfully" });
    },
  });

  const handleCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const category = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      displayOrder: parseInt(formData.get("displayOrder") as string),
    };

    if (selectedCategory) {
      updateCategoryMutation.mutate({ id: selectedCategory.id, category });
    } else {
      createCategoryMutation.mutate(category);
    }
  };

  const handleItemSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseInt(formData.get("price") as string),
      categoryId: parseInt(formData.get("categoryId") as string),
      imageUrl: formData.get("imageUrl") as string,
      isPopular: formData.get("isPopular") === "on",
      isAvailable: formData.get("isAvailable") === "on",
    };

    if (selectedItem) {
      updateItemMutation.mutate({ id: selectedItem.id, item });
    } else {
      createItemMutation.mutate(item);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Menu Categories</CardTitle>
              <CardDescription>Manage menu categories</CardDescription>
            </div>
            <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedCategory(null)}>
                  <FaPlus className="mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={selectedCategory?.name}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      defaultValue={selectedCategory?.slug}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      name="displayOrder"
                      type="number"
                      defaultValue={selectedCategory?.displayOrder}
                      required
                    />
                  </div>
                  <Button type="submit">
                    {selectedCategory ? "Update" : "Create"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories?.map((category) => (
              <div key={category.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-gray-600">
                    Slug: {category.slug} | Order: {category.displayOrder}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDialog(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCategoryMutation.mutate(category.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Manage menu items</CardDescription>
            </div>
            <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedItem(null)}>
                  <FaPlus className="mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleItemSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={selectedItem?.name}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={selectedItem?.price}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={selectedItem?.description || ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryId">Category</Label>
                    <Select name="categoryId" defaultValue={selectedItem?.categoryId?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      defaultValue={selectedItem?.imageUrl || ""}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPopular"
                        name="isPopular"
                        defaultChecked={selectedItem?.isPopular}
                      />
                      <Label htmlFor="isPopular">Popular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isAvailable"
                        name="isAvailable"
                        defaultChecked={selectedItem?.isAvailable !== false}
                      />
                      <Label htmlFor="isAvailable">Available</Label>
                    </div>
                  </div>
                  <Button type="submit">
                    {selectedItem ? "Update" : "Create"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {menuItems?.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                <div className="flex items-center space-x-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.price} | Category: {categories?.find(c => c.id === item.categoryId)?.name}
                    </p>
                    <div className="flex space-x-2 mt-1">
                      {item.isPopular && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                      {item.isAvailable ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Available
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowItemDialog(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteItemMutation.mutate(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMenuTab;
