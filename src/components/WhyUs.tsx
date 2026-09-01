"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const pillars = [
  { num: "01", title: "Detalhamento" },
  { num: "02", title: "Qualidade" },
  { num: "03", title: "Cuidado" },
  { num: "04", title: "Acabamento" },
];

export function WhyUs() {
  const container = useRef<HTMLElement>(null);
  const marquee = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Kinetic Marquee driven by scroll velocity
    gsap.to(marquee.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // lag for smoothness
      }
    });

    // Heading Parallax and Fade
    gsap.fromTo(
      heading.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heading.current,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
        }
      }
    );

    gsap.fromTo(
      pRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pRef.current,
          start: "top 85%",
        }
      }
    );

    // Staggered Pillars Entrance
    gsap.utils.toArray(".pillar-row").forEach((row: any) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
    <section ref={container} id="sobre" className="py-40 bg-black border-y border-white/5 relative overflow-hidden">
      
      {/* Kinetic Marquee Background */}
      <div className="absolute top-32 left-0 w-[200vw] overflow-hidden whitespace-nowrap pointer-events-none opacity-[0.03] flex items-center select-none">
        <div ref={marquee} className="flex gap-4 text-[150px] font-bold tracking-tighter text-white w-max">
          <span>ESTÉTICA AUTOMOTIVA PREMIUM • CUIDADO ABSOLUTO •</span>
          <span>ESTÉTICA AUTOMOTIVA PREMIUM • CUIDADO ABSOLUTO •</span>
          <span>ESTÉTICA AUTOMOTIVA PREMIUM • CUIDADO ABSOLUTO •</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-5xl mb-32">
          <h2 ref={heading} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-12 text-white">
            MAIS DO QUE LIMPEZA.
            <br />
            <span className="text-zinc-600">É CUIDADO COM SEU CARRO.</span>
          </h2>
          
          <p ref={pRef} className="text-2xl md:text-3xl lg:text-4xl text-zinc-400 max-w-[35ch] leading-snug font-light opacity-0">
            Na Zinid, cada detalhe importa. Nosso objetivo é entregar um resultado que você perceba no primeiro olhar, combinando técnicas avançadas com perfeccionismo.
          </p>
        </div>

        {/* Scaled Typographic List */}
        <div className="flex flex-col border-t border-white/10">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="pillar-row flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-10 md:py-16 border-b border-white/10 group cursor-default relative overflow-hidden opacity-0">
              {/* Highlight sweep background on hover */}
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <span className="relative z-10 text-xl md:text-2xl font-mono text-zinc-600 transition-colors duration-500 group-hover:text-zinc-300 shrink-0">
                {pillar.num}
              </span>
              <h3 className="relative z-10 text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-zinc-300 transition-colors duration-500 group-hover:text-white">
                {pillar.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
