"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 group"
    >
      <div className="absolute inset-0 bg-zinid-blue rounded-full blur group-hover:blur-md transition-all duration-300 opacity-50" />
      <a
        href="https://wa.me/5531995998390"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full shadow-2xl active:scale-95 md:hover:scale-105 transition-transform duration-300"
        aria-label="Fale com a Zinid"
      >
        <MessageCircle size={28} />
        
        {/* Tooltip — desktop only */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-zinc-900 text-zinc-100 text-sm font-medium px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          Fale com a Zinid
        </span>
      </a>
    </motion.div>
  );
}

