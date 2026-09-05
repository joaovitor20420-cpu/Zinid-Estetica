"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

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
  const currentFrameRef = useRef(0);
  const folderRef = useRef("hero-sequence");

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    // alpha: false otimiza a renderização pois o canvas não precisa lidar com transparência
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;
    
    const img = imagesRef.current[index];
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // Preload progressivo e inteligente
  useEffect(() => {
    if (imagesRef.current.length > 0) return; // Previne duplicidade no Strict Mode

    // Detecta se é mobile no carregamento inicial
    folderRef.current = window.innerWidth < 768 ? "hero-sequence-mobile" : "hero-sequence";

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.addEventListener("load", () => {
        // Se a imagem que acabou de carregar for o frame atual, desenha imediatamente
        if (currentFrameRef.current === i) {
          drawFrame(i);
        }
      });
      images.push(img);
    }
    imagesRef.current = images;

    const preloadRest = () => {
      let currentIndex = 1;
      
      const loadNextBatch = () => {
        if (currentIndex >= FRAME_COUNT) {
          setIsReady(true);
          return;
        }
        
        const batchSize = 6; // Carrega 6 frames por vez em background
        let loadedInBatch = 0;
        const toLoad = Math.min(batchSize, FRAME_COUNT - currentIndex);
        
        const onComplete = () => {
          loadedInBatch++;
          if (loadedInBatch === toLoad) {
             currentIndex += toLoad;
             requestAnimationFrame(loadNextBatch);
          }
        };

        for (let i = 0; i < toLoad; i++) {
          const idx = currentIndex + i;
          const img = imagesRef.current[idx];
          
          if (img.src) {
             if (img.complete) {
               onComplete();
             } else {
               img.addEventListener("load", onComplete, { once: true });
               img.addEventListener("error", onComplete, { once: true });
             }
             continue;
          }
          
          img.addEventListener("load", onComplete, { once: true });
          img.addEventListener("error", onComplete, { once: true }); // Continua se falhar
          img.src = `/${folderRef.current}/frame_${String(idx + 1).padStart(4, "0")}.jpg`;
        }
      };
      
      // Inicia com leve delay para priorizar recursos críticos da página
      setTimeout(loadNextBatch, 200);
    };

    // Inicia pelo primeiro frame
    const firstImg = images[0];
    firstImg.addEventListener("load", () => {
      preloadRest();
      ScrollTrigger.refresh(); // Atualiza trigger com dimensões reais
    }, { once: true });
    firstImg.src = `/${folderRef.current}/frame_0001.jpg`;

  }, []);

  useGSAP(() => {
    // Animação de Entrada dos Textos (Ao carregar a página)
    const textsTl = gsap.timeline();
    textsTl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    textsTl.fromTo(".hero-word", { opacity: 0, y: 40, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4");
    textsTl.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");

    if (!canvasRef.current) return;

    let frameReq: number;

    const requestFrameLoad = (index: number) => {
       const img = imagesRef.current[index];
       if (img && !img.src) {
          img.src = `/${folderRef.current}/frame_${String(index + 1).padStart(4, "0")}.jpg`;
       }
    };

    const updateCanvas = () => {
      requestFrameLoad(currentFrameRef.current);
      drawFrame(currentFrameRef.current);
    };

    // Detecta se é mobile para ajustar o tempo/distância de rolagem
    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? "+=300%" : "+=500%";

    // Timeline principal sincronizada com o Scroll (Scrub)
    const stTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: scrollDistance, // Duração do Scroll adaptada
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Mantém a sincronia dos frames do canvas
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(self.progress * FRAME_COUNT)
          );

          if (currentFrameRef.current !== frameIndex) {
            currentFrameRef.current = frameIndex;
            if (frameReq) cancelAnimationFrame(frameReq);
            frameReq = requestAnimationFrame(updateCanvas);
          }
        }
      }
    });

    // Orquestração dos Textos durante o Scroll
    // Oculta o título principal logo no início
    stTl.to(".hero-main-content", { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, 0)
      
      // Copy 1 (Surge e Desaparece)
      .fromTo(".copy-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.5)
      .to(".copy-1", { opacity: 0, y: -50, duration: 1, ease: "power2.in" }, 3)
      
      // Copy 2 (Surge e Desaparece)
      .fromTo(".copy-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 4.5)
      .to(".copy-2", { opacity: 0, y: -50, duration: 1, ease: "power2.in" }, 6)
      
      // Copy 3 (Surge e fica até quase o final)
      .fromTo(".copy-3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 7.5)
      .to(".copy-3", { opacity: 0, y: -50, duration: 1, ease: "power2.in" }, 9.5)
      
      // Tempo extra para o vídeo terminar o movimento
      .to({}, { duration: 1 }, 10.5);

    setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      if (frameReq) cancelAnimationFrame(frameReq);
    };

  }, { scope: container });

  return (
    <section ref={container} data-bgcolor="#000000" className="relative w-full h-[100dvh] bg-transparent overflow-hidden flex flex-col lg:flex-row">
      {/* Background Canvas (Image Sequence) */}
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-center block"
        />
        {/* Desktop gradient (left to right) */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-zinid-black via-zinid-black/60 to-transparent z-10" />
        {/* Mobile gradients: strong bottom-to-top for text readability, subtle left-to-right */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-zinid-black via-zinid-black/80 to-transparent z-10" />
        <div className="absolute inset-0 md:hidden bg-gradient-to-r from-zinid-black/40 to-transparent z-10" />
      </div>

      {/* Foreground Content - Título Principal */}
      <div className="relative z-20 flex-1 flex flex-col justify-end md:justify-center px-6 pt-32 pb-8 md:pb-16 lg:px-16 xl:px-24 lg:pt-0 pointer-events-none">
        <div className="hero-main-content max-w-xl pointer-events-auto">
          <div className="hero-eyebrow opacity-0">
            <span className="inline-block text-zinid-silver text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-medium mb-4 md:mb-8">
              Zinid Estética Automotiva
            </span>
          </div>

          <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 md:mb-8 text-white [perspective:1000px]">
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

          <p className="hero-sub opacity-0 text-sm md:text-lg text-zinc-300 max-w-[32ch] leading-relaxed mb-8 md:mb-12 drop-shadow-md">
            Estética automotiva profissional para quem exige cuidado, acabamento e excelência em cada detalhe.
          </p>

          <div className="hero-sub opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <MagneticButton
              as="a"
              href="https://wa.me/5531995998390"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium hover:bg-zinc-200 transition-colors w-full sm:w-auto text-center shrink-0 flex items-center justify-center"
            >
              AGENDAR MEU SERVIÇO
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#servicos"
              className="text-white border border-white/20 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium hover:bg-white/10 transition-colors w-full sm:w-auto text-center shrink-0 backdrop-blur-sm bg-black/20 flex items-center justify-center"
            >
              VER SERVIÇOS
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Floating Copies para a Animação Cinemática de Scroll */}
      <div className="absolute inset-0 z-30 pointer-events-none">
         {/* Copy 1 - Direita Desktop, Fundo Mobile */}
         <div className="copy-1 absolute bottom-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-full md:w-auto md:right-[8%] lg:right-[12%] px-4 md:px-0 max-w-full md:max-w-md opacity-0">
            <div className="bg-zinid-dark/40 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl text-center md:text-right shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinid-blue/20 blur-[50px] -translate-y-1/2 translate-x-1/2 rounded-full" />
              <span className="inline-block text-zinid-blue text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 md:mb-4">01 &mdash; Precisão Absoluta</span>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight">Detalhes que <br className="hidden md:block"/><span className="text-zinc-400">Importam.</span></h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">Cada milímetro do seu veículo é inspecionado e tratado com os produtos mais nobres do mercado mundial.</p>
            </div>
         </div>

         {/* Copy 2 - Esquerda Desktop, Fundo Mobile */}
         <div className="copy-2 absolute bottom-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-full md:w-auto md:left-[8%] lg:left-[12%] px-4 md:px-0 max-w-full md:max-w-md opacity-0">
            <div className="bg-zinid-dark/40 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl text-center md:text-left shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 blur-[50px] -translate-y-1/2 -translate-x-1/2 rounded-full" />
              <span className="inline-block text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 md:mb-4">02 &mdash; Escudo Invisível</span>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">Proteção <br className="hidden md:block"/>Absoluta.</h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">Vitrificação e selantes avançados que não apenas mantêm o brilho extasiante, mas blindam a pintura contra o tempo.</p>
            </div>
         </div>

         {/* Copy 3 - Direita Desktop, Fundo Mobile */}
         <div className="copy-3 absolute bottom-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-full md:w-auto md:right-[8%] lg:right-[12%] px-4 md:px-0 max-w-full md:max-w-md opacity-0">
            <div className="bg-zinid-dark/40 backdrop-blur-xl border border-zinid-blue/20 p-6 md:p-10 rounded-3xl text-center md:text-right shadow-[0_30px_60px_rgba(0,71,255,0.1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-zinid-blue/10 to-transparent opacity-50" />
              <span className="relative inline-block text-zinid-blue text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 md:mb-4">03 &mdash; Essência Nova</span>
              <h3 className="relative text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight">Renovação <br className="hidden md:block"/>Interna.</h3>
              <p className="relative text-zinc-300 text-sm md:text-base leading-relaxed font-light">Higienização profunda e hidratação rigorosa de plásticos e couro. O seu interior de volta ao cheiro e textura de novo.</p>
            </div>
         </div>
      </div>
    </section>
  );
}
