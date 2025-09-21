import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaClock,
  FaUtensils,
  FaBan,
  FaEdit,
  FaShoppingCart,
  FaPhoneAlt,
  FaMotorcycle,
  FaHeart
} from "react-icons/fa";
import type { MenuCategory, MenuItem } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

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

// Interface for cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const OrderOnline: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<MenuCategory[]>({
    queryKey: ["/api/menu-categories"],
  });

  const { data: menuItems, isLoading: isMenuItemsLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const isLoading = isCategoriesLoading || isMenuItemsLoading;

  // Group menu items by category
  const menuItemsByCategory = React.useMemo(() => {
    if (!categories || !menuItems) return {};
    
    return categories.reduce((acc, category) => {
      acc[category.id] = {
        categoryName: category.name,
        items: menuItems.filter(item => item.categoryId === category.id)
      };
      return acc;
    }, {} as Record<number, { categoryName: string; items: MenuItem[] }>);
  }, [categories, menuItems]);
  
  // Set first category as active when data loads
  React.useEffect(() => {
    if (categories && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);
  
  // Add item to cart
  const addToCart = (item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Increment quantity if already in cart
        return prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        // Add new item to cart
        return [...prevItems, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
  };
  
  // Update item quantity
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [showCheckout, setShowCheckout] = useState(false);

  // Generate WhatsApp order message
  const generateOrderMessage = () => {
    if (cartItems.length === 0) return "I would like to place an order";
    
    let message = "I would like to order the following items:\n\n";
    
    cartItems.forEach(item => {
      message += `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`;
    });
    
    message += `\nTotal Amount: ₹${totalPrice}`;
    return message;
  };

  // Submit order to backend
  const submitOrder = async () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill all customer details');
      return;
    }

    try {
      const orderData = {
        customerName: customerDetails.name,
        customerPhone: customerDetails.phone,
        customerAddress: customerDetails.address,
        orderItems: JSON.stringify(cartItems),
        totalAmount: totalPrice,
        orderType: 'delivery',
        status: 'pending'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert('Order placed successfully! You will receive a confirmation on WhatsApp.');
        setCartItems([]);
        setCustomerDetails({ name: '', phone: '', address: '' });
        setShowCheckout(false);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
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
            <h1 className="font-dancing text-gold text-4xl mb-2">Order Now</h1>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
              Easy Online Ordering
            </h2>
            <p className="text-gray-600 mb-8">
              Browse our menu and place your order easily through WhatsApp. Our team 
              will prepare your food with care and have it ready for pickup or delivery.
            </p>
          </motion.div>
        </div>
      </section>

      

      {/* Menu Items for Order - Alfanzo Style */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-primary text-5xl mb-3">Our Menu</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Order directly via WhatsApp from our extensive menu featuring authentic Indian flavors
            </p>
          </div>
          
          {/* Fixed position cart summary for desktop */}
          {cartItems.length > 0 && (
            <div className="hidden lg:block fixed right-4 top-32 bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[280px] z-10">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-title text-lg text-primary font-bold">Your Order</h4>
                <Badge variant="outline" className="bg-primary text-white">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </Badge>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto mb-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center mt-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-gray-200"
                        >-</button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-gray-200"
                        >+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 py-3 mb-3">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              
              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-primary hover:bg-secondary text-white"
              >
                <FaShoppingCart className="mr-2" /> Proceed to Checkout
              </Button>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading menu items...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Mobile Horizontal Category Navigation */}
              <div className="lg:hidden mb-6">
                <h4 className="font-heading text-xl mb-4 text-center">
                  Categories
                </h4>
                <div className="overflow-x-auto pb-2">
                  <div className="flex space-x-2 px-1 min-w-max">
                    {categories?.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-primary text-white' 
                            : 'bg-white border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Desktop Category Sidebar */}
              <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
                <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                  <h4 className="font-heading text-xl mb-4 pb-2 border-b border-gray-200">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories?.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Menu items */}
              <div className="lg:w-3/4 xl:w-4/5">
                {categories?.map((category) => (
                  <div 
                    key={category.id} 
                    className={`mb-10 ${activeCategory !== category.id && 'hidden lg:block'}`}
                    id={`category-${category.id}`}
                  >
                    <h4 className="font-heading text-2xl text-primary mb-6 pb-2 border-b-2 border-secondary inline-block">
                      {category.name}
                    </h4>
                    
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={stagger}
                    >
                      {menuItemsByCategory[category.id]?.items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                          variants={fadeIn}
                        >
                          {item.imageUrl && (
                            <div className="relative overflow-hidden h-48">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {item.isPopular && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-secondary text-white font-semibold">Popular</Badge>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-title text-xl text-primary font-semibold">{item.name}</h3>
                              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                                ₹{item.price}
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            )}
                            <div className="flex gap-2">
                              <Button
                                onClick={() => addToCart(item)}
                                className="flex-1 bg-primary hover:bg-secondary text-white"
                              >
                                <FaShoppingCart className="mr-2" /> Add to Order
                              </Button>
                              <Button
                                asChild
                                variant="outline"
                                className="bg-white border-primary text-primary hover:bg-primary hover:text-white"
                              >
                                <a href={`https://wa.me/919202895096?text=I%20would%20like%20to%20order%20${encodeURIComponent(item.name)}`}>
                                  <FaWhatsapp />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Mobile cart summary fixed at bottom */}
          {cartItems.length > 0 && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
              <div className="flex justify-between items-center">
                <div>
                  <Badge variant="outline" className="bg-primary text-white mb-1">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </Badge>
                  <p className="font-bold">₹{totalPrice}</p>
                </div>
                <Button
                  onClick={() => setShowCheckout(true)}
                  className="bg-primary hover:bg-secondary text-white"
                >
                  <FaShoppingCart className="mr-2" /> Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Important Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-primary text-white p-6">
              <h3 className="font-title text-2xl font-bold mb-2">Important Information</h3>
              <p>Please take note of the following information before placing your order</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full text-primary mr-3 mt-1">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Food Preparation Time</h5>
                    <p className="text-gray-600 text-sm">Please allow approximately 50 minutes for your food to be prepared</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full text-primary mr-3 mt-1">
                    <FaUtensils className="text-xl" />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Fresh Consumption</h5>
                    <p className="text-gray-600 text-sm">Packed food must be consumed within 2 hours for best quality</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full text-primary mr-3 mt-1">
                    <FaBan className="text-xl" />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">No Leftover Packing</h5>
                    <p className="text-gray-600 text-sm">Leftover food packing is not permitted as per our policy</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full text-primary mr-3 mt-1">
                    <FaEdit className="text-xl" />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Order Changes</h5>
                    <p className="text-gray-600 text-sm">Once an order is placed and prepared, it cannot be canceled or changed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors duration-300 shadow-lg inline-flex items-center text-lg px-8 py-6"
            >
              <a href="https://wa.me/9202895096?text=I%20would%20like%20to%20place%20an%20order">
                <FaWhatsapp className="mr-2 text-xl" /> Order via WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Extra space for mobile bottom navigation */}
          <div className="h-20 lg:hidden mt-8"></div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Complete Your Order</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Address *</label>
                <textarea
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md h-20"
                  placeholder="Enter your complete address"
                />
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total: ₹{totalPrice}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowCheckout(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitOrder}
                  className="flex-1 bg-primary hover:bg-secondary text-white"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderOnline;
