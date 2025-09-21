import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FaHome, FaUtensils, FaShoppingCart, FaImages, FaPhoneAlt, FaWhatsapp, FaBoxOpen, FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/menu", label: "Menu", icon: <FaUtensils /> },
    { href: "/order-online", label: "Order", icon: <FaShoppingCart /> },
    { href: "/tiffin", label: "Tiffin", icon: <FaBoxOpen /> },
    { href: "/gallery", label: "Gallery", icon: <FaImages /> },
    { href: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Fixed Top Navigation */}
      <nav
        className={`bg-primary text-white shadow-md fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "py-2 shadow-xl backdrop-blur-sm bg-primary/95" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div>
                <h1 className={`text-white font-title font-bold transition-all duration-300 ${
                  isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                }`}>
                  Daily Food House
                </h1>
                <p className={`text-white tracking-wider opacity-90 transition-all duration-300 ${
                  isScrolled ? "text-xs hidden md:block" : "text-xs"
                }`}>
                  AUTHENTIC INDIAN CUISINE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-medium transition-colors text-sm ${
                    isActive(link.href)
                      ? "text-secondary font-semibold"
                      : "text-white hover:text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="bg-white hover:bg-secondary text-primary hover:text-white font-bold rounded-full transition-colors duration-300 flex items-center text-sm px-4 py-2"
              >
                <a href="https://wa.me/919202895096">
                  <FaWhatsapp className="mr-2" /> Order Now
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white text-xl p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-primary border-t border-secondary/30 shadow-lg">
              <div className="px-4 py-3 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-3 py-3 px-2 rounded transition-colors ${
                      isActive(link.href)
                        ? "text-secondary font-semibold bg-white/10"
                        : "text-white hover:text-secondary hover:bg-white/5"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full bg-white hover:bg-secondary text-primary hover:text-white font-bold rounded-full transition-colors duration-300 flex items-center justify-center"
                  >
                    <a href="https://wa.me/919202895096">
                      <FaWhatsapp className="mr-2" /> Order Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar - Always Visible */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 shadow-xl">
        <div className="grid grid-cols-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActive(link.href)
                  ? "text-primary bg-primary/10"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <div className="text-lg mb-1">{link.icon}</div>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
