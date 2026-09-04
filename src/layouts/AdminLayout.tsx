

import React, { useState } from 'react';


import { Outlet } from 'react-router';
import AdminSidebar from '../components/admin/sidebar/AdminSideBar';
import DashboardHeader from '../components/admin/header/DashboardHeader';
import { ToastContainer, toast } from 'react-toastify';
  

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Agents');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Mock User Data
  const user = {
    name: 'Alex Mercer',
    email: 'alex.m@company.com'
  };

  const handleLogout = () => {
    alert('Logging out of your secure session...');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">

      {/* ================= BACKDROP FOR MOBILE SIDEBAR ================= */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ================= SIDEBAR COMPONENT ================= */}
      <AdminSidebar
        user={user}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        handleLogout={handleLogout}
      />

      {/* ================= MAIN CONTAINER WINDOW ================= */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardHeader
          title="Agents"
          onOpenSidebar={() => setIsMobileOpen(true)}
        />

        {/* MAIN ROUTE CONTENT HUB */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar bg-slate-950">
           <ToastContainer />
           <Outlet />
        </main>
      </div>

    </div>
  );
}