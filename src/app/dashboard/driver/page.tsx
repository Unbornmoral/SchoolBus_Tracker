'use client';

import dynamic from 'next/dynamic';
const BusMap = dynamic(() => import('@/components/Map'), { ssr: false });
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Users, Navigation, PhoneCall, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const mockStudents = [
  { id: '1', name: 'Alice Johnson', stop: 'Sector 12', status: 'pending' },
  { id: '2', name: 'Bob Smith', stop: 'Sector 14', status: 'boarded' },
  { id: '3', name: 'Charlie Brown', stop: 'Maple Street', status: 'absent' },
  { id: '4', name: 'Daisy Miller', stop: 'Oak Avenue', status: 'pending' },
];

export default function DriverDashboard() {
  const [students, setStudents] = useState(mockStudents);

  const toggleStatus = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <DashboardLayout role="driver">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Route Map */}
            <div className="h-[400px] w-full">
              <BusMap />
            </div>

            {/* Active Route Info */}
            <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl flex items-center justify-between">
              <div>
                <p className="text-accent font-bold uppercase tracking-wider text-xs mb-2">Active Route</p>
                <h2 className="text-3xl font-bold">Morning Pickup - Route A</h2>
                <p className="text-slate-400 mt-2">Next Stop: <span className="text-white font-medium">Sector 12 (3 students)</span></p>
              </div>
              <button className="bg-primary hover:bg-primary-dark p-5 rounded-2xl shadow-lg transition-all group">
                <Navigation className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Student List */}
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Users size={22} className="text-primary" />
                  Student Check-in
                </h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-slate-400">Total: {students.length}</span>
                  <span className="text-xs bg-safe-green/10 px-3 py-1 rounded-full text-safe-green">Boarded: {students.filter(s => s.status === 'boarded').length}</span>
                </div>
              </div>

              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-slate-400">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.stop}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleStatus(student.id, 'boarded')}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          student.status === 'boarded' ? "bg-safe-green text-white" : "bg-white/5 text-slate-500 hover:text-white"
                        )}
                      >
                        <CheckCircle2 size={20} />
                      </button>
                      <button 
                        onClick={() => toggleStatus(student.id, 'absent')}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          student.status === 'absent' ? "bg-alert-red text-white" : "bg-white/5 text-slate-500 hover:text-white"
                        )}
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-6">Vehicle Status</h3>
              <div className="space-y-4">
                <StatusToggle label="Engine" active />
                <StatusToggle label="GPS Signal" active />
                <StatusToggle label="Camera Feed" active />
                <StatusToggle label="Passenger Sensor" />
              </div>
            </div>

            <button className="w-full bg-alert-red hover:bg-red-600 text-white p-6 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-alert-red/20 transition-all">
              <AlertCircle size={24} />
              EMERGENCY ALERT
            </button>

            <button className="w-full glass p-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              <PhoneCall size={22} className="text-primary" />
              Contact Admin
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatusToggle({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400">{label}</span>
      <div className={cn(
        "w-3 h-3 rounded-full",
        active ? "bg-safe-green shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-600"
      )} />
    </div>
  );
}
