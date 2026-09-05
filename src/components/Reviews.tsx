"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Carlos M.",
    text: "O nível de detalhamento é absurdo. Meu carro saiu da Zinid melhor do que quando tirei da concessionária. A vitrificação ficou um espelho.",
    colSpan: "md:col-span-2",
  },
  {
    name: "Ana P.",
    text: "Atendimento impecável e resultado surpreendente. A higienização interna removeu manchas que eu achava impossíveis.",
    colSpan: "md:col-span-1",
  },
  {
    name: "Roberto F.",
    text: "Profissionalismo do início ao fim. Deixei minha BMW para um polimento técnico e o brilho que alcançaram é surreal. Recomendo de olhos fechados.",
    colSpan: "md:col-span-1",
  },
  {
    name: "Thiago S.",
    text: "A melhor estética automotiva de Betim, sem dúvidas. Cuidado extremo com cada detalhe, desde as rodas até o cofre do motor.",
    colSpan: "md:col-span-2",
  }
];

export function Reviews() {
  return (
    <section id="avaliacoes" data-bgcolor="#1A1A1A" className="py-32 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinid-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white"
            >
              O QUE DIZEM <br className="hidden md:block" />
              <span className="text-zinc-600">NOSSOS CLIENTES.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-zinid-blue fill-zinid-blue drop-shadow-[0_0_8px_rgba(0,71,255,0.4)]" />
              ))}
            </div>
            <a
              href="https://www.google.com/search?q=Zinid+Est%C3%A9tica+Automotiva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-white font-medium hover:text-zinid-blue transition-colors flex items-center gap-2 group relative"
            >
              5.0 Avaliações no Google
              <span className="block w-0 h-[1px] bg-zinid-blue transition-all duration-300 group-hover:w-full absolute -bottom-1 left-0" />
            </a>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl relative overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${review.colSpan}`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinid-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Quote className="w-10 h-10 text-white/5 absolute right-6 top-6 rotate-180 group-hover:text-zinid-blue/10 transition-colors duration-500" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-zinid-blue fill-zinid-blue" />
                ))}
              </div>
              
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 mt-auto">
                <div className="w-10 h-10 rounded-full bg-zinid-dark border border-white/10 flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{review.name}</h4>
                  <span className="text-zinc-500 text-sm">Cliente Zinid</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
