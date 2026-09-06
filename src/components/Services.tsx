"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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

// ── Desktop Card (preserva comportamento original) ──────────────────────
function DesktopServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
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
      className={`group relative min-h-[450px] bg-zinc-900/40 backdrop-blur-md overflow-hidden rounded-2xl cursor-default ${service.colSpan} border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-zinid-blue/50 hover:bg-zinid-blue/5 hover:shadow-[0_0_50px_rgba(0,71,255,0.25)]`}
      style={{ perspective: "1000px" }}
    >
      {/* Imagem com Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[150%] -top-[25%]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-700 ease-out opacity-70 scale-100 group-hover:opacity-90 group-hover:scale-110"
        />
      </motion.div>

      {/* Gradiente suave na base para legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500" />
      
      {/* Luz radial azul no hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,71,255,0.6),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen" />
      {/* Brilho adicional no topo no hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinid-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(0,71,255,0.8)]" />
      
      <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end h-full z-10 pointer-events-none">
        <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-12 group-hover:translate-y-0">
          <h3 className="text-3xl font-bold mb-2 text-white tracking-tight flex items-center justify-between">
            {service.title}
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-zinid-blue/20 flex items-center justify-center border border-zinid-blue shadow-[0_0_20px_rgba(0,71,255,0.6)] transition-all duration-500 ease-out opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-zinid-blue">
              <ArrowRight className="w-5 h-5 text-zinid-blue group-hover:text-white transition-colors duration-300" />
            </div>
          </h3>
          
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="overflow-hidden">
              <p className="text-zinc-400 text-lg leading-relaxed max-w-sm mt-4 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mobile Horizontal Scroll Section ────────────────────────────────────
function MobileServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useGSAP(() => {
    if (!isMobile) return;
    
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    // Calcula o quanto precisa mover horizontalmente
    const totalScrollWidth = track.scrollWidth - window.innerWidth + 48; // 48 = px-6 padding

    gsap.to(track, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.refresh();
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <div ref={sectionRef} className="md:hidden relative w-full overflow-hidden min-h-[85vh] flex flex-col justify-center">
      {/* Track que se move horizontalmente */}
      <div ref={trackRef} className="flex gap-4 px-6 will-change-transform">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="relative w-[80vw] flex-shrink-0 aspect-[3/4] rounded-2xl overflow-hidden"
          >
            {/* Imagem natural — sem filtros, sem overlay azul */}
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
            
            {/* Gradiente suave apenas para legibilidade do texto na base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Conteúdo */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                {service.title}
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de scroll sutil */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {services.map((_, i) => (
          <div key={i} className="w-6 h-[2px] rounded-full bg-white/20" />
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="py-16 md:py-32 bg-[#0C0C12] relative overflow-hidden">
      {/* Luzes ambientes abstratas de fundo */}
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
      </div>

      {/* Mobile: Horizontal scroll-triggered carousel com imagens naturais */}
      <MobileServicesCarousel />

      {/* Desktop: Grid Bento original */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 hidden md:block">
        <div className="grid grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <DesktopServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
