import { useState, useEffect } from 'react';
import MobileHome from './MobileHome';
import Home from './Home';

const ResponsiveComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileHome /> : <Home />;
};

export default ResponsiveComponent;
