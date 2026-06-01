'use client';

import BusMap from '@/components/Map';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Bus, MapPin, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ParentOverview() {
  return (
    <DashboardLayout role="parent">
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Bus className="text-primary" />}
            label="Bus Status"
            value="On Route"
            subValue="Bus #42"
          />
          <StatCard 
            icon={<MapPin className="text-secondary" />}
            label="Current Location"
            value="Sector 12"
            subValue="2.4 km away"
          />
          <StatCard 
            icon={<Clock className="text-accent" />}
            label="Estimated Arrival"
            value="08:15 AM"
            subValue="In 12 minutes"
          />
          <StatCard 
            icon={<ShieldCheck className="text-emerald-400" />}
            label="Attendance"
            value="Checked In"
            subValue="at 07:45 AM"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Preview */}
          <div className="lg:col-span-2 h-[500px]">
            <BusMap />
          </div>

          {/* Recent Alerts */}
          <div className="glass rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle size={20} className="text-bus-yellow" />
              Recent Alerts
            </h3>
            <div className="space-y-4">
              <AlertItem 
                type="info"
                title="Bus started journey"
                time="15 min ago"
              />
              <AlertItem 
                type="delay"
                title="5 min delay due to traffic"
                time="5 min ago"
              />
              <AlertItem 
                type="success"
                title="Child boarded bus"
                time="Just now"
              />
            </div>
            <button className="w-full py-4 border border-white/5 rounded-2xl text-sm font-medium hover:bg-white/5 transition-colors">
              View All History
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValueText?: string, subValue: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-3xl"
    >
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h4 className="text-2xl font-bold mt-1">{value}</h4>
      <p className="text-xs text-slate-400 mt-1">{subValue}</p>
    </motion.div>
  );
}

function AlertItem({ title, time, type }: { title: string, time: string, type: 'info' | 'delay' | 'success' }) {
  const colors = {
    info: 'bg-primary',
    delay: 'bg-bus-yellow',
    success: 'bg-safe-green'
  };

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
      <div className={cn("w-2 h-10 rounded-full shrink-0", colors[type])} />
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
