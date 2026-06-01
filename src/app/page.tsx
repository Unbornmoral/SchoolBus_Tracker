import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Background3D from '@/3d/Background';
import { Shield, MapPin, Bell, Users, Clock, CreditCard } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen text-slate-100">
      <Background3D />
      <Navbar />
      
      <Hero />

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Safety and Efficiency Combined
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our platform provides all the tools needed for schools, parents, and drivers to ensure a smooth and safe daily commute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MapPin className="text-primary" />}
              title="Live GPS Tracking"
              description="Real-time location updates of the school bus on a high-fidelity map interface."
            />
            <FeatureCard 
              icon={<Bell className="text-secondary" />}
              title="Instant Notifications"
              description="Get alerted when the bus is near your stop, arrives at school, or experiences delays."
            />
            <FeatureCard 
              icon={<Shield className="text-accent" />}
              title="Student Attendance"
              description="Track when your child boards and deboards the bus with digital check-ins."
            />
            <FeatureCard 
              icon={<Users className="text-emerald-400" />}
              title="Driver Profiles"
              description="Verified driver information and direct contact options for emergencies."
            />
            <FeatureCard 
              icon={<Clock className="text-amber-400" />}
              title="Estimated ETAs"
              description="AI-calculated arrival times based on traffic and route conditions."
            />
            <FeatureCard 
              icon={<CreditCard className="text-rose-400" />}
              title="Fee Management"
              description="Manage bus subscriptions and payments directly through the portal."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              SchoolBus<span className="text-primary">Tracker</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 SchoolBus_Tracker. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
