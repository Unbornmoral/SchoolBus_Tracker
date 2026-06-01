'use client';

import dynamic from 'next/dynamic';
const BusMap = dynamic(() => import('@/components/Map'), { ssr: false });
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Bus, Users, MapPin, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Fleet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Bus className="text-primary" />}
            label="Total Fleet"
            value="24"
            trend="+2 this month"
          />
          <StatCard 
            icon={<Users className="text-secondary" />}
            label="Total Students"
            value="1,240"
            trend="98% active"
          />
          <StatCard 
            icon={<MapPin className="text-accent" />}
            label="Active Routes"
            value="18"
            trend="3 on standby"
          />
          <StatCard 
            icon={<AlertCircle className="text-alert-red" />}
            label="Active Alerts"
            value="3"
            trend="2 delays, 1 SOS"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Map View */}
          <div className="lg:col-span-2 h-[500px]">
             <BusMap />
          </div>

          {/* System Health */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8">System Health</h3>
            <div className="space-y-8">
              <HealthItem label="GPS Servers" status="healthy" percentage={99.9} />
              <HealthItem label="API Latency" status="healthy" percentage={94} />
              <HealthItem label="Database" status="healthy" percentage={100} />
              <div className="pt-4">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-4">
                  <TrendingUp className="text-primary" />
                  <div>
                    <p className="text-sm font-bold">Optimization Active</p>
                    <p className="text-xs text-slate-400">Routes are being auto-adjusted for traffic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Status Table */}
          <div className="lg:col-span-3 glass rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8">Fleet Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-sm">
                    <th className="pb-4 font-medium">Bus ID</th>
                    <th className="pb-4 font-medium">Driver</th>
                    <th className="pb-4 font-medium">Route</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <BusRow id="#B42" driver="Michael Ross" route="North-A" status="on-time" />
                  <BusRow id="#B15" driver="Sarah Connor" route="East-B" status="delayed" />
                  <BusRow id="#B09" driver="James Bond" route="West-C" status="maintenance" />
                  <BusRow id="#B22" driver="Peter Parker" route="South-D" status="on-time" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass p-6 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{trend}</span>
      </div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h4 className="text-3xl font-bold mt-1">{value}</h4>
    </div>
  );
}

function BusRow({ id, driver, route, status }: { id: string, driver: string, route: string, status: 'on-time' | 'delayed' | 'maintenance' }) {
  const statusColors = {
    'on-time': 'bg-safe-green/10 text-safe-green',
    'delayed': 'bg-bus-yellow/10 text-bus-yellow',
    'maintenance': 'bg-slate-700 text-slate-400'
  };

  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <td className="py-4 font-bold">{id}</td>
      <td className="py-4 text-slate-400">{driver}</td>
      <td className="py-4 text-slate-400">{route}</td>
      <td className="py-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="py-4">
        <button className="text-primary text-sm font-bold hover:underline">Monitor</button>
      </td>
    </tr>
  );
}

function HealthItem({ label, status, percentage }: { label: string, status: string, percentage: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="text-slate-200 font-bold">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );
}
