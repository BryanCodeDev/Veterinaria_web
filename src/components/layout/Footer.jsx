// src/components/layout/Footer.jsx
import React from 'react';
import { Heart, Phone, MapPin, Instagram, Facebook, Clock, Stethoscope, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Información de la Veterinaria */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-teal-300" />
                <Stethoscope className="h-4 w-4 text-white absolute -bottom-1 -right-1" />
              </div>
              <span className="font-bold text-lg md:text-xl">PetSpa Veterinaria</span>
            </div>
            <p className="text-teal-200 mb-4 text-sm md:text-base leading-relaxed">
              Cuidado profesional y amoroso para tu mascota. Más de 3 años ofreciendo 
              servicios veterinarios de calidad premium en Mosquera, Cundinamarca.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`https://instagram.com/${BUSINESS_INFO.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:text-teal-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 md:h-6 md:w-6" />
              </a>
              <a 
                href={`https://facebook.com/${BUSINESS_INFO.socialMedia.facebook.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:text-teal-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 md:h-6 md:w-6" />
              </a>
            </div>

            {/* Certificates */}
            <div className="mt-4 flex items-center text-teal-200 text-sm">
              <Award className="h-4 w-4 mr-2" />
              <span>Médicos Veterinarios Certificados</span>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-200">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-teal-300 mr-3 flex-shrink-0" />
                <a 
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-teal-100 hover:text-teal-300 transition-colors text-sm md:text-base"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-teal-300 mr-3 mt-1 flex-shrink-0" />
                <div className="text-teal-100 text-sm md:text-base">
                  <p>{BUSINESS_INFO.address.street}</p>
                  <p>{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-teal-300 mr-3 flex-shrink-0" />
                <span className="text-teal-100 text-sm md:text-base">
                  Atención con amor para tu mascota
                </span>
              </div>
            </div>
          </div>

          {/* Horarios de Atención */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-200">Horarios de Atención</h3>
            <div className="space-y-2 text-teal-100 text-sm md:text-base">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-teal-300 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium">Lunes - Viernes</div>
                  <div className="text-xs md:text-sm text-teal-300">8:00 AM - 6:00 PM</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-teal-300 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium">Sábados</div>
                  <div className="text-xs md:text-sm text-teal-300">8:00 AM - 5:00 PM</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-teal-300 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium">Domingos</div>
                  <div className="text-xs md:text-sm text-teal-300">9:00 AM - 3:00 PM</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-4 p-3 bg-teal-800 rounded-lg border border-teal-700">
              <div className="text-sm text-teal-100">
                <div className="font-medium text-teal-200 mb-1">🚨 Emergencias</div>
                <div className="text-xs">Para emergencias fuera del horario, contacta al:</div>
                <div className="text-teal-300 font-medium">+57 300 456 7890</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Summary */}
        <div className="border-t border-teal-700 mt-8 pt-6">
          <h3 className="font-bold text-lg mb-4 text-teal-200 text-center">
            Servicios Principales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-teal-800 p-3 rounded-lg">
              <div className="text-2xl mb-2">🛁</div>
              <div className="text-teal-100 text-sm font-medium">Baño y Estética</div>
            </div>
            <div className="bg-teal-800 p-3 rounded-lg">
              <div className="text-2xl mb-2">🩺</div>
              <div className="text-teal-100 text-sm font-medium">Consultas Médicas</div>
            </div>
            <div className="bg-teal-800 p-3 rounded-lg">
              <div className="text-2xl mb-2">💅</div>
              <div className="text-teal-100 text-sm font-medium">Cuidado Personal</div>
            </div>
            <div className="bg-teal-800 p-3 rounded-lg">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-teal-100 text-sm font-medium">Spa Premium</div>
            </div>
          </div>
        </div>

        {/* Pet Types */}
        <div className="border-t border-teal-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h4 className="font-medium text-teal-200 mb-2">Atendemos con amor:</h4>
              <div className="flex items-center space-x-3 text-2xl">
                <span title="Perros">🐕</span>
                <span title="Gatos">🐱</span>
                <span title="Conejos">🐰</span>
                <span title="Hámsters">🐹</span>
                <span title="Aves">🐦</span>
                <span title="Y más">🐾</span>
              </div>
            </div>
            <div className="text-center md:text-right text-teal-200">
              <div className="text-sm">
                <div className="font-medium">Tu mascota es nuestra prioridad</div>
                <div className="text-xs text-teal-300 flex items-center justify-center md:justify-end mt-1">
                  <Heart className="h-3 w-3 mr-1" />
                  Cuidado profesional con amor
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separador y Copyright */}
        <div className="border-t border-teal-700 mt-8 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-teal-300 text-xs md:text-sm text-center md:text-left">
              © {currentYear} PetSpa Veterinaria. Todos los derechos reservados.
            </p>
            <p className="text-teal-300 text-xs md:text-sm text-center md:text-right flex items-center">
              Desarrollado con 
              <Heart className="h-3 w-3 mx-1 text-red-400" />
              para el cuidado de las mascotas
            </p>
          </div>
          <div className="text-center mt-4">
            <p className="text-teal-400 text-xs flex items-center justify-center">
              <Stethoscope className="h-3 w-3 mr-1" />
              Licencia Veterinaria No. 12345 - COPNIA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;