"use client";
import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  profileImage: string;
  location: string;
  isVegPreference: boolean;
  hasNotifications: boolean;
}

interface HeaderProps {
  user?: User;
  onVegToggle?: (isVeg: boolean) => void;
  onNotificationClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onVegToggle, 
  onNotificationClick 
}) => {
  // Default values when no user data from backend
  const defaultUser: User = {
    id: "placeholder",
    name: "Neel",
    profileImage: "/icons/source_image.png",
    location: "Home - Viman Nagar Rd, Pune...",
    isVegPreference: true,
    hasNotifications: true
  };

  const currentUser = user || defaultUser;
  const [isVeg, setIsVeg] = useState(currentUser.isVegPreference);

  const handleVegToggle = () => {
    const newVegState = !isVeg;
    setIsVeg(newVegState);
    onVegToggle?.(newVegState);
  };

  const handleNotificationClick = () => {
    onNotificationClick?.();
  };

  return (
    <header 
      className="flex justify-between items-center bg-transparent flex-shrink-0 px-4"
      style={{ 
        width: '379px', 
        height: '49px',
        margin: '16px auto 0 auto'
      }}
    >
      {/* Left section - User profile and location */}
      <div className="flex items-center gap-[11px]">
        {/* Profile image container */}
        <div 
          className="rounded-full overflow-hidden border border-gray-200 flex-shrink-0"
          style={{ width: '50px', height: '49px' }}
        >
          <img 
            src={currentUser.profileImage} 
            alt={currentUser.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/icons/source_image.png";
            }}
          />
        </div>
        
        {/* Name and location */}
        <div 
          className="flex flex-col justify-center"
          style={{ width: '223px', height: '48px' }}
        >
          <h2 
            className="font-semibold text-black leading-[1.5em] text-left"
            style={{ 
              fontFamily: 'Poppins',
              fontSize: '20px',
              fontWeight: 600
            }}
          >
            {currentUser.name}
          </h2>
          <div className="flex items-center gap-[3px]">
            <div className="w-[14px] h-[14px] flex items-center justify-center">
              <img 
                src="/icons/location.svg" 
                alt="Location" 
                className="w-full h-full"
                style={{ filter: 'invert(27%) sepia(100%) saturate(3000%) hue-rotate(100deg)' }} // Make it green
              />
            </div>
            <span 
              className="text-[#5E5E5E] leading-[1.5em] text-left"
              style={{ 
                fontFamily: 'Poppins',
                fontSize: '12px',
                fontWeight: 400,
                width: '304px'
              }}
            >
              {currentUser.location}
            </span>
          </div>
        </div>
      </div>

      {/* Right section - Notification and Veg toggle */}
      <div className="flex items-center gap-[16px]">
        {/* Notification bell */}
        <button 
          className="relative flex-shrink-0"
          onClick={handleNotificationClick}
          style={{ width: '30px', height: '32px'}}
        >
          <img 
            src="/icons/bell.svg" 
            alt="Notifications" 
            className="w-full h-full"
          />
          {currentUser.hasNotifications && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F86B1C] rounded-full"></div>
          )}
        </button>

        {/* Veg toggle */}
        <div 
          className="flex flex-col items-center relative"
          style={{ width: '27px', height: '34px' }}
        >
          <button 
            onClick={handleVegToggle}
            className="relative flex-shrink-0"
            style={{ width: '31px', height: '31px', marginLeft: '-4px', marginTop: '9px' }}
          >
            <img 
              src="/icons/toggle.svg" 
              alt="Toggle" 
              className="w-full h-full"
              style={{ 
                filter: isVeg ? 'none' : 'grayscale(1) opacity(0.5)'
              }}
            />
          </button>
          <span 
            className="text-black absolute"
            style={{ 
              fontFamily: 'Poppins',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '1.5em',
              top: '-4px',
              left: '-1px',
              width: '24px',
              height: '18px'
            }}
          >
            Veg
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
