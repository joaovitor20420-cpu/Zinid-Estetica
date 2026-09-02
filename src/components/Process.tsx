"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const steps = [
  {
    num: "01",
    title: "Avaliação",
    description: "Entendemos as necessidades e o estado atual do seu veículo com precisão milimétrica.",
  },
  {
    num: "02",
    title: "Preparação",
    description: "Limpeza inicial rigorosa e descontaminação para garantir que a superfície base esteja impecável.",
  },
  {
    num: "03",
    title: "Detalhamento",
    description: "Aplicação das técnicas mais adequadas para cada material: couro, plástico, pintura ou cromo.",
  },
  {
    num: "04",
    title: "Entrega",
    description: "Inspeção final sob luzes de contraste e entrega do seu veículo em estado de exposição.",
  },
];

export function Process() {
  const container = useRef<HTMLElement>(null);
  const deck = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.process-card');
    
    // Configuração inicial (TasteSkill Stack)
    // Slot 0 (Frente): scale 1, y 0, opacidade 1
    // Slot 1 (Atrás): scale 0.92, y -45, opacidade 0.75
    // Slot N... escalonado para trás
    gsap.set(cards, {
      scale: (i) => 1 - (i * 0.08),
      y: (i) => -i * 45,
      opacity: (i) => 1 - (i * 0.25),
      zIndex: (i) => 40 - i * 10,
      transformOrigin: "bottom center"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=300%", // 3 transições
        pin: true,
        scrub: 1, // Smoothing ideal para efeito de cartas flutuantes
        snap: 1 / (steps.length - 1), // Ímã
      }
    });

    // Constrói a linha do tempo de ciclagem do deck
    for (let s = 0; s < steps.length - 1; s++) {
      const stepTl = gsap.timeline();
      
      cards.forEach((card, i) => {
        const currentSlot = i - s; 
        const nextSlot = i - (s + 1);
        
        if (currentSlot === 0) {
           // O card da frente é descartado (cai para baixo/frente e some)
           stepTl.to(card, {
             y: 200,
             scale: 1.1,
             opacity: 0,
             rotateZ: -6, // Rotação dramática de descarte
             ease: "power2.inOut"
           }, 0);
        } else if (currentSlot > 0) {
           // Os cards de trás avançam um slot para a frente
           stepTl.to(card, {
             scale: 1 - (nextSlot * 0.08),
             y: -nextSlot * 45,
             opacity: 1 - (nextSlot * 0.25),
             zIndex: 40 - nextSlot * 10,
             ease: "power2.inOut"
           }, 0);
        }
      });
      
      tl.add(stepTl);
    }

    setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

  }, { scope: container });

  return (
    <section ref={container} className="py-20 h-screen bg-black relative overflow-hidden border-t border-white/5 flex flex-col justify-center">
      {/* Luz ambiente de Neon Azul */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-zinid-blue/15 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center h-full">
        
        {/* Coluna Esquerda: Texto Estático */}
        <div className="lg:w-1/3 w-full mt-20 lg:mt-0">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
            COMO <br className="hidden lg:block" />
            <span className="text-zinid-blue drop-shadow-[0_0_15px_rgba(0,71,255,0.2)]">FUNCIONA.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">
            Da avaliação meticulosa até a entrega, nosso método garante resultados de padrão internacional para o seu carro. Role para avançar.
          </p>
        </div>

        {/* Coluna Direita: O Deck 3D de Cards (TasteSkill Style) */}
        <div 
          className="lg:w-2/3 relative w-full h-[400px] md:h-[500px] flex items-end justify-center pb-10"
          style={{ perspective: "1500px" }}
        >
          <div ref={deck} className="relative w-full max-w-lg h-[280px]">
            {steps.map((step) => {
              return (
                <div 
                  key={step.num} 
                  className="process-card absolute inset-0 w-full h-full will-change-transform"
                >
                  {/* Card Sólido Premium */}
                  <div className="w-full h-full bg-zinc-950 border border-white/10 p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 flex flex-col justify-center">
                    
                    {/* Número Gigante como Marca d'água */}
                    <div className="absolute -right-6 -top-12 text-[160px] font-bold text-white/[0.02] pointer-events-none select-none">
                      {step.num}
                    </div>

                    <div className="relative z-10 flex flex-col gap-5">
                      {/* Marcador Neon Azul */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border border-zinid-blue flex items-center justify-center text-lg font-mono text-zinid-blue shadow-[0_0_15px_rgba(0,71,255,0.3)]">
                        {step.num}
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
