
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import type { GalleryImage, InsertGalleryImage } from "@shared/schema";

const AdminGalleryTab: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery-images"],
  });

  const createImageMutation = useMutation({
    mutationFn: async (image: InsertGalleryImage) => {
      const response = await fetch("/api/admin/gallery-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      });
      if (!response.ok) throw new Error("Failed to create gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-images"] });
      toast({ title: "Success", description: "Gallery image created successfully" });
      setShowDialog(false);
      setSelectedImage(null);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async ({ id, image }: { id: number; image: Partial<InsertGalleryImage> }) => {
      const response = await fetch(`/api/admin/gallery-images/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      });
      if (!response.ok) throw new Error("Failed to update gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-images"] });
      toast({ title: "Success", description: "Gallery image updated successfully" });
      setShowDialog(false);
      setSelectedImage(null);
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/gallery-images/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-images"] });
      toast({ title: "Success", description: "Gallery image deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const image = {
      title: formData.get("title") as string,
      imageUrl: formData.get("imageUrl") as string,
      altText: formData.get("altText") as string,
      displayOrder: parseInt(formData.get("displayOrder") as string),
    };

    if (selectedImage) {
      updateImageMutation.mutate({ id: selectedImage.id, image });
    } else {
      createImageMutation.mutate(image);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gallery Management</CardTitle>
            <CardDescription>Manage restaurant gallery images</CardDescription>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedImage(null)}>
                <FaPlus className="mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedImage ? "Edit Gallery Image" : "Add New Gallery Image"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={selectedImage?.title}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={selectedImage?.imageUrl}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="altText">Alt Text</Label>
                  <Textarea
                    id="altText"
                    name="altText"
                    defaultValue={selectedImage?.altText || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    defaultValue={selectedImage?.displayOrder}
                    required
                  />
                </div>
                <Button type="submit">
                  {selectedImage ? "Update" : "Create"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages?.map((image) => (
            <div key={image.id} className="border rounded-lg overflow-hidden">
              <img
                src={image.imageUrl}
                alt={image.altText || image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-medium mb-2">{image.title}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Order: {image.displayOrder}
                </p>
                <div className="flex justify-between">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedImage(image);
                      setShowDialog(true);
                    }}
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteImageMutation.mutate(image.id)}
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!galleryImages || galleryImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No gallery images found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminGalleryTab;
