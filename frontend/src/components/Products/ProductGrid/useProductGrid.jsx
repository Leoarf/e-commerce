import { useCallback } from 'react';
import { FiStar } from 'react-icons/fi';

export const useProductGrid = () => {
  const getColorHex = useCallback((colorName) => {
    const colorMap = {
      Blue: '#3B82F6',
      Black: '#000000',
      Red: '#EF4444',
      Green: '#10B981',
      Yellow: '#F59E0B',
      Gray: '#6B7280',
      White: '#FFFFFF',
      Pink: '#EC4899',
      Navy: '#1E40AF',
      Denim: '#1560BD',
    };
    return colorMap[colorName] || '#6B7280';
  }, []);

  const formatBadgeText = useCallback((text) => {
    if (!text) return 'N/A';

    if (text.length > 10) {
      const formatted = text.replace(/([A-Z])/g, ' $1').trim();
      if (formatted.length <= 12) return formatted;
      return text.substring(0, 10) + '...';
    }

    return text;
  }, []);

  const renderStars = useCallback((rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar
          key={`full-${i}`}
          className="h-2.5 w-2.5 text-amber-400 fill-amber-400 flex-shrink-0"
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative h-2.5 w-2.5 flex-shrink-0">
          <FiStar className="absolute h-2.5 w-2.5 text-gray-300" />
          <div className="absolute h-2.5 w-1.25 overflow-hidden">
            <FiStar className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar
          key={`empty-${i}`}
          className="h-2.5 w-2.5 text-gray-300 flex-shrink-0"
        />
      );
    }

    return stars;
  }, []);

  const getStockStatus = useCallback((countInStock) => {
    if (countInStock === 0) return { text: 'SOLD OUT', color: 'bg-red-500' };
    if (countInStock < 10) return { text: 'LOW STOCK', color: 'bg-amber-500' };
    return {
      text: 'IN STOCK',
      color: 'bg-gradient-to-r from-emerald-500 to-green-500',
    };
  }, []);

  return {
    getColorHex,
    formatBadgeText,
    renderStars,
    getStockStatus,
  };
};
