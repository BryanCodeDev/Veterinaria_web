// src/components/admin/AdminPanel.jsx
import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Trash2, 
  Eye, 
  EyeOff,
  LogOut,
  Shield,
  Users,
  X
} from 'lucide-react';

const AdminPanel = ({ appointments, onDeleteAppointment, onClose }) => {
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!adminCredentials.username.trim()) {
      newErrors.username = 'El usuario es requerido';
    }

    if (!adminCredentials.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Check credentials
    if (adminCredentials.username === 'camilo' && adminCredentials.password === 'camilo123') {
      setIsAuthenticated(true);
      setAdminCredentials({ username: '', password: '' });
      setErrors({});
    } else {
      setErrors({ general: 'Credenciales incorrectas' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminCredentials({ username: '', password: '' });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name] || errors.general) {
      setErrors({});
    }
  };

  const deleteAppointment = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      onDeleteAppointment(id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full min-h-screen bg-white">
        
        {/* Login Form */}
        {!isAuthenticated ? (
          <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-amber-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-amber-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Panel de Administración</h1>
                    <p className="text-sm sm:text-base text-gray-600">Iniciar sesión para gestionar tu barbería</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Login Content */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
                  <div className="text-center mb-8">
                    <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Administrativo</h2>
                    <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {errors.general && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {errors.general}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Usuario
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={adminCredentials.username}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                          errors.username ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ingresa tu usuario"
                      />
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={adminCredentials.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12 transition-colors ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Ingresa tu contraseña"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-amber-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center justify-center text-base shadow-lg"
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Acceder al Panel
                    </button>
                  </form>

                  <div className="text-center text-sm text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
                    <p><strong>Credenciales de prueba:</strong></p>
                    <p className="mt-1">Usuario: <code className="bg-white px-2 py-1 rounded text-xs">camilo</code></p>
                    <p className="mt-1">Contraseña: <code className="bg-white px-2 py-1 rounded text-xs">camilo123</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg">
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center text-black mb-4 sm:mb-0">
                    <Users className="h-6 w-6 sm:h-7 sm:w-7 mr-3" />
                    <div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Panel de Administración</h1>
                      <p className="text-sm sm:text-base opacity-80">Gestiona las citas de tu barbería</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleLogout}
                      className="bg-black bg-opacity-20 text-black px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors flex items-center text-sm font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Cerrar Sesión</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-black bg-opacity-20 text-black p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="bg-white bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium mb-1">Total Citas</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900">{appointments.length}</p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Calendar className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 sm:p-6 rounded-xl border border-yellow-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium mb-1">Pendientes</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-900">
                        {appointments.filter(apt => apt.status === 'pending').length}
                      </p>
                    </div>
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <Clock className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium mb-1">Hoy</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900">
                        {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
                      </p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-full">
                      <User className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    Citas Agendadas ({appointments.length})
                  </h3>
                </div>

                {appointments.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start sm:items-center space-x-3">
                              <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                                <User className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{appointment.name}</h4>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{appointment.phone}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                <span className="text-gray-600">Servicio: </span>{appointment.service}
                              </div>
                              <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                <Calendar className="h-3 w-3 mr-2 flex-shrink-0" />
                                <span className="truncate">{formatDate(appointment.date)} - {appointment.time}</span>
                              </div>
                            </div>

                            {appointment.message && (
                              <div className="flex items-start text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                                <span className="break-words">{appointment.message}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between sm:justify-end space-x-3 flex-shrink-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </span>
                            <button
                              onClick={() => deleteAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                              title="Eliminar cita"
                            >
                              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No hay citas agendadas</h3>
                    <p className="text-gray-500 max-w-md mx-auto">Las citas aparecerán aquí cuando los clientes las agenden.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;