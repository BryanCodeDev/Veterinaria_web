// src/components/sections/BookingForm.jsx
import React, { useState } from 'react';
import { ArrowLeft, X, Check, ChevronRight } from 'lucide-react';
import { services } from '../../data/services';
import { timeSlots, weekendTimeSlots } from '../../utils/constants';

const BookingForm = ({ onSubmit, onClose, onSuccess, getOccupiedTimeSlots, preselectedService = null }) => {
  const [currentStep, setCurrentStep] = useState(preselectedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Breadcrumb steps
  const steps = [
    { id: 1, name: 'Servicios', active: currentStep === 1, completed: currentStep > 1 },
    { id: 2, name: 'Fecha y Hora', active: currentStep === 2, completed: currentStep > 2 },
    { id: 3, name: 'Confirmar', active: currentStep === 3, completed: false }
  ];

  // Generar fechas disponibles (próximos 14 días)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    let availableSlots = [];
    
    if (dayOfWeek === 0) { // Sunday
      availableSlots = weekendTimeSlots.sunday;
    } else if (dayOfWeek === 6) { // Saturday
      availableSlots = weekendTimeSlots.saturday;
    } else { // Monday to Friday
      availableSlots = timeSlots;
    }
    
    // Get occupied slots for the selected date
    const dateString = selectedDate.toISOString().split('T')[0];
    const occupiedSlots = getOccupiedTimeSlots(dateString);
    
    // Filter out occupied slots
    return availableSlots.filter(slot => !occupiedSlots.includes(slot));
  };

  const formatDate = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    return {
      dayName: days[date.getDay()],
      day: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const formatDateForCalendar = (date) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  const formatDateFull = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]}`;
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const confirmBooking = () => {
    const appointment = {
      id: Date.now(),
      name: 'Cliente', // Simplificado
      phone: '', // Simplificado
      service: selectedService.name,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      message: '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (onSubmit) {
      onSubmit(appointment);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSuccess && onSuccess();
    }, 2500);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) {
        // When going back from confirmation, don't reset selections
      } else if (currentStep === 2) {
        // When going back to services, reset date and time
        setSelectedDate(null);
        setSelectedTime(null);
      }
    }
  };

  const canContinue = () => {
    if (currentStep === 2) {
      return selectedDate && selectedTime;
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-screen overflow-hidden flex flex-col">
        
        {/* Header with Breadcrumb */}
        <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <button
                  onClick={goBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}
              <nav className="flex space-x-1 sm:space-x-2 text-xs sm:text-sm">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <span className={`px-2 py-1 rounded transition-colors ${
                      step.active 
                        ? 'text-amber-600 bg-amber-50 font-medium' 
                        : step.completed 
                          ? 'text-gray-600 bg-gray-50' 
                          : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 self-center" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Success Message */}
          {showSuccess && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl m-4 sm:m-6">
              <div className="p-4 sm:p-6 text-center">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
                  <Check className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  ¡Agendamiento Exitoso!
                </h3>
                <div className="text-amber-700 space-y-2">
                  <p className="font-medium">Tu cita ha sido reservada correctamente</p>
                  <div className="bg-white rounded-lg p-3 sm:p-4 mt-4 border border-amber-100">
                    <div className="text-sm space-y-1 text-gray-700">
                      <p><strong>Servicio:</strong> {selectedService?.name}</p>
                      <p><strong>Fecha:</strong> {selectedDate && formatDateFull(selectedDate)}</p>
                      <p><strong>Hora:</strong> {selectedTime}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Recordatorio:</strong> Por favor llega 5 minutos antes de tu cita
                    </p>
                  </div>
                  <p className="text-sm mt-3 text-amber-600">Te contactaremos pronto para confirmar los detalles</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Service Selection */}
          {currentStep === 1 && !showSuccess && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Selecciona tu Servicio</h2>
                  <div className="text-gray-600">
                    <h3 className="text-base sm:text-lg font-medium">Camilo Correa Barber</h3>
                    <p className="text-sm text-gray-500">Master Barber - Experiencia VIP</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">Mosquera, Cundinamarca</div>
                  <div className="text-xs text-gray-400">CALLE 3 #4 - 77 EDIFICIO INFINITO LOCAL 01</div>
                </div>
              </div>

              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between sm:block">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{service.name}</h4>
                          <div className="text-right ml-4 sm:hidden">
                            <div className="font-semibold text-amber-600 text-sm">
                              ${service.price.toLocaleString('es-CO')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 space-x-3">
                          <span>⏱️ {service.duration}</span>
                          {service.popular && (
                            <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-xs font-medium">
                              ⭐ Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>
                      </div>
                      <div className="hidden sm:block text-right ml-4">
                        <div className="font-bold text-amber-600 text-lg">
                          ${service.price.toLocaleString('es-CO')}
                        </div>
                        <div className="text-xs text-gray-500">COP</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date and Time Selection */}
          {currentStep === 2 && !showSuccess && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Selecciona Fecha y Hora</h2>
                  <div className="text-gray-600">
                    <div className="text-base sm:text-lg font-medium">{formatDateForCalendar(new Date())}</div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">Camilo Correa Barber</div>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Disponible</span>
                  </div>
                </div>
              </div>

              {/* Selected Service Info */}
              {selectedService && (
                <div className="mb-6 p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-amber-900">{selectedService.name}</div>
                      <div className="text-xs sm:text-sm text-amber-700">⏱️ {selectedService.duration}</div>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-amber-600">
                      ${selectedService.price.toLocaleString('es-CO')}
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-medium mb-4">Selecciona una fecha</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
                  {getAvailableDates().slice(0, 14).map((date, index) => {
                    const formatted = formatDate(date);
                    const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        className={`p-2 sm:p-3 rounded-lg text-center transition-all duration-200 ${
                          isSelected
                            ? 'bg-amber-400 text-black shadow-md scale-105'
                            : 'hover:bg-amber-50 text-gray-700 border border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="text-xs text-gray-500">{formatted.dayName}</div>
                        <div className={`text-base sm:text-lg font-semibold ${isSelected ? 'text-black' : ''}`}>
                          {formatted.day}
                        </div>
                        <div className="text-xs">{formatted.month}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-4">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {getAvailableTimeSlots().map((time, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                          selectedTime === time
                            ? 'border-amber-400 bg-amber-50 text-amber-700 shadow-md'
                            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                        }`}
                      >
                        <div className="font-medium text-sm sm:text-base">{time}</div>
                      </button>
                    ))}
                  </div>
                  
                  {getAvailableTimeSlots().length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-2">No hay horarios disponibles para esta fecha</p>
                      <button className="text-amber-600 text-sm hover:underline">
                        Selecciona otra fecha
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && !showSuccess && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Confirmar Reserva</h2>
                  <p className="text-gray-600">Revisa los detalles de tu cita</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">Camilo Correa Barber</div>
                  <div className="text-xs text-gray-400">Mosquera, Cundinamarca</div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{selectedService?.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ⏱️ {selectedService?.duration} • {selectedService?.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">📅 Fecha:</span><br />
                        {selectedDate && formatDateFull(selectedDate)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">🕒 Hora:</span><br />
                        {selectedTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center sm:text-right">
                      <div className="text-2xl font-bold text-amber-600">
                        ${selectedService?.price.toLocaleString('es-CO')}
                      </div>
                      <div className="text-sm text-gray-500">Pesos Colombianos</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">📋 Información importante:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Por favor llega 5 minutos antes de tu cita</li>
                  <li>• Te contactaremos para confirmar los detalles</li>
                  <li>• En caso de cancelación, avísanos con 24h de anticipación</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer with Actions */}
        {!showSuccess && (
          <div className="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 bg-white">
            {currentStep === 2 && canContinue() && (
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full bg-amber-400 text-black py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-amber-500 transition-all duration-200 hover:shadow-lg"
              >
                Continuar
              </button>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center text-lg font-bold space-y-2 sm:space-y-0">
                  <span>Total a pagar:</span>
                  <span className="text-2xl text-amber-600">${selectedService?.price.toLocaleString('es-CO')}</span>
                </div>

                <button
                  onClick={confirmBooking}
                  disabled={showSuccess}
                  className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 hover:shadow-lg"
                >
                  {showSuccess ? '✓ Reserva Confirmada' : '✂️ Confirmar Reserva'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;