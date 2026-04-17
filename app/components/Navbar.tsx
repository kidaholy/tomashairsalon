'use client';

import { useState, useEffect } from 'react';
import { NavigationItem } from '@/types/salon';

interface NavbarProps {
  navigation: NavigationItem[];
  salonName: string;
}

export default function Navbar({ navigation, salonName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="flex justify-center items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-serif text-3xl font-bold text-primary tracking-wider">
              {salonName}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
