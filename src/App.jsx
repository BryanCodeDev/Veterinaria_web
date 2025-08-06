// src/App.jsx
import React, { useState } from 'react';

// Import components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import BookingForm from './components/sections/BookingForm';
import AdminPanel from './components/admin/AdminPanel';
import { useAppointments } from './hooks/useAppointments';

const App = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);
  const { appointments, addAppointment, removeAppointment, getOccupiedTimeSlots } = useAppointments();

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setPreselectedService(null); // Reset preselected service
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setPreselectedService(null); // Reset preselected service
  };

  // Handle booking from navbar (no preselected service)
  const handleNavbarBooking = () => {
    setPreselectedService(null);
    setShowBookingForm(true);
  };

  // Handle booking from hero section (no preselected service)
  const handleHeroBooking = () => {
    setPreselectedService(null);
    setShowBookingForm(true);
  };

  // Handle booking from services section (with preselected service)
  const handleServiceBooking = (service = null) => {
    setPreselectedService(service);
    setShowBookingForm(true);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicios');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Si el panel administrativo está abierto, mostrar solo eso
  if (showAdminPanel) {
    return (
      <AdminPanel 
        appointments={appointments} 
        onDeleteAppointment={removeAppointment}
        onClose={() => setShowAdminPanel(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onBookingClick={handleNavbarBooking}
        onServicesClick={scrollToServices}
        onAdminClick={() => setShowAdminPanel(true)}
      />
      
      {/* Main Landing Page Content */}
      {!showBookingForm && (
        <>
          <HeroSection onBookingClick={handleHeroBooking} />
          <div id="servicios">
            <ServicesSection onBookingClick={handleServiceBooking} />
          </div>
        </>
      )}
      
      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          onSubmit={addAppointment}
          onClose={handleCloseBooking}
          onSuccess={handleBookingSuccess}
          getOccupiedTimeSlots={getOccupiedTimeSlots}
          preselectedService={preselectedService}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default App;