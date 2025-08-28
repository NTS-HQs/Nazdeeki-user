"use client";
import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import Header from './Header';
import SearchBar from './SearchBar';
import OffersCarousel from './OffersCarousel';


const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/home';

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-no-repeat bg-center"
      style={isHome ? { backgroundImage: 'url(/back.png)' } : undefined}
    >
      <Header />
      <SearchBar />
      <OffersCarousel />
      <main className="flex-grow pb-[96px] pt-4">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
