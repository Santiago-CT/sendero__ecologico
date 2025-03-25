import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Componentes de área pública
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Home from './components/Pages/Home';
import Auth from './components/Pages/Auth';
import StationDetail from './components/Pages/StationDetail';
import Comments from './components/Pages/Comments';
import SpeciesList from './components/Pages/SpeciesList';
import Filter from './components/Pages/Filter';

// Componentes de área de administración
import AdminRoute from './components/Routes/AdminRoute';
import AdminLayout from './components/Admin/AdminLayout';
import ManageStations from './components/Pages/ManageStations';
import ReportsDashboard from './components/Pages/ReportsDashboard';

function AppWrapper() {
  const location = useLocation();
  // Se asume que las rutas de admin empiezan con "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Muestra Header y Footer solo en rutas públicas */}
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/station/:id" element={<StationDetail />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/species" element={<SpeciesList />} />
        <Route path="/filter" element={<Filter />} />

        {/* Rutas de administración protegidas */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Rutas hijas en el layout de admin */}
          <Route index element={<div>Dashboard Admin</div>} />
          <Route path="stations" element={<ManageStations />} />
          <Route path="reports" element={<ReportsDashboard />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
