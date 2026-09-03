"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Pacote Venda",
    price: "Consulte",
    description: "Ideal para valorizar o veículo antes da venda.",
    features: [
      "Lavagem detalhada externa",
      "Higienização interna básica",
      "Revitalização de plásticos externos",
      "Enceramento comercial"
    ],
    highlight: false
  },
  {
    name: "Proteção Máxima",
    price: "Premium",
    description: "A proteção definitiva para quem exige o melhor.",
    features: [
      "Polimento técnico",
      "Vitrificação de pintura (até 3 anos)",
      "Higienização interna profunda",
      "Hidratação de bancos de couro",
      "Detalhamento de motor"
    ],
    highlight: true
  },
  {
    name: "Carro Zero",
    price: "Especial",
    description: "Proteja seu veículo novo desde o primeiro dia.",
    features: [
      "Lavagem técnica",
      "Descontaminação de pintura",
      "Aplicação de selante sintético",
      "Proteção de plásticos internos"
    ],
    highlight: false
  }
];

export function Packages() {
  return (
    <section id="pacotes" className="py-32 bg-black relative border-y border-white/5 overflow-hidden">
      {/* Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinid-blue/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
           <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-white"
          >
            NOSSOS <span className="text-zinid-blue">PACOTES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Soluções completas desenhadas para diferentes necessidades, sempre com o padrão de qualidade absoluto Zinid.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 ${
                pkg.highlight 
                  ? "bg-zinc-900 border border-zinid-blue shadow-[0_0_40px_rgba(0,71,255,0.15)] lg:-translate-y-4 hover:shadow-[0_0_60px_rgba(0,71,255,0.25)]" 
                  : "bg-zinc-950/50 backdrop-blur-sm border border-white/5"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinid-blue text-white text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 px-6 rounded-full shadow-[0_0_20px_rgba(0,71,255,0.4)]">
                  Mais Escolhido
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{pkg.name}</h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed h-12 mb-6 font-light">{pkg.description}</p>
              
              <div className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-8 tracking-tighter">
                {pkg.price}
              </div>
              
              <ul className="space-y-4 mb-10 min-h-[220px]">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-zinid-blue flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href="https://wa.me/5531995998390"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 text-center text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                  pkg.highlight 
                    ? "bg-white text-black hover:bg-zinc-200" 
                    : "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                }`}
              >
                Solicitar Orçamento
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
