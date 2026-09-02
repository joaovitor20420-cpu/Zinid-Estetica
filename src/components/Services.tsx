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
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

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
      className={`group relative min-h-[400px] md:min-h-[450px] bg-zinid-dark overflow-hidden rounded-2xl cursor-default ${service.colSpan} border border-white/5 hover:border-zinid-blue/40 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(0,71,255,0.15)]`}
      style={{ perspective: "1000px" }}
    >
      {/* Imagem com Parallax e Zoom no hover */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-700 ease-out grayscale-[0.8] opacity-30 group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-110"
        />
      </motion.div>

      {/* Gradiente escuro para contraste do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Luz radial azul no hover no fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,71,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end h-full z-10 pointer-events-none">
        <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-y-12 group-hover:translate-y-0">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white tracking-tight flex items-center justify-between">
            {service.title}
            {/* Ícone de Seta em Círculo Neon */}
            <div className="w-12 h-12 rounded-full bg-zinid-blue/10 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 hidden md:flex border border-zinid-blue/30 shadow-[0_0_15px_rgba(0,71,255,0.3)]">
              <ArrowRight className="w-5 h-5 text-zinid-blue" />
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
    <section id="servicos" className="py-32 bg-zinid-black relative overflow-hidden">
      {/* Luz ambiente abstrata de fundo */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-zinid-blue/5 rounded-[100%] blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 text-white"
          >
            DETALHAMENTO QUE <br className="hidden md:block" />
            <span className="text-zinc-600">FAZ A DIFERENÇA.</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
