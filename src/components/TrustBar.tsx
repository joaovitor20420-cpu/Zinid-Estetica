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

  return (
    <section className="bg-zinid-dark border-b border-white/5 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinid-blue/30 to-transparent" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 py-8 gap-6 md:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="text-sm font-medium text-zinc-400 tracking-wide">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
