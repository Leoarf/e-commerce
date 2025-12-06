import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Effect for route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // Effect for page reload (F5)
  useEffect(() => {
    // This function is called whenever the page is loaded/reloaded
    const handleLoad = () => {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant', // Instant behavior for F5
        });
      }, 10);
    };

    // Add listener for the load event
    window.addEventListener('load', handleLoad);

    // Also execute immediately if the page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []); // Runs only once on mount

  // Effect to handle browser behavior
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      // Restore default behavior on unmount
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}
