"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ShieldCheck, Diamond } from "lucide-react";

export function TrustBar() {
  const items = [
    { type: 'icon', icon: <Star className="w-5 h-5 text-zinid-blue" fill="currentColor" />, text: "5,0 no Google" },
    { type: 'brand', text: "VONIXX" },
    { type: 'icon', icon: <ShieldCheck className="w-5 h-5 text-zinid-blue" />, text: "Atendimento profissional" },
    { type: 'brand', text: "GYEON" },
    { type: 'icon', icon: <Diamond className="w-5 h-5 text-zinid-blue" />, text: "Acabamento de alto padrão" },
    { type: 'brand', text: "CARPRO" },
    { type: 'icon', icon: <MapPin className="w-5 h-5 text-zinid-blue" />, text: "Betim - MG" },
    { type: 'brand', text: "SOFT99" },
  ];

  // Duplicamos o array para garantir o preenchimento da tela sem quebras visuais
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-zinid-dark border-b border-white/5 relative overflow-hidden py-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinid-blue/30 to-transparent" />
      
      {/* Máscaras de gradiente nas bordas (fade edges) */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-zinid-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-zinid-dark to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {marqueeItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center gap-3 px-8 md:px-16"
          >
            {item.type === 'icon' ? (
              <>
                <div className="flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,71,255,0.4)]">{item.icon}</div>
                <span className="text-sm font-medium text-zinc-400 tracking-wide whitespace-nowrap">{item.text}</span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-black text-white/10 tracking-widest uppercase hover:text-white/30 transition-colors duration-300">
                {item.text}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
