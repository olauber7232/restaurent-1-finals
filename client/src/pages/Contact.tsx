import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const Contact: React.FC = () => {
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
            <h1 className="font-dancing text-gold text-4xl mb-2">Reach Us</h1>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you! Reach out to us for reservations, feedback, or any inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-playfair font-bold text-2xl mb-6 text-maroon">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gold text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Address</h4>
                      <p className="text-gray-600">
                        Metro Tower, New Collectorate Rd, Madhuwan Enclave, Mahalgaon, Gwalior, Madhya Pradesh 474011
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhoneAlt className="text-gold text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Phone</h4>
                      <p className="text-gray-600">+91 92028 95096</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaWhatsapp className="text-gold text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                      <p className="text-gray-600">+91 92028 95096</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaClock className="text-gold text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Hours</h4>
                      <p className="text-gray-600">
                        Lunch: 12:30 PM - 3:30 PM<br />
                        Dinner: 7:00 PM - 10:45 PM
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-8">
                  <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-maroon text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="#"
                      className="bg-maroon text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="bg-maroon text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="https://wa.me/9202895096"
                      className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Google Map */}
            <motion.div
              className="h-full min-h-[400px] bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.0231464476634!2d78.21044871503825!3d26.235693883417774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6904d341b99%3A0xbac74dc9a60b9bcb!2sMetro%20Tower%2C%20New%20Collectorate%20Rd%2C%20Madhuwan%20Enclave%2C%20Mahalgaon%2C%20Gwalior%2C%20Madhya%20Pradesh%20474011!5e0!3m2!1sen!2sin!4v1680345293578!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Daily Food House Location - Metro Tower, Gwalior"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-36 h-36 mb-6 overflow-hidden rounded-full border-4 border-primary shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Chef Mukesh - Restaurant Owner" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair font-bold text-3xl mb-2 text-maroon">
                Visit Us Today
              </h3>
              <h4 className="font-medium text-xl mb-3 text-primary">Chef Mukesh - Owner</h4>
              <p className="text-gray-600">
                With over 15 years of experience in the hotel industry, Chef Mukesh welcomes you to Daily Food House. 
                For reservations or any special requests, please don't hesitate to contact us.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                asChild
                className="bg-maroon hover:bg-gold text-white rounded-full px-8"
                size="lg"
              >
                <a href={`tel:9202895096`}>
                  <FaPhoneAlt className="mr-2" /> Call Now
                </a>
              </Button>
              
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
                size="lg"
              >
                <a href="https://wa.me/9202895096">
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </a>
              </Button>
              
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
                size="lg"
              >
                <a href="https://maps.app.goo.gl/ky8kdNeEzVeVGb2n8" target="_blank" rel="noopener noreferrer">
                  <FaMapMarkerAlt className="mr-2" /> Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
