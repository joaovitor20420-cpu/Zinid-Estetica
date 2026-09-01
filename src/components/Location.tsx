"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

export function Location() {
  return (
    <section id="contato" className="py-32 bg-black relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinid-dark border border-white/10 w-full overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Information Side */}
          <div className="p-12 lg:p-20 flex-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-white">
              ENCONTRE A ZINID
            </h2>

            <div className="space-y-12 mb-16">
              <div className="group">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-600 mb-4 flex items-center gap-3">
                  <MapPin className="w-4 h-4" /> Endereço
                </h3>
                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                  Av. Fausto Ribeiro da Silva, 1257 - Loja 4<br />
                  Bandeirinhas, Betim - MG<br />
                  32654-805
                </p>
              </div>

              <div className="group">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-600 mb-4 flex items-center gap-3">
                  <Phone className="w-4 h-4" /> Contato Direto
                </h3>
                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                  (31) 99599-8390
                </p>
              </div>
            </div>

            <div>
              <a
                href="https://maps.google.com/?q=Av.+Fausto+Ribeiro+da+Silva,+1257+-+Loja+4,+Bandeirinhas,+Betim+-+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black px-10 py-5 font-medium hover:bg-zinc-200 transition-colors w-full sm:w-auto"
              >
                COMO CHEGAR
              </a>
            </div>
          </div>

          {/* Abstract Map Side */}
          <div className="lg:w-5/12 bg-black relative border-l border-white/5 flex items-center justify-center min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-zinid-dark to-black" />
            
            <div className="relative z-10 text-center px-8">
              <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-zinc-500 text-sm tracking-widest uppercase">Betim • MG</p>
            </div>
            
            {/* Architectural Grid pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
