"use client";
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onVoiceSearch?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onVoiceSearch, 
  placeholder = "Search for your favorite food or place…" 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleVoiceClick = () => {
    onVoiceSearch?.();
  };

  return (
    <div 
      className="relative flex items-center bg-white rounded-[15px] shadow-md border border-gray-200 flex-shrink-0"
      style={{ 
        width: '379px', 
        height: '46px',
        margin: '0 auto',
        boxShadow: '0px 4px 12px 0px rgba(13, 10, 44, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 100%)'
      }}
    >
      {/* Search Icon */}
      <div 
        className="flex items-center justify-center flex-shrink-0"
        style={{ 
          width: '30px', 
          height: '30px',
          marginLeft: '8px'
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{ width: '24px', height: '24px' }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            style={{ marginLeft: '3px', marginTop: '3px' }}
          >
            <circle 
              cx="11" 
              cy="11" 
              r="8" 
              stroke="#ABB7C2" 
              strokeWidth="2"
            />
            <path 
              d="m21 21-4.35-4.35" 
              stroke="#ABB7C2" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Input Field */}
      <div 
        className="flex items-center flex-1"
        style={{ 
          marginLeft: '8px',
          paddingRight: '8px'
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-full border-none outline-none bg-transparent text-sm"
          style={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: '#000000',
            caretColor: '#F86B1C'
          }}
        />
      </div>

      {/* Voice/Mic Icon */}
      <button
        onClick={handleVoiceClick}
        className="flex items-center justify-center bg-white rounded-[15px] flex-shrink-0 hover:bg-gray-50 transition-colors"
        style={{ 
          width: '40px', 
          height: '40px',
          marginRight: '3px'
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{ width: '24px', height: '24px' }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            style={{ marginLeft: '8px', marginTop: '8px' }}
          >
            <path 
              d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" 
              stroke="#F86B1C" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M19 10v1a7 7 0 0 1-14 0v-1" 
              stroke="#F86B1C" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <line 
              x1="12" 
              y1="19" 
              x2="12" 
              y2="22" 
              stroke="#F86B1C" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
