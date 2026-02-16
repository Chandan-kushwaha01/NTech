"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Cpu, Shield, Database, Terminal, Zap, Server } from 'lucide-react';
import Image from 'next/image';

const images = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
];

const theme = {
  orange: '#f26522',
  blue: '#0056b3',
  bg: '#010409',
};

// --- WRITABLE TEXT COMPONENT ---
const WritableText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 15 },
  };

  return (
    <motion.span variants={container} initial="hidden" animate="visible" className="inline-block">
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stage, setStage] = useState<'intro' | 'main'>('intro');
  const [activeImg, setActiveImg] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    const introTimer = setTimeout(() => setStage('main'), 2600);
    const sliderTimer = setInterval(() => setActiveImg((prev) => (prev === 0 ? 1 : 0)), 7000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(introTimer);
      clearInterval(sliderTimer);
    };
  }, []);

  // --- "FLYING FIRE" DIGITAL EMBER EFFECT ---
  useEffect(() => {
    if (stage !== 'main' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const particleCount = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string; opacity: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.color = Math.random() > 0.4 ? theme.orange : theme.blue;
        this.opacity = Math.random();
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.003;
        if (this.y < -10 || this.opacity <= 0) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
          this.opacity = Math.random();
        }
      }
      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, [stage]);

  return (
    <div className="relative min-h-screen w-full bg-[#010409] text-white selection:bg-[#f26522]/30 overflow-hidden font-sans">
      
      {/* --- 1. INTRO SEQUENCE --- */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#010409]"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter flex items-center gap-4"
            >
              <span style={{ color: theme.blue }}>N</span>TECH
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-[2px] bg-[#f26522] mt-6"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. MAIN CONTENT --- */}
      {stage === 'main' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          {/* FIRE BACKGROUND LAYER */}
          <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />

          {/* NAVBAR */}
          <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-[#010409]/95 backdrop-blur-xl border-b border-white/5' : 'py-8 md:py-10'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className="text-xl md:text-2xl font-black flex items-center gap-2">
                 <span style={{ color: theme.blue }}><Image src={'/logo.png'} alt='Logo' height={200} width={200} /></span>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#f26522] animate-pulse hidden md:block" />
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-10">
                {['Innovation', 'Solutions', 'Security', 'Company'].map((item) => (
                  <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#f26522] transition-colors relative group">
                    {item}
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#f26522] transition-all group-hover:w-full" />
                  </a>
                ))}
                <button className="px-7 py-2.5 bg-[#f26522] rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-orange-600/20">
                  Partner Portal
                </button>
              </div>

              {/* Hamburger Icon */}
              <button 
                onClick={() => setIsMenuOpen(true)} 
                className="md:hidden flex flex-col gap-1.5 p-2 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="w-6 h-0.5 bg-white rounded-full" />
                <div className="w-6 h-0.5 bg-white rounded-full" />
                <div className="w-4 h-0.5 bg-white rounded-full ml-auto" />
              </button>
            </div>
          </nav>

          {/* MOBILE OVERLAY MENU */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ x: '100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '100%' }} 
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[100] bg-[#010409] flex flex-col p-8 overflow-y-auto"
              >
                {/* Close Button Inside Menu */}
                <div className="flex justify-between items-center mb-16">
                   <div className="text-2xl font-black"><span style={{ color: theme.blue }}>N</span>TECH</div>
                   <button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="p-3 bg-white/5 rounded-full border border-white/10 text-white"
                   >
                    <X size={28} />
                   </button>
                </div>

                <div className="flex flex-col gap-8">
                  {['Innovation', 'Solutions', 'Security', 'Company', 'Support', 'Contact'].map((item, idx) => (
                    <motion.a 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={item} 
                      href="#" 
                      className="text-4xl font-black tracking-tighter hover:text-[#f26522]" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-12">
                   <button className="w-full py-5 bg-[#f26522] text-xl font-black rounded-2xl shadow-xl shadow-orange-600/20">
                      Get Started Now
                   </button>
                   <p className="text-center text-slate-500 text-sm mt-6">© 2024 NTech IT Solution PVT. LTD</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO SECTION */}
          <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-48 flex flex-col lg:flex-row items-center gap-16 lg:min-h-screen">
            
            {/* Left Content (Fixed Visibility & Size) */}
            <div className="flex-1 text-center lg:text-left relative">
              {/* Subtle backdrop for text contrast */}
              <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#00a8ff] text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
                <Zap size={14} fill="#00a8ff" /> <WritableText text="Advanced Systems Integration" delay={0.2} />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tighter mb-8 text-white">
                <WritableText text="Architecting" delay={0.6} /><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#f26522]">
                  <WritableText text="Digital Futures." delay={1.1} />
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-semibold">
                <WritableText text="NTech IT Solution PVT. LTD engineering high-performance ecosystems. We specialize in digital infrastructure that scales at the speed of thought." delay={1.8} />
              </p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-10 py-4 bg-[#f26522] rounded-xl font-black flex items-center justify-center gap-3 group transition-all hover:shadow-[0_0_40px_rgba(242,101,34,0.4)] hover:scale-105">
                  Launch Project <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-4 border border-white/20 bg-white/5 rounded-xl font-black hover:bg-white/10 backdrop-blur-md transition-all">
                  Watch Ecosystem
                </button>
              </motion.div>

              {/* Data Widget */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                className="mt-16 p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-3xl max-w-xs mx-auto lg:mx-0 hidden md:block">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                  <Terminal size={14} className="text-slate-400" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Sys_Status_v2.0</span>
                </div>
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div><span className="text-slate-500">Node:</span> <span className="text-green-400 font-bold tracking-widest">ACTIVE</span></div>
                  <div><span className="text-slate-500">Latency:</span> <span className="text-[#00a8ff] font-bold">0.8ms</span></div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Sliding Images with Scan Effects */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 1.2 }}
              className="flex-1 relative w-full h-[350px] lg:h-[620px]">
              
              <div className="relative w-full h-full rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden border-4 border-white/10 shadow-3xl">
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3]"
                  />
                </AnimatePresence>
                
                {/* Scanline Effect */}
                <motion.div animate={{ y: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent z-10" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-transparent opacity-80" />

                {/* Tech Modules (Floating Cards) */}
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-8 right-8 p-4 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:flex items-center gap-3">
                  <Shield size={20} className="text-[#00a8ff]" />
                  <div>
                    <div className="text-[9px] font-bold text-white tracking-widest uppercase">Secured_Vault</div>
                    <div className="text-[7px] font-mono text-green-500 mt-1 uppercase">Cloud_Active</div>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 left-10 p-4 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:flex items-center gap-3">
                  <Database size={20} className="text-[#f26522]" />
                  <div>
                    <div className="text-[9px] font-bold text-white tracking-widest uppercase">Data_Grid</div>
                    <div className="text-[7px] font-mono text-[#00a8ff] mt-1 uppercase">Nodes_Linked</div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-[#f26522] rounded-tl-[2rem] opacity-50" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-[#00a8ff] rounded-br-[2rem] opacity-50" />
            </motion.div>
          </main>
          
        </motion.div>
      )}
    </div>
  );
};

export default HeroSection;