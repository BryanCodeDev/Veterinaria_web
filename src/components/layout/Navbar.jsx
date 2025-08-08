// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Heart, Menu, X, User, Stethoscope } from 'lucide-react';

const Navbar = ({ onBookingClick, onServicesClick, onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleServicesClick = () => {
    onServicesClick();
    setIsMenuOpen(false);
  };

  const handleBookingClick = () => {
    onBookingClick();
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    onAdminClick();
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-teal-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="relative">
              <Heart className="h-8 w-8 text-teal-300" />
              <Stethoscope className="h-4 w-4 text-white absolute -bottom-1 -right-1" />
            </div>
            <span className="font-bold text-xl">PetSpa Veterinaria</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button 
                onClick={scrollToTop}
                className="hover:text-teal-300 transition-colors"
              >
                Inicio
              </button>
              <button 
                onClick={handleServicesClick}
                className="hover:text-teal-300 transition-colors"
              >
                Servicios
              </button>
              <button 
                onClick={handleBookingClick}
                className="bg-teal-300 text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-200 transition-colors"
              >
                Agendar Cita
              </button>
              <button 
                onClick={handleAdminClick}
                className="flex items-center text-gray-200 hover:text-teal-300 transition-colors"
                title="Panel Veterinario"
              >
                <User className="h-5 w-5 mr-1" />
                Panel Veterinario
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-teal-300 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-teal-900">
              <button
                onClick={scrollToTop}
                className="block px-3 py-2 text-base font-medium hover:text-teal-300 transition-colors w-full text-left"
              >
                Inicio
              </button>
              <button
                onClick={handleServicesClick}
                className="block px-3 py-2 text-base font-medium hover:text-teal-300 transition-colors w-full text-left"
              >
                Servicios
              </button>
              <button
                onClick={handleBookingClick}
                className="block w-full text-left px-3 py-2 bg-teal-300 text-teal-900 rounded-lg font-semibold hover:bg-teal-200 transition-colors mt-2"
              >
                Agendar Cita
              </button>
              <button
                onClick={handleAdminClick}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:text-teal-300 transition-colors w-full"
              >
                <User className="h-5 w-5 mr-2" />
                Panel Veterinario
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;