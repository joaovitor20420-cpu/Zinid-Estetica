"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  as = "button",
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = buttonRef.current;
    if (!element) return;
    
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const baseClasses = `relative overflow-hidden group ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 w-full h-full -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-0 pointer-events-none" />
    </>
  );

  if (as === "a") {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
