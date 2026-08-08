import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/auth/loginpage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DashboardLaporan from "../pages/laporan/DashboardLaporan";

import RumahPage from "../pages/rumah/RumahPage";
import NasabahPage from "../pages/nasabah/NasabahPage";
import JenisSampahPage from "../pages/jenis-sampah/JenisSampahPage";
import AdminPage from "../pages/admin/Adminpage";
import LaporanSetoran from "../pages/laporan/LaporanSetoran";
import PengaturanPage from "../pages/settings/PengaturanPage";

// ================= SETORAN =================
import SetoranPage from "../pages/setoran/SetoranPage";
import SetoranForm from "../pages/setoran/SetoranForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Dashboard - bisa diakses tanpa login */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />

        {/* Laporan */}
        <Route
          path="/laporan"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardLaporan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/laporan/setoran"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <LaporanSetoran />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rumah */}
        <Route
          path="/rumah"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <RumahPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Nasabah */}
        <Route
          path="/nasabah"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <NasabahPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Jenis Sampah */}
        <Route
          path="/jenis-sampah"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <JenisSampahPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AdminPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Pengaturan */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PengaturanPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= SETORAN ================= */}

        <Route
          path="/setoran"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SetoranPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setoran/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SetoranForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setoran/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SetoranForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}