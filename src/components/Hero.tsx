"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FRAME_COUNT = 300;

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(4, "0");
      img.src = `/hero-sequence/frame_${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Draw first frame when the first image is loaded
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx && canvasRef.current) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
            ctx.drawImage(img, 0, 0);
          }
        }
        if (loadedCount === FRAME_COUNT) {
          setIsReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useGSAP(() => {
    // Animação de Entrada dos Textos
    const textsTl = gsap.timeline();
    textsTl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    textsTl.fromTo(".hero-word", { opacity: 0, y: 40, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4");
    textsTl.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");

    if (!imagesRef.current.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let frameReq: number;
    const frameData = { currentFrame: 0 };

    const updateCanvas = () => {
      if (!context) return;
      const img = imagesRef.current[frameData.currentFrame];
      if (img && img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=2000%", // Aumentei o tempo de scroll para ser ainda mais fluido
      pin: true,
      scrub: 0.5, // Adiciona uma suavidade no scrub (meio segundo de atraso para inércia)
      anticipatePin: 1,
      onUpdate: (self) => {
        // Mapeia o progresso (0 a 1) para o índice do frame (0 a 299)
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        );

        if (frameData.currentFrame !== frameIndex) {
          frameData.currentFrame = frameIndex;
          if (frameReq) cancelAnimationFrame(frameReq);
          frameReq = requestAnimationFrame(updateCanvas);
        }
      }
    });

    setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      if (frameReq) cancelAnimationFrame(frameReq);
    };

  }, { scope: container }); // Removi a dependência de isReady para o texto animar independente das imagens carregarem 100%

  return (
    <section ref={container} className="relative w-full h-[100dvh] bg-zinid-black overflow-hidden flex flex-col lg:flex-row">
      {/* Background Canvas (Image Sequence) */}
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-center block"
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinid-black via-zinid-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinid-black via-zinid-black/40 to-transparent z-10 lg:hidden" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 pt-32 pb-16 lg:px-16 xl:px-24 lg:pt-0 pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
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

          <p className="hero-sub opacity-0 text-lg text-zinc-300 max-w-[32ch] leading-relaxed mb-12 drop-shadow-md">
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
              className="text-white border border-white/20 px-8 py-4 font-medium hover:bg-white/10 transition-colors w-full sm:w-auto text-center shrink-0 backdrop-blur-sm bg-black/20"
            >
              VER SERVIÇOS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
