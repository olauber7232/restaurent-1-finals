import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  FaUtensils, 
  FaUserTie, 
  FaClock, 
  FaTrophy, 
  FaGlassCheers,
  FaWhatsapp,
  FaLeaf,
  FaHamburger,
  FaHeart,
  FaStar
} from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Amit Kumar",
    review: "बेहतरीन खाना और शानदार सर्विस! मैं डेली फूड हाउस का नियमित ग्राहक हूं। यहाँ का पनीर बटर मसाला बेहद स्वादिष्ट है।"
  },
  {
    name: "Rajesh Singh",
    review: "Family के साथ डिनर के लिए बेस्ट जगह। स्टाफ बहुत फ्रेंडली है और फूड क्वालिटी टॉप क्लास है।"
  },
  {
    name: "Priya Sharma",
    review: "Amazing food and great ambiance! Their special thali is a must-try. Perfect place for both family gatherings and casual dining."
  },
  {
    name: "Ravi Verma",
    review: "मैंने यहाँ अपनी एनिवर्सरी सेलिब्रेट की। स्टाफ ने बहुत अच्छी तरह से सारी व्यवस्था की। खाना बेहद स्वादिष्ट था।"
  },
  {
    name: "Sneha Gupta",
    review: "The best North Indian food in Gwalior! Their Dal Makhani and Butter Naan are to die for. Highly recommended!"
  },
  {
    name: "Mohit Agarwal",
    review: "बिज़नेस मीटिंग के लिए परफेक्ट जगह। प्राइवेट डाइनिंग स्पेस और प्रोफेशनल सर्विस।"
  },
  {
    name: "Neha Sharma",
    review: "We celebrated my daughter's birthday here. The staff made special arrangements and the food was delicious!"
  },
  {
    name: "Rahul Jain",
    review: "Regular customer for their thali service. Great variety and consistent quality. Value for money!"
  },
  {
    name: "Anita Patel",
    review: "Their catering service for our family function was excellent. Everyone praised the food quality."
  },
  {
    name: "Deepak Sinha",
    review: "Best restaurant for family dining. The ambiance is great and the staff is very courteous."
  },
  {
    name: "Meera Kapoor",
    review: "Love their vegetarian options! The paneer dishes are absolutely delicious. Must try their desserts too!"
  },
  {
    name: "Vikram Singh",
    review: "Outstanding service and amazing food quality. Their special thali is worth every penny!"
  }
];

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
      staggerChildren: 0.15
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section - Updated as requested */}
      <section className="relative min-h-[90vh] pt-16 md:pt-0 flex items-center">
        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
          }}
        ></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            className="max-w-xl text-white"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 
              className="font-title font-bold text-5xl md:text-7xl mb-4 text-white"
              variants={fadeIn}
            >
              Daily Food House
            </motion.h1>
            <motion.p 
              className="font-heading text-secondary text-3xl md:text-4xl mb-10"
              variants={fadeIn}
            >
              तृप्ति का स्वाद, हमारे पास
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-5"
              variants={fadeIn}
            >
              <Button
                asChild
                className="primary-btn text-lg px-8 py-6"
                onClick={() => document.getElementById('reserveTable').scrollIntoView({ behavior: 'smooth' })}
              >
                <a href="#reserveTable">Reserve Table</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg px-8 py-6 rounded-full border-2 border-white/30 transition-all duration-300"
              >
                <Link href="/order-online">Order Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Restaurant Hours with better contrast background */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary py-4 z-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-16 text-center items-center">
              <div className="flex items-center">
                <FaClock className="text-white mr-3 text-xl" />
                <span className="text-white text-lg">Lunch: 12:30 PM - 3:30 PM</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-white mr-3 text-xl" />
                <span className="text-white text-lg">Dinner: 7:00 PM - 10:45 PM</span>
              </div>
              <a
                href="https://wa.me/919202895096"
                className="flex items-center text-white hover:text-secondary transition-colors"
              >
                <FaWhatsapp className="text-white mr-3 text-xl" />
                <span className="text-lg">+91 92028 95096</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - Alfanzo Style */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-heading text-primary text-3xl md:text-5xl mb-3">Our Specialties</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
              At Daily Food House, we pride ourselves on providing exceptional culinary experiences 
              with our signature specialties that keep our customers coming back for more.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Feature 1 */}
            <motion.div 
              className="menu-card group hover:border-t-4 hover:border-primary p-6 md:p-8"
              variants={fadeIn}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-primary text-white rounded-full mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaLeaf className="text-2xl md:text-3xl" />
              </div>
              <h3 className="font-title text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-center text-primary">
                Authentic Cuisine
              </h3>
              <p className="text-gray-600 text-center text-sm md:text-base">
                Experience the rich and diverse flavors of traditional Indian
                cuisine prepared by our expert chefs using authentic recipes
                and premium ingredients.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="menu-card group hover:border-t-4 hover:border-primary p-6 md:p-8"
              variants={fadeIn}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-primary text-white rounded-full mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaUserTie className="text-2xl md:text-3xl" />
              </div>
              <h3 className="font-title text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-center text-primary">
                Expert Chefs
              </h3>
              <p className="text-gray-600 text-center text-sm md:text-base">
                Led by Chef Mukesh with over 15 years of experience in creating
                exquisite flavors and presentations that delight all your senses
                with every bite.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="menu-card group hover:border-t-4 hover:border-primary p-6 md:p-8"
              variants={fadeIn}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-primary text-white rounded-full mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaHeart className="text-2xl md:text-3xl" />
              </div>
              <h3 className="font-title text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-center text-primary">
                Made With Love
              </h3>
              <p className="text-gray-600 text-center text-sm md:text-base">
                Every dish is prepared with passion and dedication to provide
                you with a memorable dining experience that celebrates the rich
                culinary traditions of India.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Image Column */}
            <motion.div 
              className="md:w-1/2 w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Chef preparing indian food"
                  className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-3 md:p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <h4 className="font-dancing text-maroon text-xl md:text-2xl">
                      Chef Mukesh
                    </h4>
                    <p className="text-gold font-medium text-sm md:text-base">15+ Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content Column */}
            <motion.div 
              className="md:w-1/2 w-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-dancing text-gold text-2xl md:text-3xl mb-2">Our Story</h2>
              <h3 className="font-playfair font-bold text-3xl md:text-4xl mb-4 md:mb-6">
                Tradition of Excellence
              </h3>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                Daily Food House brings you the authentic flavors of India with a
                contemporary twist. Our restaurant is the culmination of decades
                of expertise in the hospitality industry.
              </p>

              <div className="mb-4 md:mb-6 space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <div className="bg-maroon rounded-full p-2 mr-3 md:mr-4 text-white flex-shrink-0">
                    <FaTrophy className="text-sm md:text-base" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-base md:text-lg">
                      Expert Management
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      Our owner brings over 25 years of experience in the hotel
                      industry, having managed more than 10 hotels ranging from
                      2-star to 4-star establishments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-maroon rounded-full p-2 mr-3 md:mr-4 text-white flex-shrink-0">
                    <FaGlassCheers className="text-sm md:text-base" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-base md:text-lg">
                      Event Expertise
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      With over 1000 successful wedding events organized
                      throughout his career, our owner understands the importance
                      of impeccable service and quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-maroon rounded-full p-2 mr-3 md:mr-4 text-white flex-shrink-0">
                    <FaUtensils className="text-sm md:text-base" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-base md:text-lg">
                      Culinary Excellence
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      Our kitchen is led by Chef Mukesh, who brings 15+ years of
                      culinary expertise, creating dishes that blend tradition
                      with innovation.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="bg-maroon hover:bg-gold text-white font-medium rounded-full transition-colors duration-300 shadow-lg"
                size="lg"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-dancing text-gold text-3xl mb-2">Testimonials</h2>
            <h3 className="font-playfair font-bold text-4xl mb-6">What Our Customers Say</h3>
            <p className="text-gray-600">
              Don't just take our word for it - hear what our valued customers have to say about their dining experience at Daily Food House.
            </p>
          </motion.div>

          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-1">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                        {testimonial.name[0]}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.review}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Reserve Table Section */}
      <section id="reserveTable" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-dancing text-gold text-3xl mb-2">Reservations</h2>
            <h3 className="font-playfair font-bold text-4xl mb-6">Book Your Table</h3>
            <p className="text-gray-600">
              Reserve your special moment with us. We'll make sure your dining experience is memorable.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input name="name" type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Mobile Number</label>
                  <input name="mobile" type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Number of People</label>
                  <input name="people" type="number" min="1" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Purpose</label>
                  <select name="purpose" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                    <option value="">Select Purpose</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="business">Business Meeting</option>
                    <option value="casual">Casual Dining</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input name="date" type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Time</label>
                  <input name="time" type="time" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Special Requests</label>
                <textarea name="message" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32" placeholder="Any special arrangements or requests..."></textarea>
              </div>

              <Button 
                asChild
                className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg transition-colors duration-300"
                onClick={(e) => {
                  const form = e.currentTarget.closest('form');
                  const formData = new FormData(form);
                  const message = `
Hello, I would like to make a table reservation:

Name: ${formData.get('name')}
Number of People: ${formData.get('people')}
Mobile: ${formData.get('mobile')}
Purpose: ${formData.get('purpose')}
Date: ${formData.get('date')}
Time: ${formData.get('time')}
Special Requests: ${formData.get('message') || 'None'}
                  `.trim();
                  
                  window.open(`https://wa.me/919202895096?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <a href="#">
                  <FaWhatsapp className="mr-2 inline-block" /> Reserve Now
                </a>
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-dancing text-gold text-3xl mb-2">Discover</h2>
            <h3 className="font-playfair font-bold text-4xl mb-6">Our Menu</h3>
            <p className="text-gray-600">
              Explore our extensive menu featuring authentic Indian flavors prepared
              with the finest ingredients and traditional recipes.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Menu Item 1 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeIn}
            >
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Paneer Butter Masala"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-playfair font-semibold text-lg">Paneer Butter Masala</h4>
                  <span className="bg-gold text-white px-2 py-1 rounded text-sm font-bold">₹190</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Cottage cheese in rich tomato butter gravy
                </p>
                <Button
                  asChild
                  className="w-full bg-maroon hover:bg-gold text-white"
                >
                  <a href="https://wa.me/9202895096?text=I%20would%20like%20to%20order%20Paneer%20Butter%20Masala">
                    <FaWhatsapp className="mr-2" /> Order Now
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Menu Item 2 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeIn}
            >
              <img
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Malai Kofta"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-playfair font-semibold text-lg">Malai Kofta</h4>
                  <span className="bg-gold text-white px-2 py-1 rounded text-sm font-bold">₹180</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Potato and cheese dumplings in creamy gravy
                </p>
                <Button
                  asChild
                  className="w-full bg-maroon hover:bg-gold text-white"
                >
                  <a href="https://wa.me/9202895096?text=I%20would%20like%20to%20order%20Malai%20Kofta">
                    <FaWhatsapp className="mr-2" /> Order Now
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Menu Item 3 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeIn}
            >
              <img
                src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Paneer Tikka"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-playfair font-semibold text-lg">Paneer Tikka Lazawab</h4>
                  <span className="bg-gold text-white px-2 py-1 rounded text-sm font-bold">₹250</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Marinated cottage cheese grilled to perfection
                </p>
                <Button
                  asChild
                  className="w-full bg-maroon hover:bg-gold text-white"
                >
                  <a href="https://wa.me/9202895096?text=I%20would%20like%20to%20order%20Paneer%20Tikka%20Lazawab">
                    <FaWhatsapp className="mr-2" /> Order Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center">
            <Button
              asChild
              className="bg-primary hover:bg-secondary text-white font-medium rounded-full transition-colors duration-300 shadow-lg inline-flex items-center"
              size="lg"
            >
              <Link href="/menu">
                <FaUtensils className="mr-2" /> View Full Menu
              </Link>
            </Button>
          </div>
          
          {/* Extra space for mobile bottom navigation */}
          <div className="h-20 lg:hidden mt-8"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
