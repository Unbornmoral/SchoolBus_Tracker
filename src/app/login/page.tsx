'use client';

import { motion } from 'framer-motion';
import { Bus, ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import Background3D from '@/3d/Background';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-slate-100">
      <Background3D />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-10 rounded-3xl space-y-8"
      >
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="bg-primary p-2 rounded-lg">
              <Bus className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">BusTracker</span>
          </Link>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Sign in to your portal</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Link href="/dashboard/parent" className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <p className="text-xs font-bold text-slate-500 uppercase">Parent Demo</p>
          </Link>
          <Link href="/dashboard/driver" className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <p className="text-xs font-bold text-slate-500 uppercase">Driver Demo</p>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
