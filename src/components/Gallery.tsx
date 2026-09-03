"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const galleryItems = [
  { src: "/gallery_1.jpg", title: "Limpeza Detalhada de Motor" },
  { src: "/gallery_2.jpg", title: "Polimento Técnico" },
  { src: "/gallery_3.jpg", title: "Higienização Interna" },
  { src: "/gallery_4.jpg", title: "Vitrificação de Pintura" },
  { src: "/gallery_5.jpg", title: "Revitalização de Plásticos" },
  { src: "/gallery_6.jpg", title: "Detalhamento de Rodas" },
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

      // Internal Parallax for images
      gsap.utils.toArray(".gallery-img-inner").forEach((img: any) => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
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
          {/* Column 1 */}
          <div className="col-1 flex flex-col gap-6 pointer-events-auto">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinid-dark rounded-xl group cursor-crosshair">
              <Image src={galleryItems[0].src} alt={galleryItems[0].title} fill className="object-cover scale-125 gallery-img-inner transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                 <span className="text-zinid-blue text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Serviço</span>
                 <h4 className="text-white text-2xl font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{galleryItems[0].title}</h4>
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl group cursor-crosshair">
              <Image src={galleryItems[1].src} alt={galleryItems[1].title} fill className="object-cover scale-125 gallery-img-inner transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                 <span className="text-zinid-blue text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Serviço</span>
                 <h4 className="text-white text-2xl font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{galleryItems[1].title}</h4>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-2 flex flex-col gap-6 pointer-events-auto">
            <div className="relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl group cursor-crosshair">
              <Image src={galleryItems[2].src} alt={galleryItems[2].title} fill className="object-cover scale-125 gallery-img-inner transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                 <span className="text-zinid-blue text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Serviço</span>
                 <h4 className="text-white text-2xl font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{galleryItems[2].title}</h4>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinid-dark rounded-xl group cursor-crosshair">
              <Image src={galleryItems[3].src} alt={galleryItems[3].title} fill className="object-cover scale-125 gallery-img-inner transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                 <span className="text-zinid-blue text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Serviço</span>
                 <h4 className="text-white text-2xl font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{galleryItems[3].title}</h4>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="col-3 flex flex-col gap-6 pointer-events-auto">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinid-dark rounded-xl group cursor-crosshair">
              <Image src={galleryItems[4].src} alt={galleryItems[4].title} fill className="object-cover scale-125 gallery-img-inner transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                 <span className="text-zinid-blue text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Serviço</span>
                 <h4 className="text-white text-2xl font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{galleryItems[4].title}</h4>
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl group cursor-crosshair">
              <Image src={galleryItems[5].src} alt={galleryItems[5].title} fill className="object-cover scale-125 gallery-img-inner transition-transform duration-700 group-hover:scale-[1.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                 <span className="text-zinid-blue text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Serviço</span>
                 <h4 className="text-white text-2xl font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{galleryItems[5].title}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fallback - Standard staggered reveal */}
        <div className="md:hidden flex flex-col gap-4">
          {galleryItems.map((item, index) => (
             <div
               key={index}
               className="mobile-gallery-img relative aspect-square w-full overflow-hidden bg-zinid-dark rounded-xl opacity-0 group"
             >
               <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 opacity-100">
                  <span className="text-zinid-blue text-[10px] font-bold uppercase tracking-widest mb-1">Serviço</span>
                  <h4 className="text-white text-lg font-bold">{item.title}</h4>
               </div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
