"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Smartphone, ShieldCheck, Palette, 
  Menu, X, Sun, Moon, ArrowRight, Zap, 
  Globe, Database, Server, CheckCircle2 
} from 'lucide-react';

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Solutions", href: "#" },
    { name: "Expertise", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Company", href: "#" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] h-20 flex items-center bg-white/60 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#003D7C] rounded-xl flex items-center justify-center font-black text-white group-hover:rotate-12 transition-all shadow-lg shadow-blue-900/20">N</div>
          <span className="text-xl font-extrabold dark:text-white text-slate-900 tracking-tighter uppercase">N<span className="text-[#F36F21]">Tech</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#F36F21] transition-colors">{link.name}</a>
          ))}
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-[#F36F21] hover:scale-110 transition-transform">
            {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
          <button className="bg-[#003D7C] dark:bg-[#F36F21] text-white px-8 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-[0_10px_20px_rgba(243,111,33,0.3)] transition-all">Start Sprint</button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-5">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-[#F36F21]">
            {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white"><Menu size={28} /></button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-0 h-screen w-full bg-white dark:bg-[#020617] z-[110] p-10 flex flex-col md:hidden">
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black dark:text-white">NTECH.</span>
              <button onClick={() => setIsOpen(false)}><X size={35} className="text-[#F36F21]" /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map(link => (
                <a key={link.name} href="#" className="text-5xl font-black dark:text-white hover:text-[#F36F21] tracking-tighter">{link.name}</a>
              ))}
            </div>
            <button className="mt-auto bg-[#F36F21] text-white py-6 rounded-3xl font-bold text-xl uppercase">Book Consultation</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- HERO SECTION ---
export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  const techStages = [
    { id: 'dev', title: 'System Architecture', icon: <Code2 />, desc: 'Deploying high-concurrency Node.js & React frameworks.', color: '#00AEEF' },
    { id: 'sec', title: 'Edge Security', icon: <ShieldCheck />, desc: 'Implementing zero-trust protocols & SSL encryption.', color: '#10B981' },
    { id: 'app', title: 'Mobile Ecosystems', icon: <Smartphone />, desc: 'Crafting iOS & Android cross-platform experiences.', color: '#F36F21' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % techStages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      {/* LAYER 0: ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#003D7C]/10 dark:bg-[#003D7C]/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#F36F21]/10 dark:bg-[#F36F21]/15 rounded-full blur-[120px]" 
        />
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 px-6 lg:px-12">
        
        {/* LEFT: CONTENT LAYER */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <Zap size={14} className="fill-current" />
            Empowering Enterprise Digitalization
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] dark:text-white text-slate-900 mb-8 tracking-tighter">
            WE ENGINEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003D7C] via-[#00AEEF] to-[#F36F21]">MODERNITY.</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12">
            NTech PVT. LTD. is your strategic technology partner. We specialize in building cloud-native applications, scalable ERPs, and impenetrable cyber-defense systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-[#003D7C] dark:bg-[#F36F21] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group">
              Start Project <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex -space-x-3 items-center">
              {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#020617] bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" /></div>)}
              <span className="pl-6 text-sm font-bold dark:text-white/60 text-slate-500">Trusted by 200+ Global Firms</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: REALISTIC TECH STAGE */}
        <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center perspective-2000">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: -15 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* THE BUILD WINDOW (The Live Demo) */}
              <div className="relative w-full max-w-[460px] aspect-square bg-white dark:bg-[#0f172a] rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_50px_100px_-20px_rgba(0,174,239,0.15)] border-[12px] border-slate-100 dark:border-slate-800 p-8 flex flex-col group">
                
                {/* Simulated UI Header */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="px-3 py-1 bg-slate-50 dark:bg-white/5 rounded-lg text-[10px] font-bold text-slate-400">PROJECT_BUILD_v2.0</div>
                </div>

                {/* Animated Demo Content */}
                <div className="flex-1 flex flex-col justify-center">
                  {activeTab === 0 && <CodeBuildAnimation />}
                  {activeTab === 1 && <SecurityPulseAnimation />}
                  {activeTab === 2 && <AppUIAnimation />}
                </div>

                {/* Status Footer */}
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#F36F21]/10 rounded-xl text-[#F36F21]">{techStages[activeTab].icon}</div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Sprint</p>
                        <p className="text-sm font-bold dark:text-white uppercase">{techStages[activeTab].title}</p>
                      </div>
                   </div>
                   <CheckCircle2 size={24} className="text-green-500" />
                </div>
              </div>

              {/* FLOATING DEPTH ELEMENTS (Background Logic) */}
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -right-5 z-20">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 flex items-center gap-3">
                   <Server className="text-[#00AEEF]" />
                   <span className="text-xs font-bold dark:text-white">Uptime 99.9%</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

/* --- DETAILED TECH ANIMATIONS (The "Playground" Sub-components) --- */

function CodeBuildAnimation() {
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} className="h-2 bg-[#00AEEF]/40 rounded-full" />
        <motion.div initial={{ width: 0 }} animate={{ width: "20%" }} transition={{ delay: 0.2 }} className="h-2 bg-slate-200 dark:bg-white/10 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="h-20 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center italic text-[10px] text-slate-400">{"<script />"}</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="h-10 bg-[#003D7C] rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full" />
          <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full" />
          <div className="h-2 w-1/2 bg-[#F36F21]/30 rounded-full" />
          <div className="h-12 w-full bg-[#00AEEF]/20 rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
}

function SecurityPulseAnimation() {
  return (
    <div className="flex flex-col items-center justify-center relative h-full">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-40 h-40 border-2 border-green-500/30 rounded-full"
      />
      <div className="relative z-10 p-8 bg-green-500/10 rounded-full border-2 border-green-500/20">
         <ShieldCheck size={64} className="text-green-500" />
      </div>
      <p className="mt-8 text-xs font-bold text-green-500 tracking-widest uppercase animate-pulse">Encryption Active</p>
    </div>
  );
}

function AppUIAnimation() {
  return (
    <div className="flex justify-center gap-4 h-full items-center">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-28 h-56 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-slate-200 dark:border-white/10 p-2 overflow-hidden">
        <div className="w-full h-1/2 bg-[#F36F21] rounded-2xl mb-2" />
        <div className="space-y-1.5 px-1">
          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full" />
          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full" />
          <div className="h-6 w-full bg-[#00AEEF] rounded-lg mt-3" />
        </div>
      </motion.div>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-24 h-48 bg-slate-50 dark:bg-white/5 rounded-[2rem] border-2 border-slate-200 dark:border-white/10 p-2 opacity-50 blur-[1px]">
        <div className="w-full h-1/3 bg-slate-200 dark:bg-white/10 rounded-xl mb-2" />
        <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full" />
      </motion.div>
    </div>
  );
}