"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ColorWrapper({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

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
