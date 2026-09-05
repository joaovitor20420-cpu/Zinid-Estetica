"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const pillars = [
  { 
    num: "01", 
    title: "Detalhamento",
    desc: "Atenção cirúrgica a cantos, grades, emblemas e frestas que limpezas comuns ignoram."
  },
  { 
    num: "02", 
    title: "Qualidade",
    desc: "Utilizamos exclusivamente vitrificadores, cerâmicas e compostos importados de altíssima performance."
  },
  { 
    num: "03", 
    title: "Cuidado",
    desc: "Lavagem técnica criteriosa para garantir zero atrito e total preservação do verniz original."
  },
  { 
    num: "04", 
    title: "Acabamento",
    desc: "O toque final que transforma. Brilho profundo, espelhado e com proteção de longa duração."
  },
];

export function WhyUs() {
  const container = useRef<HTMLElement>(null);
  const marquee = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const bgSphere = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Kinetic Marquee animado pelo scroll
    gsap.to(marquee.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, 
      }
    });

    // Parallax background sphere
    gsap.to(bgSphere.current, {
      y: 500, // Move down significantly as you scroll down
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Fade-in suave para os textos da esquerda
    gsap.fromTo(
      heading.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      pRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pRef.current,
          start: "top 80%",
        }
      }
    );

    // Fade in da barra de progresso
    gsap.fromTo(
      progressWrapper.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pRef.current,
          start: "top 80%",
        }
      }
    );

    // Animação da barra de progresso em si
    gsap.to(progressBar.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Entrada escalonada dos pilares na direita
    gsap.utils.toArray(".pillar-row").forEach((row: any) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} id="sobre" data-bgcolor="#161618" className="py-16 md:py-32 bg-transparent border-y border-white/5 relative overflow-hidden">
      
      {/* Background Parallax Sphere */}
      <div ref={bgSphere} className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-zinid-blue/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Kinetic Marquee Background */}
      <div className="absolute top-32 left-0 w-[200vw] overflow-hidden whitespace-nowrap pointer-events-none opacity-[0.02] flex items-center select-none">
        <div ref={marquee} className="flex gap-4 text-[150px] font-bold tracking-tighter text-white w-max">
          <span>ESTÉTICA AUTOMOTIVA PREMIUM • CUIDADO ABSOLUTO •</span>
          <span>ESTÉTICA AUTOMOTIVA PREMIUM • CUIDADO ABSOLUTO •</span>
          <span>ESTÉTICA AUTOMOTIVA PREMIUM • CUIDADO ABSOLUTO •</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-24">
        
        {/* Coluna Esquerda (Sticky) */}
        <div className="lg:w-5/12 flex flex-col">
          <div className="lg:sticky lg:top-40">
            {/* Tag / Eyebrow */}
            <div className="inline-block px-3 py-1 mb-6 border border-zinid-blue/30 rounded-full bg-zinid-blue/5 backdrop-blur-sm">
              <span className="text-zinid-blue text-xs font-bold tracking-widest uppercase">
                A Filosofia Zinid
              </span>
            </div>

            <h2 ref={heading} className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6 md:mb-8 text-white opacity-0">
              MAIS DO QUE <br /> LIMPEZA.
              <br />
              <span className="text-zinid-blue drop-shadow-[0_0_15px_rgba(0,71,255,0.2)]">
                É CUIDADO.
              </span>
            </h2>
            
            <p ref={pRef} className="text-lg md:text-xl text-zinc-400 max-w-sm leading-relaxed font-light opacity-0">
              Na Zinid, cada detalhe importa. Nosso objetivo é entregar um resultado que você perceba no primeiro olhar, combinando técnicas avançadas com perfeccionismo absurdo.
            </p>

            {/* Scroll Progress Indicator */}
            <div ref={progressWrapper} className="hidden lg:flex items-start gap-4 mt-16 opacity-0">
              <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden relative">
                <div ref={progressBar} className="absolute top-0 left-0 w-full h-full bg-zinid-blue origin-top scale-y-0" />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                 <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">
                   Nossos Pilares
                 </span>
                 <span className="text-zinc-600 text-[10px] uppercase tracking-widest">
                   Role para descobrir
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita (Scrollável) */}
        <div className="lg:w-7/12 flex flex-col pt-4 lg:pt-32 pb-10 lg:pb-20">
          <div className="flex flex-col">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar.num} 
                className={`pillar-row flex flex-col py-8 md:py-16 border-white/10 group cursor-default relative overflow-hidden opacity-0 ${index === 0 ? 'border-t-0' : 'border-t'}`}
              >
                {/* Highlight Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinid-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-xl" />
                
                <div className="flex justify-between items-baseline mb-6 relative z-10">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-300 transition-colors duration-500 group-hover:text-white">
                    {pillar.title}
                  </h3>
                  <span className="text-lg md:text-2xl font-mono font-medium text-zinc-600 transition-colors duration-500 group-hover:text-zinid-blue">
                    {pillar.num}
                  </span>
                </div>
                
                <p className="text-base md:text-lg text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500 relative z-10 max-w-md pr-8 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
