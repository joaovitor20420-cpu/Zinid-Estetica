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
  const wheel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // A Roda Gigante 3D (Cylinder Scroll)
    const anglePerStep = 360 / steps.length; // 90 graus por card
    const totalRotation = anglePerStep * (steps.length - 1); // 270 graus totais

    gsap.to(wheel.current, {
      rotationX: totalRotation,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=400%", // Espaço massivo para girar as 4 etapas suavemente
        pin: true,
        scrub: 1, // Inércia macia de 1 segundo
        snap: 1 / (steps.length - 1), // O ímã que puxa o card para o centro exato quando você para de rolar
      }
    });

  }, { scope: container });

  const radius = 250; // O tamanho do "raio" da roda gigante (distância do centro)
  const anglePerStep = 360 / steps.length;

  return (
    <section ref={container} className="py-20 h-screen bg-black relative overflow-hidden border-t border-white/5 flex flex-col justify-center">
      {/* Luz ambiente de Neon Azul */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-zinid-blue/15 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Coluna Esquerda: Estática (Toda a seção é travada) */}
        <div className="lg:w-1/3 w-full">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
            COMO <br className="hidden lg:block" />
            <span className="text-zinid-blue drop-shadow-[0_0_15px_rgba(0,71,255,0.2)]">FUNCIONA.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">
            Da avaliação meticulosa até a entrega, nosso método garante resultados de padrão internacional para o seu carro. Role para avançar.
          </p>
        </div>

        {/* Coluna Direita: O Motor 3D da Roda Gigante */}
        <div 
          className="lg:w-2/3 relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
          style={{ perspective: "1500px" }} // Profundidade 3D
        >
          <div 
            ref={wheel} 
            className="relative w-full max-w-lg h-[250px]"
            style={{ transformStyle: "preserve-3d" }} // Mantém os filhos no espaço 3D real
          >
            {steps.map((step, index) => {
              const rotateX = -index * anglePerStep;
              return (
                <div 
                  key={step.num} 
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                  style={{
                    // Cada card é girado um pouco mais para trás, e empurrado para a borda da roda (Z)
                    transform: `rotateX(${rotateX}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden", // Esconde o card quando ele girar para as costas da roda
                  }}
                >
                  {/* Card de Vidro (Glassmorphism) */}
                  <div className="bg-zinid-dark/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:border-zinid-blue/50 hover:shadow-[0_0_30px_rgba(0,71,255,0.15)]">
                    
                    {/* Número Gigante como Marca d'água */}
                    <div className="absolute -right-6 -top-12 text-[160px] font-bold text-white/[0.03] pointer-events-none select-none">
                      {step.num}
                    </div>

                    <div className="relative z-10 flex flex-col gap-4">
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
