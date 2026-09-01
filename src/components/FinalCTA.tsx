"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FinalCTA() {
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images1.jpg"
          alt="Detalhe automotivo Zinid CTA"
          fill
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8"
        >
          SEU CARRO MERECE <br className="hidden sm:block" />
          <span className="text-zinid-silver">O MELHOR CUIDADO.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto"
        >
          Agende seu atendimento com a Zinid Estética Automotiva.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://wa.me/5531995998390"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-10 py-5 text-lg font-medium hover:scale-105 hover:bg-zinc-100 transition-all duration-300"
          >
            AGENDAR PELO WHATSAPP
          </a>
        </motion.div>
      </div>
    </section>
  );
}
