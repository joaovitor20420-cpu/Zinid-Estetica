"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState(false);

  // Garante que o estado seja atualizado mesmo se o vídeo já estiver no cache do navegador
  // O React às vezes perde o evento onLoadedMetadata se o vídeo carregar instantaneamente.
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1 && videoRef.current.duration > 0) {
      videoRef.current.currentTime = 0;
      setIsReady(true);
    }
  }, []);

  useGSAP(() => {
    // Animação de Entrada dos Textos (Totalmente independente do vídeo)
    // Movida para FORA da trava de isReady para que o texto sempre apareça!
    const textsTl = gsap.timeline();
    textsTl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    textsTl.fromTo(".hero-word", { opacity: 0, y: 40, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4");
    textsTl.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");

    // Trava de segurança para o vídeo
    if (!isReady || !videoRef.current) return;

    const video = videoRef.current;
    const duration = video.duration;

    if (!duration || isNaN(duration)) return;

    // Variáveis para controle de decodificação eficiente (Sem RAF infinito)
    let targetTime = 0;
    let isUpdating = false;
    let frameReq: number;

    const updateVideoFrame = () => {
      // Diferença mínima para evitar micropulos (0.02s)
      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        // A regra de Ouro: SÓ mande o vídeo buscar um frame se ele já terminou
        // de buscar o anterior. Isso impede o engasgo/stuttering do decoder do MP4!
        if (!video.seeking) {
          video.currentTime = targetTime;
        }
        // Continua rodando o loop APENAS enquanto não atingir o alvo
        frameReq = requestAnimationFrame(updateVideoFrame);
      } else {
        // Desliga o loop quando terminar (Cumprindo a regra de não ter RAF infinito)
        isUpdating = false;
      }
    };

    // Arquitetura limpa: ScrollTrigger
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=1000%", // Dobro da velocidade!
      pin: true,
      scrub: true, // Mantém o pin macio, GSAP resolve a inércia do scroll
      anticipatePin: 1,
      onUpdate: (self) => {
        targetTime = self.progress * duration; // Progresso bruto de 0 a 100%
        
        // Liga o motor de atualização finita caso esteja desligado
        if (!isUpdating) {
          isUpdating = true;
          frameReq = requestAnimationFrame(updateVideoFrame);
        }
      }
    });

    setTimeout(() => {
      ScrollTrigger.sort(); // Garante o alinhamento correto dos componentes abaixo
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup: Mata o loop caso o componente seja desmontado durante o scroll
    return () => {
      cancelAnimationFrame(frameReq);
    };

  }, { scope: container, dependencies: [isReady] });

  return (
    <section ref={container} className="relative w-full h-[100dvh] bg-zinid-black overflow-hidden flex flex-col lg:flex-row">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/Blue_sports_sedan_detailing_process_202609020009.mp4"
          className="w-full h-full object-cover object-center"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={(e) => {
            const v = e.target as HTMLVideoElement;
            if (v.duration > 0) {
              v.currentTime = 0;
              setIsReady(true);
            }
          }}
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
