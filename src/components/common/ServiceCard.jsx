// src/components/common/ServiceCard.jsx
import React from 'react';
import { Clock, Star, Scissors } from 'lucide-react';

const ServiceCard = ({ service, index, onBookingClick }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  };

  const handleBookingClick = () => {
    // Pass the specific service to the booking function
    onBookingClick(service);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-amber-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center flex-1">
          <div className="bg-amber-100 p-2 rounded-lg mr-3 group-hover:bg-amber-200 transition-colors">
            <Scissors className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
            {service.name}
          </h3>
        </div>
        <div className="flex items-center text-amber-500 ml-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-current" />
          ))}
        </div>
      </div>
      
      {/* Duration and Price */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-600">
          <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
          <span className="text-xs md:text-sm font-medium">{service.duration}</span>
        </div>
        <div className="text-lg md:text-2xl font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
          {formatPrice(service.price)}
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors line-clamp-3">
        {service.description}
      </p>

      {/* Popular Badge */}
      {service.popular && (
        <div className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full mb-2">
          ⭐ Popular
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleBookingClick}
        className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-3 md:px-4 rounded-lg font-semibold text-sm md:text-base hover:bg-amber-400 hover:text-black transition-all duration-200 group-hover:shadow-md"
      >
        Agendar este servicio
      </button>
    </div>
  );
};

export default ServiceCard;