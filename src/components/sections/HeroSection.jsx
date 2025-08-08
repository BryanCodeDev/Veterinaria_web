// src/components/sections/HeroSection.jsx
import React from 'react';
import { Star, MapPin, Phone, Heart } from 'lucide-react';

const HeroSection = ({ onBookingClick }) => {
  const stats = [
    { number: "3+", label: "Años de Experiencia" },
    { number: "2000+", label: "Mascotas Atendidas" },
    { number: "5★", label: "Calificación Promedio" }
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicios');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 md:opacity-10">
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-16 md:w-32 h-16 md:h-32 border border-teal-300 rounded-full"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-12 md:w-24 h-12 md:h-24 border border-teal-300 rounded-full"></div>
        <div className="absolute top-20 md:top-40 right-10 md:right-20 w-8 md:w-16 h-8 md:h-16 bg-teal-300 rounded-full blur-sm"></div>
        <div className="absolute bottom-20 md:bottom-40 left-10 md:left-20 w-10 md:w-20 h-10 md:h-20 bg-teal-300 rounded-full blur-sm"></div>
        {/* Pet silhouettes */}
        <div className="absolute top-16 left-1/4 text-3xl md:text-6xl opacity-5">🐕</div>
        <div className="absolute bottom-16 right-1/4 text-2xl md:text-5xl opacity-5">🐱</div>
        <div className="absolute top-1/2 left-6 text-xl md:text-4xl opacity-5">🐰</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Title */}
          <div className="flex items-center justify-center mb-3 md:mb-4">
            <Heart className="h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12 text-teal-300 mr-2 md:mr-4 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-teal-200 via-white to-teal-300 bg-clip-text text-transparent">
              PetSpa Veterinaria
            </h1>
            <Heart className="h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12 text-teal-300 ml-2 md:ml-4 animate-pulse" />
          </div>
          
          {/* Subtitle */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 md:h-6 md:w-6 text-teal-300 fill-current mr-2" />
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-teal-200">
                Cuidado Profesional para tu Mascota
              </h2>
              <Star className="h-4 w-4 md:h-6 md:w-6 text-teal-300 fill-current ml-2" />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-4xl mx-auto text-teal-100 leading-relaxed px-4">
            Servicios <span className="text-teal-200 font-semibold">profesionales</span> de baño, estética y cuidado veterinario. 
            Tu mascota merece el mejor trato en Mosquera, Cundinamarca.
          </p>

          {/* Pet icons decoration */}
          <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-6 md:mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <span className="animate-bounce" style={{animationDelay: '0s'}}>🐕</span>
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🐱</span>
            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🐰</span>
            <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🐹</span>
            <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🐦</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 lg:gap-8 mb-6 md:mb-10 max-w-3xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center py-3 md:py-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-teal-200 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-teal-100 font-medium text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-10 px-4">
            <button 
              onClick={onBookingClick}
              className="group bg-teal-300 text-teal-900 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-teal-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-300/25"
            >
              <span className="mr-2">🐾</span>
              Agendar Cita para mi Mascota
            </button>
            <button 
              onClick={scrollToServices}
              className="border-2 border-teal-300 text-teal-200 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-teal-300 hover:text-teal-900 transition-all duration-300"
            >
              Ver Servicios
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 text-teal-200 px-4 mb-6 md:mb-8">
            <div className="flex items-center">
              <Phone className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-teal-300 mr-2" />
              <span className="text-xs sm:text-sm md:text-base">+57 300 456 7890</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-teal-300 rounded-full"></div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-teal-300 mr-2" />
              <span className="text-xs sm:text-sm md:text-base">Mosquera, Cundinamarca</span>
            </div>
          </div>

          {/* Special message */}
          <div className="bg-teal-800 bg-opacity-50 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 max-w-2xl mx-auto border border-teal-400 border-opacity-30">
            <p className="text-teal-100 text-xs sm:text-sm md:text-base">
              <Heart className="h-3 w-3 md:h-4 md:w-4 inline text-teal-300 mr-1" />
              <strong>Tu mascota es nuestra prioridad.</strong> Ofrecemos atención personalizada con amor y cuidado profesional.
              <Heart className="h-3 w-3 md:h-4 md:w-4 inline text-teal-300 ml-1" />
            </p>
          </div>
        </div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/5 to-transparent animate-pulse"></div>
    </section>
  );
};

export default HeroSection;