// src/components/common/ServiceCard.jsx
import React from 'react';
import { Clock, Star, Heart, Users } from 'lucide-react';

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

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      bano: '🛁',
      cuidado: '✂️',
      estetica: '💅',
      combo: '🎁',
      tratamiento: '💊',
      premium: '⭐',
      luxury: '👑',
      consulta: '🩺'
    };
    return icons[category] || '🐾';
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      bano: 'bg-blue-100 text-blue-600',
      cuidado: 'bg-green-100 text-green-600',
      estetica: 'bg-purple-100 text-purple-600',
      combo: 'bg-orange-100 text-orange-600',
      tratamiento: 'bg-red-100 text-red-600',
      premium: 'bg-amber-100 text-amber-600',
      luxury: 'bg-yellow-100 text-yellow-600',
      consulta: 'bg-teal-100 text-teal-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-teal-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center flex-1">
          <div className={`p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform ${getCategoryColor(service.category)}`}>
            <span className="text-lg">{getCategoryIcon(service.category)}</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
            {service.name}
          </h3>
        </div>
        <div className="flex items-center text-teal-500 ml-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-current" />
          ))}
        </div>
      </div>
      
      {/* Pet types */}
      <div className="flex items-center mb-3">
        <Users className="h-3 w-3 md:h-4 md:w-4 text-gray-500 mr-2" />
        <div className="flex space-x-1 text-sm">
          {service.petTypes && service.petTypes.slice(0, 3).map((petType, idx) => {
            const petIcons = {
              perro: '🐕',
              gato: '🐱',
              conejo: '🐰',
              hamster: '🐹',
              ave: '🐦',
              otro: '🐾'
            };
            return (
              <span key={idx} className="text-lg" title={petType}>
                {petIcons[petType]}
              </span>
            );
          })}
          {service.petTypes && service.petTypes.length > 3 && (
            <span className="text-gray-500 text-xs">+{service.petTypes.length - 3}</span>
          )}
        </div>
      </div>
      
      {/* Duration and Price */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-600">
          <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
          <span className="text-xs md:text-sm font-medium">{service.duration}</span>
        </div>
        <div className="text-lg md:text-2xl font-bold text-teal-600 group-hover:text-teal-700 transition-colors">
          {formatPrice(service.price)}
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors line-clamp-3">
        {service.description}
      </p>

      {/* Includes (if available) */}
      {service.includes && service.includes.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Incluye:</h4>
          <div className="flex flex-wrap gap-1">
            {service.includes.slice(0, 3).map((item, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {item}
              </span>
            ))}
            {service.includes.length > 3 && (
              <span className="text-xs text-gray-500">+{service.includes.length - 3} más</span>
            )}
          </div>
        </div>
      )}

      {/* Popular Badge */}
      {service.popular && (
        <div className="inline-block bg-gradient-to-r from-teal-400 to-teal-500 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full mb-2">
          ⭐ Popular
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleBookingClick}
        className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-3 md:px-4 rounded-lg font-semibold text-sm md:text-base hover:bg-teal-500 hover:text-white transition-all duration-200 group-hover:shadow-md flex items-center justify-center"
      >
        <Heart className="h-4 w-4 mr-2" />
        Agendar para mi mascota
      </button>
    </div>
  );
};

export default ServiceCard;