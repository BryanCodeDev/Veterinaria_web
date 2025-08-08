// src/components/sections/BookingForm.jsx
import React, { useState } from 'react';
import { ArrowLeft, X, Check, ChevronRight, Heart, User, MessageSquare } from 'lucide-react';
import { services } from '../../data/services';
import { timeSlots, weekendTimeSlots, PET_TYPES, PET_SIZES } from '../../utils/constants';

const BookingForm = ({ onSubmit, onClose, onSuccess, getOccupiedTimeSlots, preselectedService = null }) => {
  const [currentStep, setCurrentStep] = useState(preselectedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data for pet owner and pet
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    petName: '',
    petType: '',
    petSize: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Breadcrumb steps
  const steps = [
    { id: 1, name: 'Servicios', active: currentStep === 1, completed: currentStep > 1 },
    { id: 2, name: 'Fecha y Hora', active: currentStep === 2, completed: currentStep > 2 },
    { id: 3, name: 'Información', active: currentStep === 3, completed: currentStep > 3 },
    { id: 4, name: 'Confirmar', active: currentStep === 4, completed: false }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'El nombre del propietario es requerido';
    }
    
    if (!formData.ownerPhone.trim()) {
      newErrors.ownerPhone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.ownerPhone.replace(/\s/g, ''))) {
      newErrors.ownerPhone = 'Ingresa un número de teléfono válido (10 dígitos)';
    }
    
    if (formData.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = 'Ingresa un email válido';
    }
    
    if (!formData.petName.trim()) {
      newErrors.petName = 'El nombre de la mascota es requerido';
    }
    
    if (!formData.petType) {
      newErrors.petType = 'Selecciona el tipo de mascota';
    }
    
    if (!formData.petSize) {
      newErrors.petSize = 'Selecciona el tamaño de la mascota';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const confirmBooking = () => {
    if (!validateForm()) {
      return;
    }

    const appointment = {
      id: Date.now(),
      name: formData.ownerName,
      phone: formData.ownerPhone,
      email: formData.ownerEmail,
      petName: formData.petName,
      petType: formData.petType,
      petSize: formData.petSize,
      service: selectedService.name,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      message: formData.message,
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
    }, 3000);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canContinue = () => {
    if (currentStep === 2) {
      return selectedDate && selectedTime;
    } else if (currentStep === 3) {
      return formData.ownerName && formData.ownerPhone && formData.petName && formData.petType && formData.petSize;
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
                        ? 'text-teal-600 bg-teal-50 font-medium' 
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
            <div className="bg-teal-50 border border-teal-200 rounded-xl m-4 sm:m-6">
              <div className="p-4 sm:p-6 text-center">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-teal-900 mb-2">
                  ¡Cita Agendada Exitosamente! 🐾
                </h3>
                <div className="text-teal-700 space-y-2">
                  <p className="font-medium">La cita para {formData.petName} ha sido reservada correctamente</p>
                  <div className="bg-white rounded-lg p-3 sm:p-4 mt-4 border border-teal-100">
                    <div className="text-sm space-y-1 text-gray-700">
                      <p><strong>Propietario:</strong> {formData.ownerName}</p>
                      <p><strong>Mascota:</strong> {formData.petName} ({formData.petType})</p>
                      <p><strong>Servicio:</strong> {selectedService?.name}</p>
                      <p><strong>Fecha:</strong> {selectedDate && formatDateFull(selectedDate)}</p>
                      <p><strong>Hora:</strong> {selectedTime}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Recordatorio:</strong> Por favor llega 10 minutos antes con tu mascota
                    </p>
                  </div>
                  <p className="text-sm mt-3 text-teal-600">Te contactaremos pronto para confirmar los detalles</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Service Selection */}
          {currentStep === 1 && !showSuccess && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Selecciona el Servicio</h2>
                  <div className="text-gray-600">
                    <h3 className="text-base sm:text-lg font-medium">PetSpa Veterinaria</h3>
                    <p className="text-sm text-gray-500">Cuidado profesional para tu mascota</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">Mosquera, Cundinamarca</div>
                  <div className="text-xs text-gray-400">CENTRO COMERCIAL MASCOTAS PLAZA</div>
                </div>
              </div>

              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="border border-gray-200 rounded-lg p-4 hover:border-teal-400 hover:bg-teal-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between sm:block">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{service.name}</h4>
                          <div className="text-right ml-4 sm:hidden">
                            <div className="font-semibold text-teal-600 text-sm">
                              ${service.price.toLocaleString('es-CO')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 space-x-3">
                          <span>⏱️ {service.duration}</span>
                          <span>📋 {service.category}</span>
                          {service.popular && (
                            <span className="bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full text-xs font-medium">
                              ⭐ Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>
                        {/* Pet types */}
                        {service.petTypes && (
                          <div className="flex items-center mt-2 space-x-1">
                            <span className="text-xs text-gray-500">Para:</span>
                            {service.petTypes.slice(0, 4).map((petType, idx) => {
                              const petIcons = {
                                perro: '🐕',
                                gato: '🐱',
                                conejo: '🐰',
                                hamster: '🐹',
                                ave: '🐦',
                                otro: '🐾'
                              };
                              return (
                                <span key={idx} className="text-sm" title={petType}>
                                  {petIcons[petType]}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="hidden sm:block text-right ml-4">
                        <div className="font-bold text-teal-600 text-lg">
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
                  <div className="text-sm text-gray-500">PetSpa Veterinaria</div>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Disponible</span>
                  </div>
                </div>
              </div>

              {/* Selected Service Info */}
              {selectedService && (
                <div className="mb-6 p-3 sm:p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-teal-900">{selectedService.name}</div>
                      <div className="text-xs sm:text-sm text-teal-700">⏱️ {selectedService.duration}</div>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-teal-600">
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
                            ? 'bg-teal-500 text-white shadow-md scale-105'
                            : 'hover:bg-teal-50 text-gray-700 border border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="text-xs text-gray-500">{formatted.dayName}</div>
                        <div className={`text-base sm:text-lg font-semibold ${isSelected ? 'text-white' : ''}`}>
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
                            ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md'
                            : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                        }`}
                      >
                        <div className="font-medium text-sm sm:text-base">{time}</div>
                      </button>
                    ))}
                  </div>
                  
                  {getAvailableTimeSlots().length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-2">No hay horarios disponibles para esta fecha</p>
                      <button className="text-teal-600 text-sm hover:underline">
                        Selecciona otra fecha
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Information Form */}
          {currentStep === 3 && !showSuccess && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Información de la Cita</h2>
                  <p className="text-gray-600">Ingresa los datos del propietario y la mascota</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">PetSpa Veterinaria</div>
                  <div className="text-xs text-gray-400">Paso 3 de 4</div>
                </div>
              </div>

              {/* Selected Service & Date Info */}
              {selectedService && selectedDate && selectedTime && (
                <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Servicio:</span>
                      <div className="text-teal-600 font-semibold">{selectedService.name}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fecha:</span>
                      <div className="text-gray-900">{formatDateFull(selectedDate)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Hora:</span>
                      <div className="text-gray-900">{selectedTime}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-6">
                {/* Owner Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Información del Propietario
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.ownerName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.ownerName && (
                        <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.ownerPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="3001234567"
                      />
                      {errors.ownerPhone && (
                        <p className="mt-1 text-sm text-red-600">{errors.ownerPhone}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (Opcional)
                      </label>
                      <input
                        type="email"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.ownerEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {errors.ownerEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.ownerEmail}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pet Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Información de la Mascota
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Mascota *
                      </label>
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.petName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nombre de tu mascota"
                      />
                      {errors.petName && (
                        <p className="mt-1 text-sm text-red-600">{errors.petName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Mascota *
                      </label>
                      <select
                        name="petType"
                        value={formData.petType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.petType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona el tipo</option>
                        {PET_TYPES.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.icon} {type.name}
                          </option>
                        ))}
                      </select>
                      {errors.petType && (
                        <p className="mt-1 text-sm text-red-600">{errors.petType}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamaño de la Mascota *
                      </label>
                      <select
                        name="petSize"
                        value={formData.petSize}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          errors.petSize ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona el tamaño</option>
                        {PET_SIZES.map(size => (
                          <option key={size.id} value={size.id}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                      {errors.petSize && (
                        <p className="mt-1 text-sm text-red-600">{errors.petSize}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Información Adicional
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje o Instrucciones Especiales (Opcional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Compártenos cualquier información adicional sobre tu mascota o el servicio..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && !showSuccess && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Confirmar Reserva</h2>
                  <p className="text-gray-600">Revisa los detalles de la cita para tu mascota</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-500">PetSpa Veterinaria</div>
                  <div className="text-xs text-gray-400">Mosquera, Cundinamarca</div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-4 sm:p-6 mb-6">
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
                        <span className="font-medium">👤 Propietario:</span><br />
                        {formData.ownerName}<br />
                        📱 {formData.ownerPhone}
                        {formData.ownerEmail && <><br />📧 {formData.ownerEmail}</>}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">🐾 Mascota:</span><br />
                        {formData.petName} ({PET_TYPES.find(t => t.id === formData.petType)?.name})
                        <br />Tamaño: {PET_SIZES.find(s => s.id === formData.petSize)?.name}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">📅 Fecha:</span><br />
                        {selectedDate && formatDateFull(selectedDate)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">🕒 Hora:</span><br />
                        {selectedTime}
                      </div>
                      <div className="flex flex-col justify-end sm:text-right mt-4">
                        <div className="text-2xl font-bold text-teal-600">
                          ${selectedService?.price.toLocaleString('es-CO')}
                        </div>
                        <div className="text-sm text-gray-500">Pesos Colombianos</div>
                      </div>
                    </div>
                  </div>

                  {formData.message && (
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                      <span className="font-medium text-gray-700">💬 Mensaje:</span>
                      <p className="text-gray-600 text-sm mt-1">{formData.message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">📋 Información importante:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Por favor llega 10 minutos antes de la cita con tu mascota</li>
                  <li>• Trae la cartilla de vacunación si es la primera visita</li>
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
                className="w-full bg-teal-500 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-600 transition-all duration-200 hover:shadow-lg"
              >
                Continuar
              </button>
            )}
            
            {currentStep === 3 && (
              <button
                onClick={() => setCurrentStep(4)}
                disabled={!canContinue()}
                className="w-full bg-teal-500 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-600 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Revisar Cita
              </button>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center text-lg font-bold space-y-2 sm:space-y-0">
                  <span>Total a pagar:</span>
                  <span className="text-2xl text-teal-600">${selectedService?.price.toLocaleString('es-CO')}</span>
                </div>

                <button
                  onClick={confirmBooking}
                  disabled={showSuccess}
                  className="w-full bg-teal-800 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-900 transition-all duration-200 disabled:opacity-50 hover:shadow-lg"
                >
                  {showSuccess ? '✓ Cita Confirmada' : '🐾 Confirmar Cita para ' + (formData.petName || 'mi Mascota')}
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