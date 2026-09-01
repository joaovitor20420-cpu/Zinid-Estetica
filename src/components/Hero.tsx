"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Fade in eyebrow
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Stagger headline words with 3D rotation
    tl.fromTo(
      ".hero-word",
      { opacity: 0, y: 40, rotateX: -20 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" },
      "-=0.4"
    );

    // Fade in subtext and ctas
    tl.fromTo(
      ".hero-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    // Image Scrub Parallax
    gsap.to(".hero-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[100dvh] flex flex-col lg:flex-row bg-zinid-black overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-40 pb-16 lg:px-16 xl:px-24 lg:pt-0 z-10 bg-zinid-black lg:bg-transparent">
        <div className="max-w-xl">
          <div className="hero-eyebrow opacity-0">
            <span className="inline-block text-zinid-silver text-[11px] uppercase tracking-[0.22em] font-medium mb-8">
              Zinid Estética Automotiva
            </span>
          </div>

          <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-8 text-white [perspective:1000px]">
            <span className="inline-block overflow-hidden pb-2">
              <span className="hero-word inline-block opacity-0 origin-bottom">SEU</span>&nbsp;
              <span className="hero-word inline-block opacity-0 origin-bottom">CARRO.</span>
            </span>
            <br />
            <span className="inline-block overflow-hidden pb-2">
              <span className="hero-word inline-block opacity-0 origin-bottom">NOSSA</span>&nbsp;
              <span className="hero-word inline-block opacity-0 origin-bottom">ESPECIALIDADE.</span>
            </span>
          </h1>

          <p className="hero-sub opacity-0 text-lg text-zinc-400 max-w-[32ch] leading-relaxed mb-12">
            Estética automotiva profissional para quem exige cuidado, acabamento e excelência em cada detalhe.
          </p>

          <div className="hero-sub opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://wa.me/5531995998390"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 font-medium hover:bg-zinc-200 transition-colors w-full sm:w-auto text-center shrink-0"
            >
              AGENDAR MEU SERVIÇO
            </a>
            <a
              href="#servicos"
              className="text-white border border-white/20 px-8 py-4 font-medium hover:bg-white/5 transition-colors w-full sm:w-auto text-center shrink-0"
            >
              VER SERVIÇOS
            </a>
          </div>
        </div>
      </div>

      {/* Right Image Asset (Desktop) */}
      <div className="flex-1 relative hidden lg:block h-[100dvh]">
        <div className="hero-image absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images1.jpg"
            alt="Detalhe automotivo premium"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinid-black via-zinid-black/10 to-transparent opacity-80 z-10" />
      </div>

      {/* Mobile Image */}
      <div className="w-full h-[50vh] relative lg:hidden mt-8 overflow-hidden">
        <div className="hero-image absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images1.jpg"
            alt="Detalhe automotivo premium"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinid-black via-zinid-black/20 to-transparent z-10" />
      </div>
    </section>
  );
}
