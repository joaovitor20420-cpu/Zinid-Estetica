"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // PREVINE QUE O SCROLLTRIGGER ATUALIZE E FAÇA A TELA PISCAR QUANDO A BARRA DE URL DO CELULAR SOME/APARECE
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function ColorWrapper({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  // Recálculo global atrasado para garantir que todos os `pin-spacers` das seções filhas 
  // (Hero, Services, Process) estejam no DOM antes de fixar as posições de trigger.
  // Isso resolve o bug "entra por cima" em que as seções debaixo sobrepõem as de cima.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("section[data-bgcolor]");
    
    sections.forEach((sec, i) => {
      const color = sec.getAttribute("data-bgcolor");
      if(color) {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%", 
          end: "bottom 50%",
          onEnter: () => gsap.to(container.current, { backgroundColor: color, duration: 1.5, ease: "power2.out" }),
          onEnterBack: () => gsap.to(container.current, { backgroundColor: color, duration: 1.5, ease: "power2.out" }),
        });
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full min-h-screen bg-black overflow-hidden">
      {children}
    </div>
  );
}
