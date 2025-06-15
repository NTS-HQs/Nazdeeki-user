"use client";
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="flex items-center">
          <Drawer direction="left">
            <DrawerTrigger className="md:hidden w-[32px]"><img className='w-full' src="/icons/Profile.svg" alt="Profile" /></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <NavigationMenu viewport={false} className="hidden max-md:block">
                <NavigationMenuList className="flex flex-col space-y-2 items-start">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/">Home</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/profile">Profile</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/collection">Collection</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/bookings">Bookings</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/address-collection">Your Address Collection</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/order-history">Order History</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/dine-order">Dine Order</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/register-restaurant">Register on Restaurant</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/feedback">Feedback</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/settings">Settings</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <img src="/logo.png" alt="Logo" className="h-10 max-md:hidden mr-2" />
          <h2 className="text-xl font-semibold max-md:hidden">Nazdeeki</h2>
        </div>
        
          <input
            type="text"
            placeholder="Search location..."
            className="border rounded px-4 py-2"
          />
          <button className="h-[32px] md:hidden"><img className='w-full h-full' src="/icons/Notification.svg" alt="Notification" /></button>
          <button className="h-[32px] md:hidden"><img className='w-full' src="/icons/Help.svg" alt="Help" /></button>
        
        <NavigationMenu className="block max-md:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/">Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/profile">Profile</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/collection">Collection</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/bookings">Bookings</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/address-collection">Your Address Collection</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/order-history">Order History</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/dine-order">Dine Order</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/register-restaurant">Register on Restaurant</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/feedback">Feedback</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/settings">Settings</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <button className="text-2xl max-md:hidden">👤</button>
      </header>
      <main className="flex-grow p-6">{children}</main>
      <footer className="bg-gray-100 p-4 text-center">
        <p>&copy; 2025 Nazdeeki. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
