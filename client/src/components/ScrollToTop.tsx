import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component that scrolls the window to the top
 * whenever the route/location changes
 */
const ScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll window to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;