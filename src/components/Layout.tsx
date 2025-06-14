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
        <div className="flex items-center space-x-4">
          <Drawer direction="left">
            <DrawerTrigger className="md:hidden">☰</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <NavigationMenu viewport={false} className="hidden max-md:block">
                <NavigationMenuList className="flex flex-col space-y-2 items-start">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/orders">Orders</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/products">Products</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/offers">Offers</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/history">History</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/customer">Customer</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="/help">Help</a>
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
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h2 className="text-xl font-semibold">Nazdeeki</h2>
        </div>
        <NavigationMenu className="block max-md:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/orders">Orders</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/products">Products</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/offers">Offers</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/history">History</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/customer">Customer</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/help">Help</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/settings">Settings</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <button className="text-2xl">👤</button>
      </header>
      <main className="flex-grow p-6">{children}</main>
      <footer className="bg-gray-100 p-4 text-center">
        <p>&copy; 2025 Nazdeeki. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
