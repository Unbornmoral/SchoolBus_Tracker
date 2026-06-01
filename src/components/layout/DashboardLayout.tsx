'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Bus,
  Shield,
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const parentLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/parent' },
  { icon: MapIcon, label: 'Live Track', href: '/dashboard/parent/track' },
  { icon: Bell, label: 'Alerts', href: '/dashboard/parent/alerts' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/parent/payments' },
  { icon: User, label: 'Child Profile', href: '/dashboard/parent/profile' },
];

const driverLinks = [
  { icon: LayoutDashboard, label: 'Route View', href: '/dashboard/driver' },
  { icon: Shield, label: 'Attendance', href: '/dashboard/driver/attendance' },
  { icon: Bell, label: 'Emergency', href: '/dashboard/driver/emergency' },
  { icon: Settings, label: 'Settings', href: '/dashboard/driver/settings' },
];

export default function DashboardLayout({ 
  children,
  role = 'parent'
}: { 
  children: React.ReactNode,
  role?: 'parent' | 'driver' | 'admin'
}) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const links = role === 'parent' ? parentLinks : driverLinks;

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {isOpen && (
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                <Bus size={18} className="text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg">BusTracker</span>
            </Link>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors ml-auto"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all group",
                pathname === link.href 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <link.icon size={22} className={cn(
                "shrink-0",
                pathname === link.href ? "" : "group-hover:scale-110 transition-transform"
              )} />
              {isOpen && <span className="font-medium">{link.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 space-y-2">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all",
              !isOpen && "justify-center"
            )}
          >
            <Settings size={22} />
            {isOpen && <span className="font-medium">Settings</span>}
          </Link>
          <button
            className={cn(
              "w-full flex items-center gap-4 p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all",
              !isOpen && "justify-center"
            )}
          >
            <LogOut size={22} />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen",
        isOpen ? "pl-64" : "pl-20"
      )}>
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/30 backdrop-blur-sm sticky top-0 z-30">
          <h1 className="text-xl font-bold capitalize">{pathname.split('/').pop() || 'Overview'}</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-xs text-slate-500">Parent</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
