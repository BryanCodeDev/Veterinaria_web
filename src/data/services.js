// src/data/services.js
export const services = [
  {
    id: 1,
    name: "Baño Básico",
    duration: "45 min",
    price: 35000,
    category: "bano",
    description: "Baño completo con champú especializado, secado y cepillado básico. Ideal para el mantenimiento regular de tu mascota.",
    popular: true,
    petTypes: ['perro', 'gato'],
    includes: ['Baño con champú', 'Secado', 'Cepillado básico']
  },
  {
    id: 2,
    name: "Corte de Uñas",
    duration: "20 min",
    price: 15000,
    category: "cuidado",
    description: "Corte profesional de uñas con técnicas seguras para evitar lastimar a tu mascota.",
    popular: true,
    petTypes: ['perro', 'gato', 'conejo'],
    includes: ['Corte de uñas', 'Limado suave', 'Revisión de almohadillas']
  },
  {
    id: 3,
    name: "Baño Premium + Corte de Uñas",
    duration: "60 min",
    price: 55000,
    category: "combo",
    description: "Servicio completo: baño con champús premium, acondicionador, secado profesional y corte de uñas.",
    popular: true,
    petTypes: ['perro', 'gato'],
    includes: ['Baño premium', 'Acondicionador', 'Secado profesional', 'Corte de uñas', 'Cepillado']
  },
  {
    id: 4,
    name: "Limpieza de Oídos",
    duration: "15 min",
    price: 12000,
    category: "cuidado",
    description: "Limpieza profunda y cuidadosa de los oídos para prevenir infecciones y mantener una buena higiene auditiva.",
    petTypes: ['perro', 'gato'],
    includes: ['Limpieza con productos especializados', 'Revisión auditiva', 'Consejos de cuidado']
  },
  {
    id: 5,
    name: "Cepillado Dental",
    duration: "25 min",
    price: 20000,
    category: "cuidado",
    description: "Cepillado dental profesional para mantener la salud bucal de tu mascota y prevenir enfermedades periodontales.",
    petTypes: ['perro', 'gato'],
    includes: ['Cepillado dental', 'Pasta dental especializada', 'Revisión bucal', 'Recomendaciones']
  },
  {
    id: 6,
    name: "Baño Medicado",
    duration: "50 min",
    price: 45000,
    category: "tratamiento",
    description: "Baño terapéutico con champús medicados especiales para problemas dermatológicos o alergias de la piel.",
    petTypes: ['perro', 'gato'],
    includes: ['Champú medicado', 'Tiempo de acción terapéutica', 'Secado suave', 'Evaluación de piel']
  },
  {
    id: 7,
    name: "Spa Completo",
    duration: "90 min",
    price: 80000,
    category: "premium",
    description: "Experiencia spa completa: baño premium, masaje relajante, aromaterapia, corte de uñas y limpieza de oídos.",
    petTypes: ['perro', 'gato'],
    includes: ['Baño premium', 'Masaje relajante', 'Aromaterapia', 'Corte de uñas', 'Limpieza de oídos', 'Cepillado dental']
  },
  {
    id: 8,
    name: "Corte de Pelo Básico",
    duration: "45 min",
    price: 40000,
    category: "estetica",
    description: "Corte de pelo básico para mantener el pelaje de tu mascota limpio, ordenado y saludable.",
    petTypes: ['perro', 'gato', 'conejo'],
    includes: ['Corte según raza', 'Cepillado', 'Desenredado', 'Acabado profesional']
  },
  {
    id: 9,
    name: "Estilismo Completo",
    duration: "75 min",
    price: 65000,
    category: "estetica",
    description: "Corte estilizado según la raza, con baño, secado profesional y acabados especiales para una apariencia perfecta.",
    petTypes: ['perro'],
    includes: ['Corte estilizado', 'Baño premium', 'Secado profesional', 'Perfumado', 'Lazo decorativo']
  },
  {
    id: 10,
    name: "Paquete Premium Mensual",
    duration: "105 min",
    price: 120000,
    category: "luxury",
    description: "El servicio más completo: baño premium, corte estilizado, spa, limpieza dental, corte de uñas y tratamiento de piel.",
    petTypes: ['perro', 'gato'],
    includes: ['Todo incluido', 'Baño premium', 'Corte estilizado', 'Spa completo', 'Todos los cuidados', 'Seguimiento mensual']
  },
  {
    id: 11,
    name: "Consulta Veterinaria General",
    duration: "30 min",
    price: 50000,
    category: "consulta",
    description: "Consulta general con médico veterinario para chequeo de salud, vacunación o dudas sobre tu mascota.",
    popular: true,
    petTypes: ['perro', 'gato', 'conejo', 'hamster', 'ave', 'otro'],
    includes: ['Examen físico completo', 'Diagnóstico', 'Recomendaciones', 'Receta médica si es necesaria']
  },
  {
    id: 12,
    name: "Vacunación Completa",
    duration: "20 min",
    price: 35000,
    category: "consulta",
    description: "Aplicación de vacunas según el esquema de vacunación apropiado para la edad y especie de tu mascota.",
    petTypes: ['perro', 'gato', 'conejo'],
    includes: ['Vacuna', 'Carnet de vacunación', 'Seguimiento post-vacuna', 'Calendario próximas dosis']
  }
];

// Categorías de servicios
export const serviceCategories = {
  bano: {
    name: "Baño y Limpieza",
    color: "blue",
    icon: "🛁"
  },
  cuidado: {
    name: "Cuidado Personal",
    color: "green",
    icon: "✂️"
  },
  estetica: {
    name: "Estética",
    color: "purple",
    icon: "💅"
  },
  combo: {
    name: "Combos",
    color: "orange",
    icon: "🎁"
  },
  tratamiento: {
    name: "Tratamientos",
    color: "red",
    icon: "💊"
  },
  premium: {
    name: "Premium",
    color: "amber",
    icon: "⭐"
  },
  luxury: {
    name: "Luxury",
    color: "gold",
    icon: "👑"
  },
  consulta: {
    name: "Consultas Médicas",
    color: "teal",
    icon: "🩺"
  }
};

// Función helper para obtener servicios por categoría
export const getServicesByCategory = (category) => {
  return services.filter(service => service.category === category);
};

// Función helper para obtener servicios populares
export const getPopularServices = () => {
  return services.filter(service => service.popular);
};

// Función helper para obtener servicios por tipo de mascota
export const getServicesByPetType = (petType) => {
  return services.filter(service => service.petTypes.includes(petType));
};

// Función helper para formatear precios
export const formatPrice = (price) => {
  return price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });
};

export default services;