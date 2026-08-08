import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/loginpage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DashboardLaporan from "../pages/laporan/DashboardLaporan";

import RumahPage from "../pages/rumah/RumahPage";
import NasabahPage from "../pages/nasabah/NasabahPage";
import JenisSampahPage from "../pages/jenis-sampah/JenisSampahPage";
import AdminPage from "../pages/admin/AdminPage";
import LaporanSetoran from "../pages/laporan/LaporanSetoran";

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

        {/* Dashboard */}
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
            <DashboardLayout>
              <DashboardLaporan />
            </DashboardLayout>
          }
        />

<Route
  path="/laporan/setoran"
  element={
    <DashboardLayout>
      <LaporanSetoran />
    </DashboardLayout>
  }
/>

        {/* Rumah */}
        <Route
          path="/rumah"
          element={
            <DashboardLayout>
              <RumahPage />
            </DashboardLayout>
          }
        />

        {/* Nasabah */}
        <Route
          path="/nasabah"
          element={
            <DashboardLayout>
              <NasabahPage />
            </DashboardLayout>
          }
        />

        {/* Jenis Sampah */}
        <Route
          path="/jenis-sampah"
          element={
            <DashboardLayout>
              <JenisSampahPage />
            </DashboardLayout>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <DashboardLayout>
              <AdminPage />
            </DashboardLayout>
          }
        />

        {/* ================= SETORAN ================= */}

        <Route
          path="/setoran"
          element={
            <DashboardLayout>
              <SetoranPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/setoran/new"
          element={
            <DashboardLayout>
              <SetoranForm />
            </DashboardLayout>
          }
        />

        <Route
          path="/setoran/edit/:id"
          element={
            <DashboardLayout>
              <SetoranForm />
            </DashboardLayout>
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