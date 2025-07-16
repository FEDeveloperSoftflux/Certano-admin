import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < breakpoints.md;
  const isTablet = windowWidth >= breakpoints.md && windowWidth < breakpoints.lg;
  const isDesktop = windowWidth >= breakpoints.lg;
  const isSmallDesktop = windowWidth >= breakpoints.lg && windowWidth < breakpoints.xl;
  const isLargeDesktop = windowWidth >= breakpoints.xl;

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isSmallDesktop,
    isLargeDesktop,
    breakpoints: {
      xs: windowWidth >= breakpoints.xs,
      sm: windowWidth >= breakpoints.sm,
      md: windowWidth >= breakpoints.md,
      lg: windowWidth >= breakpoints.lg,
      xl: windowWidth >= breakpoints.xl,
      '2xl': windowWidth >= breakpoints['2xl'],
    },
  };
};
