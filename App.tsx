import React, { useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './admin/LoginPage';
import DashboardPage from './admin/DashboardPage';
import WorkerListPage from './admin/WorkerListPage';
import WorkerFormPage from './admin/WorkerFormPage';
import OffersPage from './admin/OffersPage';
import AdminLayout from './components/AdminLayout';
import { AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);
  if (!auth.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/workers"
            element={
              <AdminRoute>
                <AdminLayout>
                  <WorkerListPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
           <Route
            path="/admin/workers/add"
            element={
              <AdminRoute>
                <AdminLayout>
                  <WorkerFormPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/workers/edit/:id"
            element={
              <AdminRoute>
                <AdminLayout>
                  <WorkerFormPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/offers"
            element={
              <AdminRoute>
                <AdminLayout>
                  <OffersPage />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}