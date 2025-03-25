
import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  // En un proyecto real, podrías usar un AuthContext en vez de localStorage
  const token = localStorage.getItem('token');
  const rolAlmacenado = localStorage.getItem('rol'); // e.g. 'ADMIN' o 'USER'

  // Verifica si hay token y si el rol es ADMIN
  if (!token || rolAlmacenado !== 'ADMIN') {
    // Redirige a /login o muestra un error 403
    return <Navigate to="/login" />;
  }

  // Si pasa la verificación, renderiza el componente hijo
  return children;
}

export default AdminRoute;
