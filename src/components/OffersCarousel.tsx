"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getPublicActiveOffers, type Offer } from '../lib/offersApi';

// Offer type now comes from lib/offersApi
interface OffersCarouselProps {
  onOfferClick?: (offer: Offer) => void;
}

const OffersCarousel: React.FC<OffersCarouselProps> = ({ onOfferClick }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback mock data in case API fails or returns empty
  const mockOffers: Offer[] = [
    {
      offer_id: 1,
      seller_id: "seller1",
      offer_title: "Get Special Discount at TOP RESTAURANT",
      offer_description: "40% discount on all items",
      offer_image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      discount_type: "percentage",
      discount_value: 40,
      min_order_amount: 500,
      max_discount_amount: 200,
      valid_from: "2025-01-01",
      valid_until: "2025-12-31",
      is_active: true,
      usage_limit: 1000,
      used_count: 250,
      created_at: "2025-01-01T00:00:00Z",
      // updated_at omitted in user-facing Offer type
    },
    {
      offer_id: 2,
      seller_id: "seller2",
      offer_title: "FREE DELIVERY on orders above ₹300",
      offer_description: "No delivery charges",
      offer_image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      discount_type: "fixed_amount",
      discount_value: 50,
      min_order_amount: 300,
      valid_from: "2025-01-01",
      valid_until: "2025-06-30",
      is_active: true,
      usage_limit: 500,
      used_count: 120,
      created_at: "2025-01-01T00:00:00Z",
      // updated_at omitted in user-facing Offer type
    },
    {
      offer_id: 3,
      seller_id: "seller3",
      offer_title: "Buy 2 Get 1 FREE on all Pizzas",
      offer_description: "Limited time offer",
      offer_image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
      discount_type: "percentage",
      discount_value: 33,
      min_order_amount: 600,
      max_discount_amount: 300,
      valid_from: "2025-01-01",
      valid_until: "2025-03-31",
      is_active: true,
      usage_limit: 200,
      used_count: 45,
      created_at: "2025-01-01T00:00:00Z",
      // updated_at omitted in user-facing Offer type
    }
  ];

  // Fetch offers from public API
  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPublicActiveOffers();
      if (data.success && data.offers.length > 0) {
        setOffers(data.offers);
      } else {
        // fallback to mocks if no offers returned
        setOffers(mockOffers);
      }
    } catch (err) {
      console.error('Failed to fetch offers:', err);
      setError('Failed to load offers');
      setOffers(mockOffers);
    } finally {
      setLoading(false);
    }
  };

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    fetchOffers();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (offers.length > 1) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [offers.length]);

  // No additional formatting needed – we only display the image

  const handleOfferClick = (offer: Offer) => {
    onOfferClick?.(offer);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    stopAutoSlide();
    setTimeout(startAutoSlide, 5000); // Restart auto-slide after 5 seconds
  };

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-[18px] flex-shrink-0"
        style={{ 
          width: '379px', 
          height: '177px',
          margin: '0 auto',
          marginTop: '16px'
        }}
      >
        <div className="text-gray-500">Loading offers...</div>
      </div>
    );
  }

  if (error && offers.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-[18px] flex-shrink-0"
        style={{ 
          width: '379px', 
          height: '177px',
          margin: '0 auto',
          marginTop: '16px'
        }}
      >
        <div className="text-gray-500">No offers available</div>
      </div>
    );
  }

  if (offers.length === 0) return null;

  const currentOffer = offers[currentIndex];

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0 mx-auto mt-4 px-2 py-1"
      style={{
        width: '379px',
        height: '177px',
        aspectRatio: '182/85',
      }}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onClick={() => handleOfferClick(currentOffer)}
    >
      <img
        src={currentOffer.offer_image || '/placeholder-offer.jpg'}
        alt={currentOffer.offer_title}
        className="w-full h-full object-cover rounded-[18px]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/placeholder-offer.jpg';
        }}
      />

      {/* Pagination Dots */}
      {offers.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersCarousel;
