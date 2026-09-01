"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const images = [
  "/images.jpg",
  "/images1.jpg",
  "/images2.jfif",
  "/images3.jfif",
  "/images4.jfif",
  "/images5.jfif",
];

export function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Desktop Parallax setup
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Col 1 - moves up fastest
      gsap.to(".col-1", {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
      // Col 2 - moves down slightly
      gsap.to(".col-2", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      // Col 3 - moves up drastically
      gsap.to(".col-3", {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    // Header reveal
    gsap.fromTo(
      ".gallery-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 80%",
        }
      }
    );

    // Mobile specific reveal
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray(".mobile-gallery-img").forEach((img: any) => {
        gsap.fromTo(img, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="galeria" className="py-40 bg-black relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-32 max-w-3xl mx-auto gallery-header opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
            RESULTADOS QUE <br className="hidden md:block" />
            <span className="text-zinc-600">FALAM POR SI.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400">
            Confira alguns dos trabalhos realizados pela Zinid através de uma perspectiva detalhada.
          </p>
        </div>

        {/* Desktop Parallax Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 h-[800px] pointer-events-none">
          {/* Column 1 - Moves up fastest */}
          <div className="col-1 flex flex-col gap-6">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinid-dark rounded-xl">
              <Image src={images[0]} alt="Detalhe 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl">
              <Image src={images[1]} alt="Detalhe 2" fill className="object-cover" />
            </div>
          </div>

          {/* Column 2 - Moves down/slower to create contrast */}
          <div className="col-2 flex flex-col gap-6">
            <div className="relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl">
              <Image src={images[2]} alt="Detalhe 3" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinid-dark rounded-xl">
              <Image src={images[3]} alt="Detalhe 4" fill className="object-cover" />
            </div>
          </div>

          {/* Column 3 - Moves up medium */}
          <div className="col-3 flex flex-col gap-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinid-dark rounded-xl">
              <Image src={images[4]} alt="Detalhe 5" fill className="object-cover" />
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl">
              <Image src={images[5]} alt="Detalhe 6" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Mobile Fallback - Standard staggered reveal */}
        <div className="md:hidden flex flex-col gap-4">
          {images.map((src, index) => (
             <div
               key={index}
               className="mobile-gallery-img relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl opacity-0"
             >
               <Image src={src} alt={`Galeria Mobile ${index + 1}`} fill className="object-cover" />
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
