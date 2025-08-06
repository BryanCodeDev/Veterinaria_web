// src/data/services.js
export const services = [
  {
    id: 1,
    name: "Corte Básico",
    duration: "35 min",
    price: 30000,
    category: "corte",
    description: "Tu corte básico con el trato que mereces: profesional, preciso y con el toque VIP que nos distingue.",
    popular: true
  },
  {
    id: 2,
    name: "Perfilación de Barba",
    duration: "25 min",
    price: 30000,
    category: "barba",
    description: "Definición precisa de la barba con máquina y navaja, realzando tu estilo con líneas limpias y un acabado impecable.",
    popular: true
  },
  {
    id: 3,
    name: "Corte y Cejas",
    duration: "40 min",
    price: 36000,
    category: "combo",
    description: "Corte profesional y diseño de cejas con máxima precisión. Un servicio 5 estrellas pensado para resaltar tu imagen con estilo y detalle.",
    popular: true
  },
  {
    id: 4,
    name: "Perfilación de Cejas",
    duration: "10 min",
    price: 10000,
    category: "cejas",
    description: "Diseño y perfilado de cejas con técnica precisa para resaltar tu mirada y mantener un aspecto limpio y definido en el rostro."
  },
  {
    id: 5,
    name: "Corte y Rasurada",
    duration: "40 min",
    price: 40000,
    category: "combo",
    description: "Corte a medida y rasurada clásica con navaja, para un look limpio, definido y totalmente renovado."
  },
  {
    id: 6,
    name: "Corte y Barba (Perfilada)",
    duration: "45 min",
    price: 50000,
    category: "combo",
    description: "Corte personalizado y perfilado de barba con navaja. Precisión, estilo y acabado profesional en un solo servicio."
  },
  {
    id: 7,
    name: "Corte, Exfoliación y Mascarilla Puntos Negros (Nariz)",
    duration: "60 min",
    price: 55000,
    category: "premium",
    description: "Corte con estilo, exfoliación facial y mascarilla removedora de puntos negros en la nariz. Un servicio completo para renovar tu imagen y cuidar tu piel."
  },
  {
    id: 8,
    name: "Corte, Exfoliación y Mascarilla Puntos Negros (Completa)",
    duration: "60 min",
    price: 65000,
    category: "premium",
    description: "Servicio completo de corte con exfoliación y mascarilla removedora de puntos negros en todo el rostro para una experiencia de cuidado integral."
  },
  {
    id: 9,
    name: "Corte y Barba a Vapor (Exfoliación)",
    duration: "60 min",
    price: 75000,
    category: "premium",
    description: "Corte personalizado y barba con tratamiento a vapor y exfoliación para una experiencia relajante y revitalizante."
  },
  {
    id: 10,
    name: "Corte y Barba + Exfoliación y Mascarilla Puntos Negros",
    duration: "80 min",
    price: 95000,
    category: "luxury",
    description: "Corte con estilo impecable, exfoliación facial profunda y mascarilla purificante para puntos negros. Un servicio integral de alto nivel que renueva tu imagen y revitaliza tu piel."
  },
  {
    id: 11,
    name: "Corte y Barba + Exfoliación + Mascarilla Puntos Negros + Mascarilla de Colágeno",
    duration: "90 min",
    price: 120000,
    category: "luxury",
    description: "Una experiencia de alto nivel: corte y barba con acabado impecable, exfoliación facial revitalizante, mascarilla removedora de impurezas y tratamiento con mascarilla de colágeno. Un ritual de cuidado masculino que eleva tu imagen y renueva tu piel con distinción."
  }
];

// Categorías de servicios
export const serviceCategories = {
  corte: {
    name: "Cortes",
    color: "blue",
    icon: "✂️"
  },
  barba: {
    name: "Barba",
    color: "orange",
    icon: "🧔"
  },
  cejas: {
    name: "Cejas",
    color: "green",
    icon: "👁️"
  },
  combo: {
    name: "Combos",
    color: "purple",
    icon: "💫"
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

// Función helper para formatear precios
export const formatPrice = (price) => {
  return price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });
};

export default services;