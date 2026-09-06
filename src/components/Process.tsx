"use client";

import { useRef } from "react";
import Image from "next/image";
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
    image: "/gallery_1.jpg", // Utilizando imagens que provavelmente já temos como placeholder
  },
  {
    num: "02",
    title: "Preparação",
    description: "Limpeza inicial rigorosa e descontaminação para garantir que a superfície base esteja impecável.",
    image: "/gallery_2.jpg",
  },
  {
    num: "03",
    title: "Detalhamento",
    description: "Aplicação das técnicas mais adequadas para cada material: couro, plástico, pintura ou cromo.",
    image: "/gallery_3.jpg",
  },
  {
    num: "04",
    title: "Entrega",
    description: "Inspeção final sob luzes de contraste e entrega do seu veículo em estado de exposição.",
    image: "/gallery_4.jpg",
  },
];

export function Process() {
  const container = useRef<HTMLElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const processProgressBar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.process-card');
    
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
        end: "+=300%",
        pin: true,
        scrub: 1, 
        snap: 1 / (steps.length - 1), 
        onUpdate: (self) => {
          // Atualiza o menu lateral baseado no progresso
          const index = Math.round(self.progress * (steps.length - 1));
          const navItems = document.querySelectorAll('.step-nav-item');
          
          navItems.forEach((el, i) => {
             const indicator = el.querySelector('.nav-indicator');
             if (i === index) {
                el.classList.add('text-white', 'opacity-100');
                el.classList.remove('text-zinc-600', 'opacity-50');
                if (indicator) {
                  indicator.classList.add('bg-zinid-blue', 'scale-100', 'shadow-[0_0_15px_rgba(0,71,255,0.8)]');
                  indicator.classList.remove('bg-zinc-800', 'scale-50', 'shadow-none');
                }
             } else {
                el.classList.add('text-zinc-600', 'opacity-50');
                el.classList.remove('text-white', 'opacity-100');
                if (indicator) {
                  indicator.classList.add('bg-zinc-800', 'scale-50', 'shadow-none');
                  indicator.classList.remove('bg-zinid-blue', 'scale-100', 'shadow-[0_0_15px_rgba(0,71,255,0.8)]');
                }
             }
          });
        }
      }
    });

    // Estado inicial do menu lateral
    const navItems = document.querySelectorAll('.step-nav-item');
    if(navItems.length > 0) {
       navItems[0].classList.add('text-white', 'opacity-100');
       navItems[0].classList.remove('text-zinc-600', 'opacity-50');
       const ind = navItems[0].querySelector('.nav-indicator');
       if(ind) {
         ind.classList.add('bg-zinid-blue', 'scale-100', 'shadow-[0_0_15px_rgba(0,71,255,0.8)]');
         ind.classList.remove('bg-zinc-800', 'scale-50', 'shadow-none');
       }
    }

    for (let s = 0; s < steps.length - 1; s++) {
      const stepTl = gsap.timeline();
      
      cards.forEach((card, i) => {
        const currentSlot = i - s; 
        const nextSlot = i - (s + 1);
        
        if (currentSlot === 0) {
           stepTl.to(card, {
             y: 200,
             scale: 1.1,
             opacity: 0,
             rotateZ: -6, 
             ease: "power2.inOut"
           }, 0);
        } else if (currentSlot > 0) {
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

    gsap.to(processProgressBar.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=300%",
        scrub: 1, 
      }
    });

    // Remove the timeout, let GSAP handle it naturally
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, { scope: container });

  return (
    <section ref={container} id="processos" className="py-10 md:py-20 min-h-[100vh] bg-black relative overflow-hidden border-t border-white/5 flex flex-col justify-center">
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-zinid-blue/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-24 items-center h-full">
        
        {/* Lado Esquerdo - Textos e Navegação */}
        <div className="lg:w-5/12 w-full mt-16 lg:mt-0 flex flex-col justify-center h-full">
          <div className="mb-6 lg:mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-4 md:mb-6 leading-[1.1]">
              COMO <br className="hidden lg:block" />
              <span className="text-zinid-blue drop-shadow-[0_0_15px_rgba(0,71,255,0.2)]">FUNCIONA.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">
              Da avaliação meticulosa até a entrega, nosso método garante resultados de padrão internacional para o seu carro.
            </p>
          </div>

          {/* Sidebar de Progresso Interativo (Visível apenas em Desktop para poupar espaço mobile) */}
          <div className="hidden lg:flex flex-col gap-8 relative ml-2">
            <div className="absolute left-2.5 top-3 bottom-3 w-[1px] bg-white/10 z-0" />
            <div ref={processProgressBar} className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-zinid-blue z-0 origin-top scale-y-0 shadow-[0_0_15px_rgba(0,71,255,0.5)]" />
            {steps.map((step, i) => (
              <div key={i} className="step-nav-item flex items-center gap-6 transition-colors duration-300 opacity-50 text-zinc-600 relative z-10">
                <div className="nav-indicator w-5 h-5 rounded-full bg-zinc-800 border-4 border-black relative z-10 scale-50 transition-all duration-300" />
                <h4 className="text-2xl font-bold tracking-tight">{step.num}. {step.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Direito - Deck de Cartões */}
        <div 
          className="lg:w-7/12 relative w-full h-[340px] md:h-[600px] flex items-end justify-center lg:justify-end pb-6 md:pb-10"
          style={{ perspective: "1500px" }}
        >
          <div ref={deck} className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[280px] md:h-[400px]">
            {steps.map((step) => {
              return (
                <div 
                  key={step.num} 
                  className="process-card absolute inset-0 w-full h-full will-change-transform"
                >
                  <div className="w-full h-full bg-black border border-white/10 relative overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-end group">
                    
                    {/* Imagem de Fundo (Placeholder utilizando as imagens da galeria) */}
                    <div className="absolute inset-0 z-0">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        fill 
                        className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" 
                      />
                      {/* Gradiente forte para garantir legibilidade do texto na parte inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </div>

                    {/* Número gigante ao fundo (marca d'água) */}
                    <div className="absolute -right-6 -top-12 text-[180px] font-bold text-white/[0.04] pointer-events-none select-none z-0">
                      {step.num}
                    </div>
                    
                    {/* Conteúdo Principal */}
                    <div className="relative z-10 flex flex-col gap-4 p-8 md:p-10">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-md border border-zinid-blue/50 flex items-center justify-center text-base font-mono text-zinid-blue shadow-[0_0_20px_rgba(0,71,255,0.3)]">
                        {step.num}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-2">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-sm drop-shadow-lg">
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
