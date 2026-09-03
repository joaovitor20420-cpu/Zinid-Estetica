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
          <div className="p-10 lg:p-20 flex-1 flex flex-col justify-center relative z-20">
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

          {/* Map Side */}
          <div className="lg:w-5/12 relative border-t lg:border-t-0 lg:border-l border-white/5 min-h-[400px] bg-[#050505] group overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5259929281787!2d-44.179375!3d-19.986422999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6c1004149959f%3A0x6bbaaa3b0be306!2sAv.%20Fausto%20Ribeiro%20da%20Silva%2C%201257%20-%20Bandeirinhas%2C%20Betim%20-%20MG%2C%2032654-805!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(1.1) hue-rotate(180deg)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700"
            />
            {/* Overlay Gradient to blend with the container */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-zinc-950/80 to-transparent hidden lg:block" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950/80 to-transparent lg:hidden" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
