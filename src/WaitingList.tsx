import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap,  
  Users,
  CheckCircle2,
  Lock
} from 'lucide-react';

/**
 * TYPES DEFINITIONS
 */
interface BrandColors {
  primaryGreen: string;
  lightBlue: string;
  background: string;
  surface: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const brandColors: BrandColors = {
  primaryGreen: '#10b981',
  lightBlue: '#3b82f6',
  background: '#0a0a0a',
  surface: '#171717',
};

const SliqPayWaitlist: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [waitlistCount, setWaitlistCount] = useState<number>(1240);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // FIXED: Changed type to FormEvent
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-emerald-500/30" style={{ backgroundColor: brandColors.background }}>
      
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: brandColors.primaryGreen }}>
            <span className="font-bold text-black text-xl">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">SliqPay</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
            <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: brandColors.primaryGreen }}></span>
            <span className="text-gray-300">Join {waitlistCount.toLocaleString()} others in the queue</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Payments for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r" 
                  style={{ backgroundImage: `linear-gradient(to right, ${brandColors.primaryGreen}, ${brandColors.lightBlue})` }}>
              Global African.
            </span>
          </h1>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 transition-all"
                  // FIXED: Cast as React.CSSProperties to allow custom variables
                  style={{ '--tw-ring-color': brandColors.primaryGreen } as React.CSSProperties}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <button 
                disabled={isLoading}
                className="px-8 py-1 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                style={{ backgroundColor: brandColors.primaryGreen, color: brandColors.background }}
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4 max-w-md">
              <CheckCircle2 className="text-emerald-500 shrink-0" />
              <div>
                <h3 className="font-bold text-lg">You're on the list!</h3>
                <p className="text-gray-400 text-sm">We've sent a confirmation to {email}.</p>
              </div>
            </div>
          )}
        </div>

        {/* Visual Placeholder */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr opacity-20 blur-[100px]"
               style={{ backgroundImage: `linear-gradient(to top right, ${brandColors.primaryGreen}, ${brandColors.lightBlue})` }}></div>
          <div className="relative rounded-[2.5rem] border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
            <div className="aspect-square rounded-[2rem] bg-neutral-900 flex items-center justify-center overflow-hidden border border-white/5">
                <Zap size={48} style={{ color: brandColors.primaryGreen }} />
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<ShieldCheck className="text-emerald-400" />}
            title="Institutional Security"
            desc="Military-grade encryption for every transaction."
          />
          <FeatureCard 
            icon={<Users className="text-blue-400" />}
            title="Sliq Circles"
            desc="Shared wallets for families and teams."
          />
          <FeatureCard 
            icon={<Lock className="text-purple-400" />}
            title="Private by Design"
            desc="We don't sell your data. Your footprint stays yours."
          />
        </div>
      </section>

      {/* FIXED: Removed 'jsx="true"' and used a standard style tag */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// FIXED: Defined the types for the props
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.04]">
    <div className="mb-6 inline-block p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default SliqPayWaitlist;