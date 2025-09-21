import React, { useState } from "react";
import { FaCheck, FaUtensils, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample weekly menu for each plan
const tiffinPlans = {
  gold: {
    name: "Gold Plan",
    price: 1999,
    description: "Standard tiffin service with fresh homemade food",
    features: ["Fresh Homemade Food", "Delivery Included", "Balanced Diet", "20 Meals Per Month"],
    weeklyMenu: [
      { 
        day: "Monday", 
        lunch: ["Dal Fry", "Jeera Rice", "Mix Veg", "2 Roti", "Curd"],
        dinner: ["Dal Tadka", "Plain Rice", "Aloo Matar", "2 Roti", "Papad"]
      },
      { 
        day: "Tuesday", 
        lunch: ["Rajma Masala", "Steamed Rice", "Aloo Gobhi", "2 Roti", "Papad"],
        dinner: ["Dal Fry", "Jeera Rice", "Mix Veg", "2 Roti", "Salad"]
      },
      { 
        day: "Wednesday", 
        lunch: ["Dal Makhani", "Pulao", "Seasonal Vegetable", "2 Roti", "Raita"],
        dinner: ["Chana Dal", "Plain Rice", "Bhindi Fry", "2 Roti", "Papad"]
      },
      { 
        day: "Thursday", 
        lunch: ["Chana Masala", "Jeera Rice", "Bhindi Fry", "2 Roti", "Pickle"],
        dinner: ["Dal Tadka", "Steamed Rice", "Aloo Palak", "2 Roti", "Raita"]
      },
      { 
        day: "Friday", 
        lunch: ["Mixed Dal", "Steamed Rice", "Aloo Matar", "2 Roti", "Salad"],
        dinner: ["Dal Fry", "Veg Pulao", "Seasonal Veg", "2 Roti", "Papad"]
      },
      { 
        day: "Saturday", 
        lunch: ["Dal Tadka", "Veg Pulao", "Paneer Bhurji", "2 Roti", "Raita"],
        dinner: ["Dal Makhani", "Plain Rice", "Mix Veg", "2 Roti", "Sweet"]
      },
      { 
        day: "Sunday", 
        lunch: ["Special Dal", "Veg Biryani", "Shahi Paneer", "2 Butter Naan", "Sweet"],
        dinner: ["Dal Tadka", "Jeera Rice", "Malai Kofta", "2 Butter Naan", "Raita"]
      }
    ]
  },
  diamond: {
    name: "Diamond Plan",
    price: 2499,
    description: "Premium tiffin service with restaurant quality meals",
    features: ["Premium Quality Food", "Delivery Included", "Nutrient-Rich Menu", "24 Meals Per Month", "Special Weekend Dishes"],
    weeklyMenu: [
      { 
        day: "Monday",
        lunch: ["Dal Tadka", "Jeera Rice", "Paneer Butter Masala", "3 Roti", "Raita"],
        dinner: ["Dal Fry", "Plain Rice", "Mix Veg", "3 Roti", "Salad"]
      },
      { 
        day: "Tuesday",
        lunch: ["Rajma Masala", "Veg Pulao", "Aloo Gobi Matar", "3 Roti", "Papad"],
        dinner: ["Dal Makhani", "Steamed Rice", "Paneer Bhurji", "3 Roti", "Raita"]
      },
      { 
        day: "Wednesday",
        lunch: ["Dal Makhani", "Steamed Rice", "Kadhai Paneer", "3 Roti", "Raita"],
        dinner: ["Chana Dal", "Jeera Rice", "Mix Veg", "3 Roti", "Sweet"]
      },
      { 
        day: "Thursday",
        lunch: ["Chole", "Pulao", "Seasonal Veg", "3 Roti", "Dahi Bhalla"],
        dinner: ["Dal Tadka", "Plain Rice", "Aloo Matar", "3 Roti", "Papad"]
      },
      { 
        day: "Friday",
        lunch: ["Mixed Dal", "Jeera Rice", "Malai Kofta", "3 Roti", "Sprout Salad"],
        dinner: ["Dal Fry", "Veg Pulao", "Seasonal Veg", "3 Roti", "Raita"]
      },
      { 
        day: "Saturday",
        lunch: ["Dal Fry", "Veg Biryani", "Paneer Tikka Masala", "3 Butter Naan", "Raita"],
        dinner: ["Dal Makhani", "Steamed Rice", "Mix Veg", "3 Roti", "Sweet"]
      },
      { 
        day: "Sunday",
        lunch: ["Special Dal", "Veg Biryani", "Shahi Paneer", "3 Butter Naan", "Gulab Jamun"],
        dinner: ["Dal Bukhara", "Jeera Rice", "Malai Kofta", "3 Butter Naan", "Special Raita"]
      }
    ]
  },
  platinum: {
    name: "Platinum Plan",
    price: 2999,
    description: "Luxury tiffin service with gourmet dishes and customization",
    features: ["Gourmet Restaurant Quality", "Priority Delivery", "Customizable Menu", "30 Meals Per Month", "Special Diet Options", "Weekend Special Dishes"],
    weeklyMenu: [
      { 
        day: "Monday",
        lunch: ["Dal Tadka", "Basmati Rice", "Paneer Butter Masala", "3 Roti", "Mixed Raita", "Dessert"],
        dinner: ["Dal Makhani", "Jeera Rice", "Veg Kofta", "3 Butter Naan", "Boondi Raita", "Sweet"]
      },
      { 
        day: "Tuesday",
        lunch: ["Rajma Masala", "Veg Pulao", "Mushroom Masala", "3 Roti", "Papad", "Green Salad"],
        dinner: ["Dal Fry", "Steamed Rice", "Paneer Bhurji", "3 Butter Naan", "Mix Raita", "Dessert"]
      },
      { 
        day: "Wednesday",
        lunch: ["Dal Makhani", "Steamed Rice", "Kadhai Paneer", "3 Roti", "Fruit Raita", "Sweet"],
        dinner: ["Mixed Dal", "Veg Pulao", "Malai Kofta", "3 Butter Naan", "Boondi Raita", "Dessert"]
      },
      { 
        day: "Thursday",
        lunch: ["Punjabi Chole", "Jeera Rice", "Seasonal Veg", "3 Roti", "Dahi Bhalla", "Sweet"],
        dinner: ["Dal Tadka", "Kashmiri Pulao", "Paneer Lababdar", "3 Butter Naan", "Raita", "Dessert"]
      },
      { 
        day: "Friday",
        lunch: ["Mixed Dal", "Veg Pulao", "Paneer Lababdar", "3 Roti", "Sprout Salad", "Sweet"],
        dinner: ["Dal Makhani", "Jeera Rice", "Mushroom Masala", "3 Butter Naan", "Mix Raita", "Dessert"]
      },
      { 
        day: "Saturday",
        lunch: ["Special Dal", "Veg Biryani", "Paneer Tikka Masala", "3 Butter Naan", "Boondi Raita"],
        dinner: ["Dal Bukhara", "Kashmiri Pulao", "Malai Kofta", "3 Butter Naan", "Special Raita", "Dessert"]
      },
      { 
        day: "Sunday",
        lunch: ["Dal Bukhara", "Hyderabadi Biryani", "Shahi Paneer", "3 Butter Naan", "Gulab Jamun"],
        dinner: ["Special Dal", "Veg Biryani", "Paneer Pasanda", "3 Butter Naan", "Special Raita", "Ice Cream"]
      }
    ]
  }
};

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TiffinPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"gold" | "diamond" | "platinum">("gold");

  const constructWhatsAppMessage = (plan: typeof tiffinPlans.gold) => {
    const message = `Hello, I'm interested in ordering the ${plan.name} (₹${plan.price}) tiffin service from Daily Food House. Please provide more details.`;
    return encodeURIComponent(message);
  };

  return (
    <div className="pt-28 pb-10 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Daily Tiffin Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fresh, homemade food delivered daily. Choose from our flexible tiffin plans to enjoy nutritious meals every day.
            </p>
          </motion.div>

          <Tabs 
            value={selectedPlan} 
            onValueChange={(value) => setSelectedPlan(value as "gold" | "diamond" | "platinum")}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 h-auto p-1 md:min-w-[600px]">
                <TabsTrigger value="gold" className="py-3 text-lg">Gold</TabsTrigger>
                <TabsTrigger value="diamond" className="py-3 text-lg">Diamond</TabsTrigger>
                <TabsTrigger value="platinum" className="py-3 text-lg">Platinum</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(tiffinPlans).map(([key, plan]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <Card className="border-2 border-primary/20 overflow-hidden mb-10">
                    <CardHeader className="bg-primary/5 border-b border-primary/10">
                      <CardTitle className="text-3xl text-center text-primary">{plan.name}</CardTitle>
                      <CardDescription className="text-center text-lg">{plan.description}</CardDescription>
                      <div className="text-3xl font-bold text-primary text-center mt-2">₹{plan.price}<span className="text-base font-normal text-gray-500">/month</span></div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <FaCheck className="text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-primary mb-4">Weekly Menu</h3>
                      <div className="space-y-4">
                        {plan.weeklyMenu.map((day, index) => (
                          <motion.div 
                            key={day.day} 
                            variants={fadeIn}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="font-bold text-primary mb-2">{day.day}</div>
                            <div className="space-y-2">
                              <div>
                                <div className="font-medium text-primary/80 mb-1">Lunch:</div>
                                <div className="flex flex-wrap gap-2">
                                  {day.lunch.map((item, i) => (
                                    <span 
                                      key={i} 
                                      className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-primary/80 mb-1">Dinner:</div>
                                <div className="flex flex-wrap gap-2">
                                  {day.dinner.map((item, i) => (
                                    <span 
                                      key={i} 
                                      className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center bg-primary/5 border-t border-primary/10 p-6">
                      <Button 
                        asChild 
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg h-auto"
                      >
                        <a href={`https://wa.me/919202895096?text=${constructWhatsAppMessage(plan)}`}>
                          <FaWhatsapp className="mr-2" /> Order Now
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md mt-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-4">About Our Tiffin Service</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaUtensils className="text-primary mt-1 mr-2" />
                <span>All meals are freshly prepared daily with high-quality ingredients</span>
              </li>
              <li className="flex items-start">
                <FaUtensils className="text-primary mt-1 mr-2" />
                <span>Delivery is available in all areas of Gwalior</span>
              </li>
              <li className="flex items-start">
                <FaUtensils className="text-primary mt-1 mr-2" />
                <span>Special diet requirements can be accommodated (vegetarian only)</span>
              </li>
              <li className="flex items-start">
                <FaUtensils className="text-primary mt-1 mr-2" />
                <span>Monthly, quarterly and half-yearly subscription options available</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Extra space for mobile bottom navigation */}
        <div className="h-20 lg:hidden mt-8"></div>
      </div>
    </div>
  );
};

export default TiffinPage;