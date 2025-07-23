"use client"
import { APP_NAME } from "./APP_NAMEConfig";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import * as React from "react";

const navLinks = [
  { label: "Explore", href: "#" },
  { label: "Problems", href: "#" },
  { label: "Contest", href: "#" },
  { label: "Discuss", href: "#" },
  { label: "Interview", href: "#" },
  { label: "Store", href: "#" },
];

export function Navbar() {
  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="text-2xl text-primary">🧠</span>
          <span>{APP_NAME}</span>
        </div>
        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} className="hover:text-primary transition-colors px-2 py-1 rounded">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </Button>
          {/* Login/Signup */}
          <Button variant="outline" className="ml-2 px-4 py-1 text-sm font-semibold">
            Login
          </Button>
          <Button variant="default" className="px-4 py-1 text-sm font-semibold">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
} 