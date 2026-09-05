"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Higienização Automotiva",
    description: "Limpeza profunda de bancos, carpetes e teto, eliminando odores e bactérias pela raiz.",
    image: "/service_interior_deep.jpg",
    colSpan: "md:col-span-2",
  },
  {
    title: "Limpeza Detalhada",
    description: "Foco nos mínimos detalhes, cantos e frestas que a lavagem comum não alcança.",
    image: "/service_detail_brush.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Cuidados Externos",
    description: "Lavagem técnica, descontaminação de pintura e aplicação de proteção.",
    image: "/service_exterior_paint.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Cuidados Internos",
    description: "Revitalização de plásticos e hidratação rigorosa de bancos de couro.",
    image: "/service_interior_leather.jpg",
    colSpan: "md:col-span-2",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax suave na imagem baseado no scroll da página
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Aumentei o range do parallax para ficar bem mais visível
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ y: -10 }}
      className={`group relative min-h-[300px] md:min-h-[450px] bg-zinc-900/40 backdrop-blur-md overflow-hidden rounded-2xl cursor-default ${service.colSpan} border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] md:border-white/5 transition-all duration-500 md:hover:border-zinid-blue/50 md:hover:bg-zinid-blue/5 md:hover:shadow-[0_0_50px_rgba(0,71,255,0.25)]`}
      style={{ perspective: "1000px" }}
    >
      {/* Imagem com Parallax mais forte e Zoom no hover */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[150%] -top-[25%]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-700 ease-out grayscale-0 opacity-60 scale-105 md:grayscale-[0.8] md:opacity-30 md:scale-100 md:group-hover:grayscale-0 md:group-hover:opacity-70 md:group-hover:scale-110"
        />
      </motion.div>

      {/* Gradiente escuro para contraste do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Luz radial azul mais forte e brilhante */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,71,255,0.6),transparent_70%)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen" />
      {/* Brilho adicional no topo no hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinid-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(0,71,255,0.8)]" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end h-full z-10 pointer-events-none">
        <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-y-12 group-hover:translate-y-0">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white tracking-tight flex items-center justify-between">
            {service.title}
            {/* Ícone de Seta em Círculo Neon MUITO MAIS BRILHANTE */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-zinid-blue/20 flex items-center justify-center border border-zinid-blue shadow-[0_0_20px_rgba(0,71,255,0.6)] transition-all duration-500 ease-out opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 group-hover:bg-zinid-blue">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white md:text-zinid-blue md:group-hover:text-white transition-colors duration-300" />
            </div>
          </h3>
          
          {/* Expanding Text for Desktop, Static for Mobile */}
          <div className="md:grid md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="md:overflow-hidden">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-sm mt-4 md:opacity-0 transition-opacity duration-500 delay-100 md:group-hover:opacity-100">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicos" data-bgcolor="#0C0C12" className="py-16 md:py-32 bg-transparent relative overflow-hidden">
      {/* Luzes ambientes abstratas de fundo com muito mais brilho */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-zinid-blue/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-zinid-blue/15 rounded-full blur-[150px] pointer-events-none translate-y-1/2 translate-x-1/3 mix-blend-screen" />
      {/* Linha de brilho superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinid-blue/50 to-transparent shadow-[0_0_20px_rgba(0,71,255,0.5)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-12 md:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-white flex flex-col items-start"
          >
            <span className="overflow-hidden pb-1 md:pb-2">
              <motion.span 
                variants={{ hidden: { y: "100%", rotateX: -20, opacity: 0 }, visible: { y: 0, rotateX: 0, opacity: 1 } }} 
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
                className="inline-block origin-bottom"
              >
                DETALHAMENTO QUE
              </motion.span>
            </span>
            <span className="overflow-hidden pb-1 md:pb-2">
              <motion.span 
                variants={{ hidden: { y: "100%", rotateX: -20, opacity: 0 }, visible: { y: 0, rotateX: 0, opacity: 1 } }} 
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-zinid-blue via-blue-400 to-white origin-bottom drop-shadow-[0_0_15px_rgba(0,71,255,0.4)]"
              >
                FAZ A DIFERENÇA.
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-[45ch] leading-relaxed font-light"
          >
            Cada serviço é realizado com atenção aos detalhes para devolver ao seu veículo uma aparência impecável. Sem atalhos, apenas resultado.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
