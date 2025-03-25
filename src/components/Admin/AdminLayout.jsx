// src/components/Admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

function AdminLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileMouseEnter = () => {
    setShowMenu(true);
  };

  const handleProfileMouseLeave = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    // Eliminar token/rol y redirigir al inicio
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/'); // <-- Redirige a "/"
  };

  return (
    <div className="admin-layout">
      {/* Barra lateral */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Sendero Ecológico</h2>
        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/stations">Manage Stations</Link></li>
            <li><Link to="/admin/reports">Reports</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <h2>Administración</h2>
          <div
            className="profile-section"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <span className="profile-name">Admin Profile</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-avatar"
            />
            {showMenu && (
              <div className="profile-menu">
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
