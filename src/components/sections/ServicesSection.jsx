// src/components/sections/ServicesSection.jsx
import React from 'react';
import ServiceCard from '../common/ServiceCard';
import { services } from '../../data/services';

const ServicesSection = ({ onBookingClick }) => {
  // Handle booking from the bottom CTA (no specific service)
  const handleGeneralBooking = () => {
    onBookingClick(); // No service passed - will show all services
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Servicios premium para el hombre moderno. Cada servicio está diseñado 
            para brindarte la mejor experiencia y resultados excepcionales.
          </p>
          <div className="mt-6 w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              onBookingClick={onBookingClick} // This will pass the specific service
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 px-4">
          <div className="bg-gradient-to-r from-black to-gray-900 text-white p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              ¿Listo para una experiencia VIP?
            </h3>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              Agenda tu cita y descubre por qué somos la mejor barbería de Mosquera
            </p>
            <button 
              onClick={handleGeneralBooking}
              className="bg-amber-400 text-black px-6 md:px-8 py-3 rounded-lg font-bold text-base md:text-lg hover:bg-amber-500 transform hover:scale-105 transition-all duration-200"
            >
              Agendar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;