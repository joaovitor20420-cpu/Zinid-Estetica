"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ShieldCheck, Diamond } from "lucide-react";

export function TrustBar() {
  const items = [
    { icon: <Star className="w-5 h-5 text-zinid-blue drop-shadow-[0_0_8px_rgba(0,71,255,0.4)]" fill="currentColor" />, text: "5,0 no Google" },
    { icon: <ShieldCheck className="w-5 h-5 text-zinid-blue drop-shadow-[0_0_8px_rgba(0,71,255,0.4)]" />, text: "Atendimento profissional" },
    { icon: <Diamond className="w-5 h-5 text-zinid-blue drop-shadow-[0_0_8px_rgba(0,71,255,0.4)]" />, text: "Acabamento de alto padrão" },
    { icon: <MapPin className="w-5 h-5 text-zinid-blue drop-shadow-[0_0_8px_rgba(0,71,255,0.4)]" />, text: "Betim - MG" },
  ];

  // Duplicamos o array para garantir o preenchimento da tela sem quebras visuais
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-zinid-dark border-b border-white/5 relative overflow-hidden py-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinid-blue/30 to-transparent" />
      
      {/* Máscaras de gradiente nas bordas (fade edges) */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-zinid-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-zinid-dark to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {marqueeItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center gap-3 px-8 md:px-16"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="text-sm font-medium text-zinc-400 tracking-wide whitespace-nowrap">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
