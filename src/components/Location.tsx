"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export function Location() {
  return (
    <section id="contato" className="py-32 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-zinid-navy/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-zinid-dark/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-white/10 rounded-2xl w-full overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-zinid-blue/5"
        >
          {/* Information Side */}
          <div className="p-10 lg:p-20 flex-1 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinid-blue via-zinid-navy to-transparent opacity-50" />
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-white"
            >
              ENCONTRE A <span className="text-zinid-blue">ZINID</span>
            </motion.h2>

            <div className="space-y-12 mb-16">
              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute -inset-x-6 -inset-y-4 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-zinid-blue" /> Endereço
                </h3>
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light group-hover:text-white transition-colors">
                  Av. Fausto Ribeiro da Silva, 1257 - Loja 4<br />
                  Bandeirinhas, Betim - MG<br />
                  <span className="text-zinc-500 text-lg">32654-805</span>
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute -inset-x-6 -inset-y-4 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinid-blue" /> Contato Direto
                </h3>
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light group-hover:text-white transition-colors">
                  (31) 99599-8390
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <a
                href="https://maps.google.com/?q=Av.+Fausto+Ribeiro+da+Silva,+1257+-+Loja+4,+Bandeirinhas,+Betim+-+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-white text-black px-10 py-5 font-semibold text-sm tracking-wide overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  COMO CHEGAR <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-zinid-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
            </motion.div>
          </div>

          {/* Abstract Map Side */}
          <div className="lg:w-5/12 bg-[#050505] relative border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center min-h-[400px] overflow-hidden group">
            {/* Architectural Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" 
              style={{ 
                backgroundImage: "linear-gradient(rgba(0,71,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,71,255,1) 1px, transparent 1px)", 
                backgroundSize: "40px 40px" 
              }} 
            />
            
            {/* Dynamic radar rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 2, 3], opacity: [0.5, 0, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border border-zinid-blue/40 rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 2, 3], opacity: [0.5, 0, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute w-32 h-32 border border-zinid-blue/20 rounded-full"
              />
            </div>

            <div className="relative z-10 text-center px-8 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-zinid-blue/10 backdrop-blur-md border border-zinid-blue/30 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,71,255,0.15)]">
                  <MapPin className="w-8 h-8 text-zinid-blue" />
                </div>
                {/* Ping animation behind pin */}
                <div className="absolute inset-0 bg-zinid-blue/30 rounded-full animate-ping opacity-20" />
              </div>
              <p className="text-zinc-400 text-sm tracking-[0.3em] font-medium uppercase">Betim • MG</p>
            </div>
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
