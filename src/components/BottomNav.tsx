"use client";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ORANGE = "#F86B1C";

type NavItem = {
  label: string;
  route?: string;
  iconSrc?: string;
};

const items: NavItem[] = [
  { label: "Home", route: "/home", iconSrc: "/icons/Group 57.svg" },
  { label: "Services", route: "/collection", iconSrc: "/icons/source_image.png" },
  { label: "Scan" },
  { label: "Reorder", route: "/order-history", iconSrc: "/icons/Vector.svg" },
  { label: "Cart", iconSrc: "/icons/Icon.svg" },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (route?: string) => {
    if (route) navigate(route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto w-full max-w-[480px] px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="relative">
          {/* Main pill container */}
          <div className="bg-white rounded-2xl h-[72px] shadow-[0_6px_24px_rgba(0,0,0,0.15)] flex items-center justify-between px-6">
            {items.map((item, idx) => {
              if (item.label === "Scan") {
                // Reserve space under the floating action button
                return <div key={idx} className="w-16" />;
              }
              const isActive = item.route && location.pathname.startsWith(item.route);
              return (
                <button
                  key={idx}
                  className={`flex flex-col items-center justify-center text-xs ${
                    isActive ? "text-gray-900 font-semibold" : "text-gray-600"
                  }`}
                  onClick={() => handleClick(item.route)}
                >
                  {item.iconSrc ? (
                    <img
                      src={item.iconSrc}
                      alt={item.label}
                      className={`w-6 h-6 ${isActive ? "opacity-100" : "opacity-70"}`}
                    />
                  ) : null}
                  <span className="mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Center floating Scan button */}
          <button
            aria-label="Scan"
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(0,0,0,0)] ring-8 ring-white"
            style={{ backgroundColor: ORANGE }}
          >
            {/* Prefer custom asset when available */}
            <img
              src="/icons/Qr-Code--Streamline-Core.svg"
              alt="Scan"
              className="w-7 h-7"
              onError={(e) => {
                // fallback emoji if asset missing
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-900 text-sm font-semibold">
              Scan
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;


