// src/hooks/useAppointments.js
import { useState } from 'react';

// Mock data inicial - en producción esto vendría del backend
const initialAppointments = [
  {
    id: 1,
    name: "Juan Pérez",
    phone: "3101234567",
    service: "Corte y Barba (Perfilada)",
    date: "2025-08-10",
    time: "14:00",
    message: "Prefiero corte clásico, no muy corto a los lados",
    status: "pending",
    createdAt: "2025-08-06T10:30:00Z"
  },
  {
    id: 2,
    name: "Carlos López",
    phone: "3109876543",
    service: "Corte Básico",
    date: "2025-08-11",
    time: "16:30",
    message: "Primera vez en la barbería, espero el mejor servicio",
    status: "pending",
    createdAt: "2025-08-06T11:15:00Z"
  },
  {
    id: 3,
    name: "Miguel Rodríguez",
    phone: "3158765432",
    service: "Corte y Barba + Exfoliación y Mascarilla Puntos Negros",
    date: "2025-08-12",
    time: "10:00",
    message: "Quiero probar el servicio premium completo",
    status: "confirmed",
    createdAt: "2025-08-05T14:20:00Z"
  },
  {
    id: 4,
    name: "Andrea Torres",
    phone: "3209876543",
    service: "Corte y Cejas",
    date: "2025-08-06",
    time: "15:30",
    message: "",
    status: "pending",
    createdAt: "2025-08-06T09:00:00Z"
  },
  {
    id: 5,
    name: "Luis Martínez",
    phone: "3187654321",
    service: "Corte Básico",
    date: "2025-08-06",
    time: "17:00",
    message: "Corte ejecutivo por favor",
    status: "confirmed",
    createdAt: "2025-08-05T16:30:00Z"
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

  // Estadísticas
  const getStats = () => {
    return {
      total: appointments.length,
      pending: getAppointmentsByStatus('pending').length,
      confirmed: getAppointmentsByStatus('confirmed').length,
      cancelled: getAppointmentsByStatus('cancelled').length,
      today: getTodayAppointments().length,
      week: getWeekAppointments().length
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

  return {
    appointments,
    addAppointment,
    removeAppointment,
    updateAppointmentStatus,
    getAppointmentsByDate,
    getAppointmentsByStatus,
    getTodayAppointments,
    getWeekAppointments,
    getStats,
    isTimeSlotAvailable,
    getOccupiedTimeSlots
  };
};

export default useAppointments;