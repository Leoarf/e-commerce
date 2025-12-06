import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { VISIBLE_CARDS_BREAKPOINTS } from './newArrivalsConfig';

export const useNewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(VISIBLE_CARDS_BREAKPOINTS.lg);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(VISIBLE_CARDS_BREAKPOINTS.md);
      } else {
        setVisibleCards(VISIBLE_CARDS_BREAKPOINTS.sm);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const scroll = useCallback((direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (container && newArrivals.length > 0) {
      const currentScrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const tolerance = 1;
      const isAtLeft = currentScrollLeft <= tolerance;
      const isAtRight =
        currentScrollLeft + clientWidth >= scrollWidth - tolerance;
      setCanScrollLeft(!isAtLeft);
      setCanScrollRight(!isAtRight);
      const totalScrollableWidth = scrollWidth - clientWidth;
      let index = 0;
      if (totalScrollableWidth > 0) {
        const scrollPercentage = currentScrollLeft / totalScrollableWidth;
        const totalItems = newArrivals.length;
        index = Math.round(scrollPercentage * (totalItems - 1));
      } else {
        index = 0;
      }
      setCurrentIndex(Math.min(index, newArrivals.length - 1));
    }
  }, [newArrivals]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      setTimeout(updateScrollButtons, 100);
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [newArrivals, updateScrollButtons]);

  const scrollToPage = useCallback(
    (pageIndex) => {
      const container = scrollRef.current;
      if (container) {
        const cardWidth = container.firstChild?.offsetWidth || 300;
        const gap = 32;
        const scrollTo = pageIndex * visibleCards * (cardWidth + gap);
        container.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        });
      }
    },
    [visibleCards]
  );

  return {
    scrollRef,
    isDragging,
    newArrivals,
    isLoading,
    canScrollLeft,
    canScrollRight,
    currentIndex,
    visibleCards,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    scroll,
    scrollToPage,
  };
};
