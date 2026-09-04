import React, { useState } from 'react';
import {  ShieldCheck } from 'lucide-react';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create an account</h1>
          <p className="text-slate-400 text-sm">Get started with your developer sandbox profile</p>
        </div>

        <RegisterForm />
       
      </div>
    </div>
  );
}