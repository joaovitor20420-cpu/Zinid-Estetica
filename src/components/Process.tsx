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
  const leftCol = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only pin on desktop to avoid weird mobile scrolling issues
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftCol.current,
        pinSpacing: false,
      });
    });

    // Animate the timeline line
    gsap.fromTo(
      ".timeline-progress",
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: track.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Stagger in steps as they enter view
    gsap.utils.toArray(".process-step").forEach((step: any) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: 20 },
        {
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
    
    return () => mm.revert();
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          
          {/* Left Column (Pinned by GSAP) */}
          <div className="lg:w-1/3 h-fit w-full" ref={leftCol}>
            <div className="lg:pt-40">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
                COMO <br className="hidden lg:block" />
                <span className="text-zinc-600">FUNCIONA.</span>
              </h2>
              <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">
                Da avaliação meticulosa até a entrega, nosso método garante resultados de padrão internacional para o seu carro.
              </p>
            </div>
          </div>

          {/* Right Column Timeline */}
          <div className="lg:w-2/3 relative lg:pt-40 pb-20 w-full">
            {/* Timeline Track */}
            <div ref={track} className="absolute left-[27px] md:left-[39px] top-40 bottom-20 w-[2px] bg-white/5" />
            
            {/* Timeline Progress */}
            <div className="timeline-progress absolute left-[27px] md:left-[39px] top-40 w-[2px] bg-white origin-top" />

            <div className="flex flex-col gap-12 md:gap-16">
              {steps.map((step) => (
                <div key={step.num} className="process-step relative pl-16 md:pl-24 group opacity-0">
                  {/* Node */}
                  <div className="absolute left-0 md:left-2 top-0 md:top-1 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border border-white/10 flex items-center justify-center text-sm font-mono text-zinc-500 z-10 transition-all duration-500 group-hover:border-white group-hover:text-white group-hover:scale-110">
                    {step.num}
                  </div>
                  
                  {/* Content Glass Card */}
                  <div className="bg-zinid-dark/50 backdrop-blur-md border border-white/5 p-8 md:p-12 relative overflow-hidden transition-colors duration-500 group-hover:bg-zinid-dark group-hover:border-white/10">
                    {/* Watermark Number */}
                    <div className="absolute -right-6 -top-12 text-[160px] font-bold text-white/[0.02] pointer-events-none select-none transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-x-4">
                      {step.num}
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
