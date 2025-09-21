import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import type { MenuCategory, MenuItem } from "@shared/schema";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<MenuCategory[]>({
    queryKey: ["/api/menu-categories"],
  });

  const { data: menuItems, isLoading: isMenuItemsLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems?.filter(item => {
        const category = categories?.find(cat => cat.id === item.categoryId);
        return category?.slug === activeCategory;
      });

  const isLoading = isCategoriesLoading || isMenuItemsLoading;

  const handleTabChange = (value: string) => {
    setActiveCategory(value);
  };

  return (
    <>
      <section className="pt-28 pb-8 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-dancing text-gold text-4xl mb-2">Our Menu</h1>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
              Delicious Indian Cuisine
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our extensive menu featuring authentic Indian flavors prepared
              with the finest ingredients and traditional recipes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading menu items...</p>
              </div>
            </div>
          ) : (
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="overflow-x-auto pb-4 mb-8">
                <TabsList className="h-auto p-1 bg-gray-100 inline-flex min-w-max">
                  <TabsTrigger 
                    value="all"
                    className="px-6 py-2 rounded-full text-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-gray-100"
                  >
                    All
                  </TabsTrigger>

                  {categories?.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.slug}
                      className="px-6 py-2 rounded-full text-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-gray-100 whitespace-nowrap"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeCategory} className="mt-0">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  {filteredItems?.map((item) => (
                    <motion.div
                      key={item.id}
                      className="food-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                      variants={fadeIn}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-playfair font-semibold text-lg">{item.name}</h3>
                          <span className="bg-gold text-white px-2 py-1 rounded text-sm font-bold">
                            ₹{item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        )}
                        <Button
                          asChild
                          className="w-full bg-maroon hover:bg-gold text-white"
                        >
                          <a href={`https://wa.me/9202895096?text=I%20would%20like%20to%20order%20${encodeURIComponent(item.name)}`}>
                            <FaWhatsapp className="mr-2" /> Order Now
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {filteredItems?.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No items available in this category.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Important Information */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gold text-white p-6">
              <h3 className="font-playfair text-2xl font-bold mb-2">Important Information</h3>
              <p>Please take note of the following information before placing your order</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="text-maroon mr-3 text-xl">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Food Preparation Time</h4>
                    <p className="text-gray-600 text-sm">Please allow approximately 50 minutes for your food to be prepared</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-maroon mr-3 text-xl">
                    <i className="fas fa-utensils"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fresh Consumption</h4>
                    <p className="text-gray-600 text-sm">Packed food must be consumed within 2 hours for best quality</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-maroon mr-3 text-xl">
                    <i className="fas fa-ban"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">No Leftover Packing</h4>
                    <p className="text-gray-600 text-sm">Leftover food packing is not permitted as per our policy</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-maroon mr-3 text-xl">
                    <i className="fas fa-edit"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Order Changes</h4>
                    <p className="text-gray-600 text-sm">Once an order is placed and prepared, it cannot be canceled or changed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;