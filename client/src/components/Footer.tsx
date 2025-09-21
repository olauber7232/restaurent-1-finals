import React from "react";
import { Link } from "wouter";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 md:pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* About Restaurant */}
          <div>
            <h5 className="font-title font-bold text-lg md:text-xl mb-3 md:mb-4 text-white">
              Daily Food House
            </h5>
            <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">
              Experience unique Indian flavors. Our traditional dishes with modern presentation.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-sm md:text-base" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm md:text-base" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-sm md:text-base" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h5 className="font-title font-bold text-lg md:text-xl mb-3 md:mb-4 text-white">
              Opening Hours
            </h5>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
              <li className="flex flex-col md:flex-row md:justify-between">
                <span className="text-white/80">Monday - Friday</span>
                <span className="text-secondary">12:30 PM - 3:30 PM</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between">
                <span className="text-white/80">Monday - Friday</span>
                <span className="text-secondary">7:00 PM - 10:45 PM</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between">
                <span className="text-white/80">Saturday - Sunday</span>
                <span className="text-secondary">12:30 PM - 3:30 PM</span>
              </li>
              <li className="flex flex-col md:flex-row md:justify-between">
                <span className="text-white/80">Saturday - Sunday</span>
                <span className="text-secondary">7:00 PM - 10:45 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-title font-bold text-lg md:text-xl mb-3 md:mb-4 text-white">
              Contact Information
            </h5>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-secondary mt-1 mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  Metro Tower, New Collectorate Rd, Gwalior, MP 474011
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-secondary mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-white/80">+91 92028 95096</span>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="text-secondary mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-white/80">+91 92028 95096</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Subscription */}
          <div>
            <h5 className="font-title font-bold text-lg md:text-xl mb-3 md:mb-4 text-white">
              Connect With Us
            </h5>
            <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">
              Follow us on social media for special offers and updates
            </p>
            <div className="flex space-y-2 md:space-y-3 flex-col text-sm md:text-base">
              <a 
                href="https://goo.gl/maps/ky8kdNeEzVeVGb2n8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors flex items-start"
              >
                <FaMapMarkerAlt className="text-secondary mr-2 md:mr-3 mt-1 flex-shrink-0" />
                <span>Find us on Google Maps</span>
              </a>
              <a 
                href="https://wa.me/919202895096" 
                className="text-white/80 hover:text-white transition-colors flex items-center"
              >
                <FaWhatsapp className="text-secondary mr-2 md:mr-3 flex-shrink-0" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 md:pt-8 pb-6 md:pb-8 text-center lg:pb-8">
          <p className="text-white/60 text-sm md:text-base">
            &copy; {new Date().getFullYear()} Daily Food House. All rights reserved.
          </p>
        </div>
        
        {/* Extra space for mobile bottom navigation */}
        <div className="h-20 lg:hidden"></div>
      </div>
    </footer>
  );
};

export default Footer;
