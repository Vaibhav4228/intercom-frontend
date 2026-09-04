

 import React from "react";
import { Link, Outlet } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
  

export default function AuthLayout() {
  return (
    <div>
        
        <div>
          <ToastContainer />
            <Outlet />
        </div>
    </div>
  );
}