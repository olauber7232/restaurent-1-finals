import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  // Show pulse animation periodically
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, 10000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Show tooltip on first load and then hide it
  useEffect(() => {
    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);

      // Hide tooltip after 5 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 3000);

    return () => clearTimeout(tooltipTimer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 max-w-[200px] z-50"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-800">
              Order food directly via WhatsApp! Click here
            </p>
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/919202895096?text=I%20would%20like%20to%20place%20an%20order%20from%20Daily%20Food%20House"
        className="whatsapp-button fixed bottom-6 right-6 lg:bottom-6 lg:right-6 bg-green-500 hover:bg-green-600 text-white p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 active:scale-95"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ bottom: window.innerWidth < 768 ? '6rem' : '1.5rem' }}
      >
        <FaWhatsapp className="text-lg lg:text-xl" />
        {showPulse && (
          <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-75"></span>
        )}
      </a>
    </>
  );
};

export default WhatsAppButton;