"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect on the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-40 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-bottom"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <Image
          src="/images1.jpg"
          alt="Detalhe automotivo Zinid CTA"
          fill
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        {/* Blue color wash over the image */}
        <div className="absolute inset-0 bg-zinid-blue/10 mix-blend-color" />
      </motion.div>
      
      {/* Gradients to blend smoothly with sections above and below */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] z-0 opacity-90" />

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinid-blue/30 bg-zinid-blue/10 backdrop-blur-md text-zinid-blue text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,71,255,0.2)]">
              Eleve o nível do seu veículo
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 text-white drop-shadow-2xl"
          >
            SEU CARRO MERECE <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-zinid-blue to-zinc-400 bg-clip-text text-transparent">
              O MELHOR CUIDADO.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A excelência automotiva que você procura, com o requinte e a atenção aos mínimos detalhes que a Zinid oferece.
          </motion.p>

          <motion.div variants={itemVariants} className="relative group">
            {/* Glow effect behind button */}
            <div className="absolute -inset-1 bg-gradient-to-r from-zinid-blue to-zinid-navy rounded-lg blur-lg opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
            
            <a
              href="https://wa.me/5531995998390"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-6 text-lg font-bold tracking-wide overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10">AGENDAR PELO WHATSAPP</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform text-zinid-blue" />
              
              {/* Shine sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinid-blue/10 to-transparent z-0" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
