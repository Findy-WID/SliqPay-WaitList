import React, { useState } from 'react';
import { motion } from 'framer-motion';
import herosliq1 from "./assets/herosliq1.png";
import axios from 'axios';
import logo from "./assets/logo.png";
import { 
  ArrowRight, 
  ShieldCheck,
  BadgeCheck,
  Server, 
  Globe,
  Zap,  
  CheckCircle2,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MapPin,
  ChevronRight,
  Users,
  Sparkles,
  Rocket,
  ArrowUpRight
} from 'lucide-react';

/**
 * TYPES DEFINITIONS
 */
interface BrandColors {
  primaryGreen: string;
  lightBlue: string;
  background: string;
  surface: string;
  accentPurple: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const brandColors: BrandColors = {
  primaryGreen: '#10b981',
  lightBlue: '#3b82f6',
  background: '#0a0a0a',
  surface: '#171717',
  accentPurple: '#8b5cf6',
};

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfJEVcoA6f-Ah4QRg5uvQ7--oIGE__ng4X_D00pSGFbZrzk25NMlvth44aqAiSd2o-/exec';

const SliqPayWaitlist: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [waitlistCount, setWaitlistCount] = useState<number>(1240);
  const [error, setError] = useState<string>('');
  // const [stats, setStats] = useState({
  //   waitlistCount: 0,
  //   countries: 1
  // });


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  
  try {
    const response = await axios.post(APPS_SCRIPT_URL, {
      email: email,
      name: name,  // Make sure you have this state
      timestamp: new Date().toISOString(),
      source: 'website'
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.data.status === 'duplicate') {
      setError('This email is already on the waitlist!');
    } else if (response.data.status === 'success') {
      setIsSubmitted(true);
    }
  } catch (err) {
    setError('Something went wrong. Please try again.');
    console.error('Submission error:', err);
  } finally {
    setIsLoading(false);
  }
};

// Fetch real data when component mounts
// useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       // You'll need to create a simple API to get count
//       // For now, let's just get the count from your sheet
//       const response = await fetch('https://script.google.com/macros/s/AKfycbwfJEVcoA6f-Ah4QRg5uvQ7--oIGE__ng4X_D00pSGFbZrzk25NMlvth44aqAiSd2o-/exec?action=count');
//       const data = await response.json();
//       setStats(prev => ({
//         ...prev,
//         waitlistCount: data.count || 0
//       }));
//     } catch (error) {
//       console.error('Failed to fetch stats:', error);
//     }
//   };
  
//   fetchStats();
// }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden" 
         style={{ backgroundColor: brandColors.background }}>
      
      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: brandColors.primaryGreen }}
          >
            <img src={logo} alt="SliqPay Logo" className="h-8 w-auto" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight">SliqPay</span>
        </motion.div>

        <motion.a 
          href="#waitlist"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all"
        >
          Join Waitlist <ArrowUpRight className="inline w-4 h-4 ml-1" />
        </motion.a>
      </motion.nav>

      {/* Hero Section */}
      <motion.main 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
          >
            <motion.span 
              // animate={{ scale: [1, 1.2, 1] }}
              // transition={{ duration: 2, repeat: Infinity }}
              // className="flex h-2 w-2 rounded-full"
              // style={{ backgroundColor: brandColors.primaryGreen }}
            />
            {/* <span className="text-gray-300">
              <span className="font-bold text-white">{waitlistCount.toLocaleString()}</span> others joined
            </span> */}
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
          >
            Payments for the <br />
            <motion.span 
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="text-transparent bg-clip-text bg-gradient-to-r bg-[length:200%]"
              style={{ 
                backgroundImage: `linear-gradient(45deg, ${brandColors.primaryGreen}, ${brandColors.lightBlue}, ${brandColors.accentPurple})` 
              }}
            >
              Global African.
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-lg"
          >
            Experience the future of cross-border payments. Fast, secure, and built for the African continent.
          </motion.p>

          {!isSubmitted ? (
            <motion.form 
              variants={fadeInUp}
              onSubmit={handleSubmit} 
              className="space-y-4 max-w-md"
            >
              <div className="relative flex-grow">
                <input 
                  type="text"
                  placeholder="Your name (optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 transition-all mb-3"
                  style={{ '--tw-ring-color': brandColors.primaryGreen } as React.CSSProperties}
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': brandColors.primaryGreen } as React.CSSProperties}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 group relative overflow-hidden"
                style={{ backgroundColor: brandColors.primaryGreen, color: brandColors.background }}
              >
                <motion.span
                  animate={isLoading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  {isLoading ? "⏳" : "✨"}
                </motion.span>
                {isLoading ? "Joining the movement..." : "Secure Your Spot"}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4 max-w-md"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
              </motion.div>
              <div>
                <h3 className="font-bold text-lg">You're on the list! 🎉</h3>
                <p className="text-gray-400 text-sm">We've sent a confirmation to {email}. Get ready for early access!</p>
              </div>
            </motion.div>
          )}

          {/* Social Proof */}
          <motion.div 
            variants={fadeInUp}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 border-2 border-black"
                />
              ))}
            </div>
            {/* <span className="text-sm text-gray-400">
              <span className="text-white font-bold">+500</span> founders joined this week
            </span> */}
          </motion.div>
        </motion.div>

        {/* Visual Placeholder - Custom Images */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-gradient-to-tr opacity-30 blur-[100px]"
            style={{ backgroundImage: `linear-gradient(to top right, ${brandColors.primaryGreen}, ${brandColors.lightBlue}, ${brandColors.accentPurple})` }}
          />
          
          <div className="relative rounded-[2.5rem] border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center overflow-hidden border border-white/5 relative">
              
              {/* Background Image (herosliq1 - Map of Africa) */}
              <img 
                src={herosliq1} 
                alt="Africa payment flow" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              
              {/* Foreground PNG with transparency (herosliq2 - Geometric shapes) */}
              {/* <img 
                src={herosliq2} 
                alt="Geometric shapes overlay" 
                className="relative z-10 w-full h-full object-contain p-4"
              /> */}
              
            </div>
          </div>
        </motion.div>
      </motion.main>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={<Users />} value="10k+" label="Waitlist Members" />
          <StatCard icon={<Globe />} value="15+" label="Targeted Countries" />
          <StatCard icon={<Zap />} value="<10s" label="Transaction Speed" />
          <StatCard icon={<ShieldCheck />} value="100%" label="Secure" />
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Built for the <span className="text-emerald-400">future</span> of payments
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
          <FeatureCard 
            icon={<ShieldCheck />}
            title="Bank-Grade Security"
            desc="Built with modern fintech-grade infrastructure and end-to-end encryption."
            delay={0}
          />
          <FeatureCard 
            icon={<BadgeCheck />}
            title="Transparent by Design"
            desc="Instant breakdown of fees before you approve any transaction."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Server />}
            title="Always-On Infrastructure"
            desc="99.9% uptime with multi-layer safeguards for uninterrupted flow."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Globe />}
            title="Native Multi-Currency"
            desc="Transact globally. We handle the complexity behind the scenes."
            delay={0.3}
          />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        id="waitlist"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto px-6 py-24 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-16 rounded-[3rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 border border-white/5 relative overflow-hidden group"
        >
          {/* Animated background */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${brandColors.primaryGreen} 0%, transparent 50%)`,
            }}
          />
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative z-10"
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to revolutionize <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                African payments?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join the waitlist today and be among the first to experience the future of cross-border transactions.
            </p>
            
            {!isSubmitted ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-12 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-black hover:opacity-90 transition-all inline-flex items-center gap-3 group"
              >
                <Sparkles className="group-hover:rotate-12 transition-transform" />
                Join the Movement
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-emerald-400 text-xl"
              >
                🎉 Thanks for joining! Check your email.
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/5 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <img src={logo} alt="SliqPay" className="h-5 w-auto" />
                </div>
                <span className="text-xl font-bold">SliqPay</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming cross-border payments for the global African.
              </p>

              {/* Social Links - Replace the mapping with actual links */}
              <div className="flex gap-4 pt-4">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://x.com/SliqPay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Twitter size={18} />
                </motion.a>
                
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://linkedin.com/company/sliqpayafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Linkedin size={18} />
                </motion.a>
                
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://instagram.com/sliqpayafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Instagram size={18} />
                </motion.a>
                
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://github.com/Findy-WID/SliqPay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Github size={18} />
                </motion.a>
              </div>
              
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                {['Features', 'Security', 'Pricing', 'FAQ'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href="mailto:sliqpay.info@gmail.com" className="hover:text-white transition-colors">
                    sliqpay.info@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Lagos (HQ) • Nairobi <span className='text-sm'>(coming soon).</span></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 SliqPay. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </motion.footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ 
      y: -8,
      transition: { duration: 0.2 }
    }}
    className="group p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all cursor-default relative overflow-hidden"
  >
    {/* Shine effect on hover */}
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100"
      initial={false}
      animate={{
        background: `radial-gradient(circle at 50% 50%, ${brandColors.primaryGreen}20 0%, transparent 70%)`,
      }}
      transition={{ duration: 0.3 }}
    />
    
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="mb-6 inline-block p-4 rounded-2xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors relative z-10"
    >
      {icon}
    </motion.div>
    
    <h3 className="text-xl font-bold mb-3 relative z-10">{title}</h3>
    <p className="text-gray-400 leading-relaxed relative z-10">{desc}</p>
    
    {/* Animated border on hover */}
    <motion.div
      className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100"
      style={{
        border: '2px solid transparent',
        borderImage: `linear-gradient(45deg, ${brandColors.primaryGreen}, ${brandColors.lightBlue}) 1`,
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
  >
    <div className="text-emerald-400 mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </motion.div>
);

export default SliqPayWaitlist;