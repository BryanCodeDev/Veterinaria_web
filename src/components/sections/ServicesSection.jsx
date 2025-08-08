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
            Nuestros Servicios Veterinarios
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Servicios profesionales de alta calidad para el cuidado integral de tu mascota. 
            Desde baño y estética hasta consultas médicas especializadas.
          </p>
          <div className="mt-6 w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
          
          {/* Pet types icons */}
          <div className="flex justify-center items-center space-x-4 mt-6 text-2xl">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <span>🐕</span>
              <span className="text-sm font-medium text-gray-700">Perros</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <span>🐱</span>
              <span className="text-sm font-medium text-gray-700">Gatos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <span>🐰</span>
              <span className="text-sm font-medium text-gray-700">Otros</span>
            </div>
          </div>
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

        {/* Categories Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-900">
            Categorías de Servicios
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🛁</div>
              <div className="text-sm font-medium text-blue-900">Baño y Limpieza</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">✂️</div>
              <div className="text-sm font-medium text-green-900">Cuidado Personal</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">💅</div>
              <div className="text-sm font-medium text-purple-900">Estética</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl mb-2">🩺</div>
              <div className="text-sm font-medium text-teal-900">Consultas Médicas</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 px-4">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-6 md:p-8 rounded-2xl shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 text-3xl">
                <span className="animate-bounce" style={{animationDelay: '0s'}}>🐕</span>
                <span className="animate-bounce" style={{animationDelay: '0.2s'}}>❤️</span>
                <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🐱</span>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              ¿Tu mascota necesita cuidado profesional?
            </h3>
            <p className="text-teal-100 mb-6 text-sm md:text-base">
              Agenda una cita y descubre por qué somos la veterinaria de confianza en Mosquera
            </p>
            <button 
              onClick={handleGeneralBooking}
              className="bg-teal-300 text-teal-900 px-6 md:px-8 py-3 rounded-lg font-bold text-base md:text-lg hover:bg-teal-200 transform hover:scale-105 transition-all duration-200"
            >
              <span className="mr-2">🐾</span>
              Agendar Cita Ahora
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-teal-600 text-2xl mb-2">⏰</div>
            <div className="font-medium text-gray-900">Horarios Flexibles</div>
            <div className="text-sm text-gray-600">Incluyendo fines de semana</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-teal-600 text-2xl mb-2">👨‍⚕️</div>
            <div className="font-medium text-gray-900">Personal Calificado</div>
            <div className="text-sm text-gray-600">Médicos veterinarios certificados</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-teal-600 text-2xl mb-2">💝</div>
            <div className="font-medium text-gray-900">Trato Amoroso</div>
            <div className="text-sm text-gray-600">Tu mascota en las mejores manos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;