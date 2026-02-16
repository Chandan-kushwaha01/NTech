"use client";
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Code2, Smartphone, MonitorSmartphone, 
  ShieldCheck, Cpu, Globe, ArrowUpRight, 
  Zap, BarChart3, Fingerprint 
} from 'lucide-react';

// --- Services Data ---
const SERVICES_DATA = [
  {
    title: "Web Architecture",
    description: "Enterprise-grade web systems built for speed, scalability, and high-conversion user journeys.",
    icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
    tag: "Next-Gen"
  },
  {
    title: "Mobile Ecosystems",
    description: "Immersive iOS and Android applications that leverage native hardware for peak performance.",
    icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" />,
    tag: "Hybrid/Native"
  },
  {
    title: "AI & Automation",
    description: "Integrating neural networks and smart automation to optimize complex business workflows.",
    icon: <Cpu className="w-6 h-6 md:w-8 md:h-8" />,
    tag: "Intelligence"
  },
  {
    title: "Cyber Security",
    description: "Military-grade encryption and proactive threat detection to keep your data bulletproof.",
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
    tag: "Secure"
  },
  {
    title: "Digital Analytics",
    description: "Transforming raw data into actionable insights through advanced visualization and tracking.",
    icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />,
    tag: "Growth"
  },
  {
    title: "Cloud Infrastructure",
    description: "Robust DevOps and cloud migration strategies to ensure 99.99% uptime for your platforms.",
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    tag: "DevOps"
  }
];

// --- 3D Tilt Card Component ---
const ServiceCard = ({ service, isDarkMode }: { service: typeof SERVICES_DATA[0], isDarkMode: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        perspective: 1000,
        transformStyle: "preserve-3d" 
      }}
      className={`relative group h-full min-h-[360px] md:min-h-[400px] w-full rounded-[2.5rem] border p-8 md:p-10 transition-colors duration-500 flex flex-col justify-between ${
        isDarkMode 
        ? "bg-white/5 border-white/10 hover:border-[#EF5801]/40" 
        : "bg-white border-slate-200 hover:border-[#EF5801]/20 shadow-xl shadow-slate-200/40"
      }`}
    >
      {/* Floating internal container for Z-index depth */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 space-y-6">
        {/* Tag */}
        <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
          isDarkMode ? "border-white/10 text-white/40 group-hover:text-[#EF5801]" : "border-slate-100 text-slate-400 group-hover:text-[#EF5801]"
        }`}>
          {service.tag}
        </div>

        {/* Icon Container */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#EF5801] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          {service.icon}
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none ${isDarkMode ? "text-white" : "text-[#01346F]"}`}>
            {service.title.split(' ')[0]} <br />
            <span className="text-[#EF5801]">{service.title.split(' ').slice(1).join(' ')}</span>
          </h3>
          <p className={`text-sm md:text-base leading-relaxed font-medium transition-colors ${
            isDarkMode ? "text-white/40 group-hover:text-white/70" : "text-slate-500 group-hover:text-slate-700"
          }`}>
            {service.description}
          </p>
        </div>
      </div>

      {/* Interactive Bottom Section */}
      <div style={{ transform: "translateZ(30px)" }} className="flex items-center justify-between mt-8">
        <span className={`text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? "text-white" : "text-[#01346F]"}`}>
          Explore Service
        </span>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#01346F] text-white flex items-center justify-center group-hover:bg-[#EF5801] transition-colors duration-500">
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        isDarkMode ? "bg-[radial-gradient(circle_at_center,_#EF580110_0%,_transparent_70%)]" : "bg-[radial-gradient(circle_at_center,_#EF580105_0%,_transparent_70%)]"
      }`} />
    </motion.div>
  );
};

// --- Main Services Section ---
const ServicesSection = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  return (
    <section className={`relative py-20 md:py-32 px-6 transition-colors duration-500 overflow-hidden ${
      isDarkMode ? "bg-[#01346F]" : "bg-[#F8FAFC]"
    }`}>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] ${isDarkMode ? "bg-[#EF5801]/10" : "bg-[#EF5801]/5"}`} />
        <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[120px] ${isDarkMode ? "bg-[#024999]/30" : "bg-[#E2E8F0]"}`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
          <div className="max-w-3xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[2px] bg-[#EF5801]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#EF5801]">Capability Stack</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] ${isDarkMode ? "text-white" : "text-[#01346F]"}`}
            >
              We Build The <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF5801] to-orange-400">
                Digital Infrastructure
              </span> <br />
              Of Tomorrow.
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:max-w-sm"
          >
            <p className={`text-sm md:text-base font-medium leading-relaxed mb-6 ${isDarkMode ? "text-white/40" : "text-slate-500"}`}>
              Our multidisciplinary team combines technical rigor with aesthetic precision to deliver software that scales with your ambition.
            </p>
            <div className={`flex items-center gap-4 text-xs font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-[#01346F]"}`}>
              <span className="flex h-2 w-2 rounded-full bg-[#EF5801]" />
              Full-Cycle Development
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <ServiceCard service={service} isDarkMode={isDarkMode} />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-20 md:mt-32 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
        >
          <div className="flex items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
             <Code2 size={32} />
             <Fingerprint size={32} />
             <Cpu size={32} />
          </div>
          <p className={`text-xs md:text-sm font-bold tracking-tight text-center md:text-right ${isDarkMode ? "text-white/50" : "text-slate-400"}`}>
            Have a custom requirement? <br className="md:hidden"/>
            <span className="text-[#EF5801] cursor-pointer hover:underline underline-offset-4 ml-1">Connect with our architects —</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;