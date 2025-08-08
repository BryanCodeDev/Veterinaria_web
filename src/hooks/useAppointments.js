// src/hooks/useAppointments.js
import { useState } from 'react';

// Mock data inicial - en producción esto vendría del backend
const initialAppointments = [
  {
    id: 1,
    name: "María González",
    phone: "3201234567",
    email: "maria.gonzalez@email.com",
    petName: "Max",
    petType: "perro",
    petSize: "mediano",
    service: "Baño Premium + Corte de Uñas",
    date: "2025-08-10",
    time: "14:00",
    message: "Max es muy nervioso con el agua, por favor tener paciencia",
    status: "pending",
    createdAt: "2025-08-06T10:30:00Z"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    phone: "3109876543",
    email: "",
    petName: "Luna",
    petType: "gato",
    petSize: "pequeno",
    service: "Consulta Veterinaria General",
    date: "2025-08-11",
    time: "16:30",
    message: "Primera consulta, Luna tiene 3 años y está al día con vacunas",
    status: "pending",
    createdAt: "2025-08-06T11:15:00Z"
  },
  {
    id: 3,
    name: "Ana Martínez",
    phone: "3158765432",
    email: "ana.martinez@email.com",
    petName: "Rocky",
    petType: "perro",
    petSize: "grande",
    service: "Spa Completo",
    date: "2025-08-12",
    time: "10:00",
    message: "Rocky necesita tratamiento especial para su piel sensible",
    status: "confirmed",
    createdAt: "2025-08-05T14:20:00Z"
  },
  {
    id: 4,
    name: "Diego Torres",
    phone: "3209876543",
    email: "diego.torres@email.com",
    petName: "Coco",
    petType: "conejo",
    petSize: "muy_pequeno",
    service: "Corte de Uñas",
    date: "2025-08-06",
    time: "15:30",
    message: "Primera vez que viene Coco",
    status: "pending",
    createdAt: "2025-08-06T09:00:00Z"
  },
  {
    id: 5,
    name: "Laura Jiménez",
    phone: "3187654321",
    email: "laura.jimenez@email.com",
    petName: "Bella",
    petType: "gato",
    petSize: "mediano",
    service: "Baño Medicado",
    date: "2025-08-06",
    time: "17:00",
    message: "Bella tiene dermatitis, necesita champú especial",
    status: "confirmed",
    createdAt: "2025-08-05T16:30:00Z"
  },
  {
    id: 6,
    name: "Roberto Silva",
    phone: "3156789012",
    email: "",
    petName: "Toby",
    petType: "perro",
    petSize: "pequeno",
    service: "Vacunación Completa",
    date: "2025-08-13",
    time: "11:00",
    message: "Toby necesita sus vacunas anuales",
    status: "pending",
    createdAt: "2025-08-07T08:45:00Z"
  },
  {
    id: 7,
    name: "Patricia López",
    phone: "3145678901",
    email: "patricia.lopez@email.com",
    petName: "Canela",
    petType: "hamster",
    petSize: "muy_pequeno",
    service: "Consulta Veterinaria General",
    date: "2025-08-14",
    time: "09:30",
    message: "Canela ha estado menos activa últimamente",
    status: "pending",
    createdAt: "2025-08-07T12:20:00Z"
  }
];

export const useAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  // Agregar nueva cita
  const addAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now() + Math.random(), // Simple ID generation
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  // Eliminar cita
  const removeAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  // Actualizar estado de cita
  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: newStatus }
          : apt
      )
    );
  };

  // Obtener citas por fecha
  const getAppointmentsByDate = (date) => {
    return appointments.filter(apt => apt.date === date);
  };

  // Obtener citas por estado
  const getAppointmentsByStatus = (status) => {
    return appointments.filter(apt => apt.status === status);
  };

  // Obtener citas por tipo de mascota
  const getAppointmentsByPetType = (petType) => {
    return appointments.filter(apt => apt.petType === petType);
  };

  // Obtener citas de hoy
  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return getAppointmentsByDate(today);
  };

  // Obtener citas de la semana
  const getWeekAppointments = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= weekStart && aptDate <= weekEnd;
    });
  };

  // Obtener citas próximas (próximos 7 días)
  const getUpcomingAppointments = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= today && aptDate <= nextWeek;
    });
  };

  // Estadísticas
  const getStats = () => {
    const petTypeStats = {};
    appointments.forEach(apt => {
      if (apt.petType) {
        petTypeStats[apt.petType] = (petTypeStats[apt.petType] || 0) + 1;
      }
    });

    return {
      total: appointments.length,
      pending: getAppointmentsByStatus('pending').length,
      confirmed: getAppointmentsByStatus('confirmed').length,
      cancelled: getAppointmentsByStatus('cancelled').length,
      today: getTodayAppointments().length,
      week: getWeekAppointments().length,
      upcoming: getUpcomingAppointments().length,
      petTypeStats
    };
  };

  // Verificar disponibilidad de horario
  const isTimeSlotAvailable = (date, time) => {
    return !appointments.some(apt => 
      apt.date === date && 
      apt.time === time && 
      apt.status !== 'cancelled'
    );
  };

  // Obtener horarios ocupados para una fecha
  const getOccupiedTimeSlots = (date) => {
    return appointments
      .filter(apt => apt.date === date && apt.status !== 'cancelled')
      .map(apt => apt.time);
  };

  // Buscar citas por nombre de mascota o propietario
  const searchAppointments = (searchTerm) => {
    if (!searchTerm.trim()) return appointments;
    
    const term = searchTerm.toLowerCase();
    return appointments.filter(apt => 
      apt.name.toLowerCase().includes(term) ||
      (apt.petName && apt.petName.toLowerCase().includes(term)) ||
      apt.service.toLowerCase().includes(term)
    );
  };

  // Obtener citas por servicio
  const getAppointmentsByService = (serviceType) => {
    return appointments.filter(apt => 
      apt.service.toLowerCase().includes(serviceType.toLowerCase())
    );
  };

  return {
    appointments,
    addAppointment,
    removeAppointment,
    updateAppointmentStatus,
    getAppointmentsByDate,
    getAppointmentsByStatus,
    getAppointmentsByPetType,
    getTodayAppointments,
    getWeekAppointments,
    getUpcomingAppointments,
    getStats,
    isTimeSlotAvailable,
    getOccupiedTimeSlots,
    searchAppointments,
    getAppointmentsByService
  };
};

export default useAppointments;