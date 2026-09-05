"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Skip on touch devices — don't hide browser cursor on mobile/tablet
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isTouchDevice) return;

    // Oculta o cursor padrão do navegador apenas quando o componente JS carregar com sucesso
    document.body.style.cursor = "none";
    const clickableElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    clickableElements.forEach(el => (el as HTMLElement).style.cursor = "none");

    // Inicializa o cursor oculto e no centro
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    let ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        // Mostra o cursor se estava oculto
        if (cursor.style.opacity === "0") {
          gsap.to(cursor, { opacity: 1, duration: 0.3 });
        }
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    });

    // Detecta hovers em elementos interativos
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Se for um link ou botão normal
      const isClickable = target.closest("a") || target.closest("button") || target.closest("[role='button']");
      
      // Se for uma imagem da galeria (classe customizada que criamos nas divs)
      const isGalleryItem = target.closest(".cursor-crosshair") || target.closest(".gallery-img-inner");

      if (isGalleryItem) {
        setIsHovering(true);
        setHoverText("VER");
      } else if (isClickable) {
        setIsHovering(true);
        setHoverText("");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      ctx.revert();
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Oculta em telas menores que 1024px (mobile/tablet não precisa de cursor custom)
  return (
    <div className="hidden lg:block pointer-events-none fixed top-0 left-0 z-[100]">
      <div
        ref={cursorRef}
        className={`flex items-center justify-center rounded-full ${
          isHovering && hoverText
            ? "w-20 h-20 bg-white text-black font-bold text-xs tracking-widest shadow-2xl mix-blend-normal"
            : isHovering
            ? "w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/30 mix-blend-difference"
            : "w-4 h-4 bg-white mix-blend-difference"
        }`}
        style={{
          transitionProperty: "width, height, background-color, border-color, box-shadow, backdrop-filter",
          transitionDuration: "300ms",
          transitionTimingFunction: "ease-out"
        }}
      >
        {hoverText && (
          <span className="opacity-100 animate-in fade-in zoom-in duration-300">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
}
