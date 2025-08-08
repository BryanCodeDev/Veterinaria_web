// src/utils/constants.js

// Información del negocio
export const BUSINESS_INFO = {
  name: "PetSpa Veterinaria",
  owner: "Dr. María González",
  title: "Médico Veterinario",
  phone: "+57 300 456 7890",
  whatsapp: "573004567890",
  email: "contacto@petspaveterinaria.com",
  address: {
    street: "CALLE 15 #45 - 23 CENTRO COMERCIAL MASCOTAS PLAZA LOCAL 102",
    city: "Mosquera",
    state: "Cundinamarca",
    country: "Colombia",
    full: "CALLE 15 #45 - 23 CENTRO COMERCIAL MASCOTAS PLAZA LOCAL 102, Mosquera, Cundinamarca"
  },
  socialMedia: {
    instagram: "@petspaveterinaria",
    facebook: "PetSpa Veterinaria",
    tiktok: "@petspaveterinaria"
  }
};

// Horarios de trabajo
export const BUSINESS_HOURS = {
  monday: { open: "08:00", close: "18:00", isOpen: true },
  tuesday: { open: "08:00", close: "18:00", isOpen: true },
  wednesday: { open: "08:00", close: "18:00", isOpen: true },
  thursday: { open: "08:00", close: "18:00", isOpen: true },
  friday: { open: "08:00", close: "18:00", isOpen: true },
  saturday: { open: "08:00", close: "17:00", isOpen: true },
  sunday: { open: "09:00", close: "15:00", isOpen: true }
};

// Horarios disponibles para citas
export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
];

// Horarios para fines de semana (diferentes horarios)
export const weekendTimeSlots = {
  saturday: [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00'
  ],
  sunday: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00'
  ]
};

// Estados de las citas
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no-show'
};

// Textos de estado
export const STATUS_LABELS = {
  [APPOINTMENT_STATUS.PENDING]: 'Pendiente',
  [APPOINTMENT_STATUS.CONFIRMED]: 'Confirmada',
  [APPOINTMENT_STATUS.CANCELLED]: 'Cancelada',
  [APPOINTMENT_STATUS.COMPLETED]: 'Completada',
  [APPOINTMENT_STATUS.NO_SHOW]: 'No se presentó'
};

// Colores para estados
export const STATUS_COLORS = {
  [APPOINTMENT_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [APPOINTMENT_STATUS.CONFIRMED]: 'bg-green-100 text-green-800',
  [APPOINTMENT_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
  [APPOINTMENT_STATUS.COMPLETED]: 'bg-blue-100 text-blue-800',
  [APPOINTMENT_STATUS.NO_SHOW]: 'bg-gray-100 text-gray-800'
};

// Configuración de la aplicación
export const APP_CONFIG = {
  maxAdvanceBookingDays: 30, // Máximo días para agendar con anticipación
  minAdvanceBookingHours: 2, // Mínimo horas para agendar con anticipación
  defaultAdminPassword: 'vet123', // Cambiar en producción
  appointmentsPerPage: 10,
  autoRefreshInterval: 30000 // 30 segundos
};

// Mensajes de la aplicación
export const MESSAGES = {
  success: {
    appointmentBooked: '¡Cita agendada exitosamente! Te contactaremos pronto para confirmar el servicio para tu mascota.',
    appointmentCancelled: 'Cita cancelada exitosamente.',
    appointmentUpdated: 'Cita actualizada exitosamente.'
  },
  error: {
    requiredFields: 'Por favor completa todos los campos obligatorios.',
    invalidPhone: 'Ingresa un número de teléfono válido (10 dígitos).',
    invalidEmail: 'Ingresa un email válido.',
    pastDate: 'La fecha no puede ser anterior a hoy.',
    timeNotAvailable: 'Este horario no está disponible. Selecciona otro.',
    networkError: 'Error de conexión. Inténtalo nuevamente.',
    adminPasswordIncorrect: 'Contraseña incorrecta.'
  },
  confirmation: {
    deleteAppointment: '¿Estás seguro de que quieres eliminar esta cita?',
    cancelAppointment: '¿Estás seguro de que quieres cancelar esta cita?'
  }
};

// Configuración de validaciones
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    required: true
  },
  phone: {
    pattern: /^\d{10}$/,
    required: true
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: false
  },
  petName: {
    minLength: 2,
    maxLength: 30,
    required: true
  },
  message: {
    maxLength: 500,
    required: false
  }
};

// Tipos de mascotas
export const PET_TYPES = [
  { id: 'perro', name: 'Perro', icon: '🐕' },
  { id: 'gato', name: 'Gato', icon: '🐱' },
  { id: 'conejo', name: 'Conejo', icon: '🐰' },
  { id: 'hamster', name: 'Hámster', icon: '🐹' },
  { id: 'ave', name: 'Ave', icon: '🐦' },
  { id: 'otro', name: 'Otro', icon: '🐾' }
];

// Tamaños de mascotas
export const PET_SIZES = [
  { id: 'muy_pequeno', name: 'Muy Pequeño (< 5kg)', multiplier: 0.8 },
  { id: 'pequeno', name: 'Pequeño (5-15kg)', multiplier: 1.0 },
  { id: 'mediano', name: 'Mediano (15-30kg)', multiplier: 1.3 },
  { id: 'grande', name: 'Grande (30-50kg)', multiplier: 1.6 },
  { id: 'muy_grande', name: 'Muy Grande (> 50kg)', multiplier: 2.0 }
];

// Utilidades para fechas
export const dateUtils = {
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  formatTime: (timeString) => {
    return timeString;
  },
  
  isToday: (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },
  
  isFutureDate: (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  },
  
  getDayOfWeek: (dateString) => {
    const date = new Date(dateString);
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[date.getDay()];
  }
};

// Utilidades para precios
export const priceUtils = {
  formatPrice: (price) => {
    return price.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  },
  
  formatPriceSimple: (price) => {
    return `$${price.toLocaleString('es-CO')}`;
  },
  
  calculatePriceWithSize: (basePrice, sizeMultiplier) => {
    return Math.round(basePrice * sizeMultiplier);
  }
};

// Utilidades para validación
export const validators = {
  isValidPhone: (phone) => {
    return VALIDATION_RULES.phone.pattern.test(phone.replace(/\s/g, ''));
  },
  
  isValidEmail: (email) => {
    return !email || VALIDATION_RULES.email.pattern.test(email);
  },
  
  isValidName: (name) => {
    return name && 
           name.length >= VALIDATION_RULES.name.minLength && 
           name.length <= VALIDATION_RULES.name.maxLength;
  },
  
  isValidPetName: (petName) => {
    return petName && 
           petName.length >= VALIDATION_RULES.petName.minLength && 
           petName.length <= VALIDATION_RULES.petName.maxLength;
  }
};

// Crear el objeto de constantes antes de exportarlo
const constants = {
  BUSINESS_INFO,
  BUSINESS_HOURS,
  timeSlots,
  weekendTimeSlots,
  APPOINTMENT_STATUS,
  STATUS_LABELS,
  STATUS_COLORS,
  APP_CONFIG,
  MESSAGES,
  VALIDATION_RULES,
  PET_TYPES,
  PET_SIZES,
  dateUtils,
  priceUtils,
  validators
};

export default constants;