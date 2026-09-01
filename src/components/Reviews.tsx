"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Reviews() {
  return (
    <section id="avaliacoes" className="py-32 bg-zinid-black border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-2 mb-10"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-12 h-12 md:w-16 md:h-16 text-white fill-white" />
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-12 text-zinc-200"
        >
          5.0
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://www.google.com/search?q=Zinid+Est%C3%A9tica+Automotiva"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-lg text-white font-medium hover:text-zinc-300 transition-colors group"
          >
            Avaliações verificadas no Google
            <span className="block w-6 h-[1px] bg-white group-hover:bg-zinc-300 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
