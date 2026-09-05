"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [activeSection, setActiveSection] = useState("");

  // Lock body scroll when mobile menu is open
  const toggleMenu = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open);
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Spy scroll implementation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections with an id
    setTimeout(() => {
      const sections = document.querySelectorAll("section[id], div[id]");
      sections.forEach((section) => observer.observe(section));
    }, 1000); // give time for rendering

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.body.classList.remove("menu-open");
    };
  }, []);

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Contato", href: "/#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center ${
        isScrolled ? "pt-3 md:pt-4 px-4" : "pt-4 md:pt-8 px-4 md:px-6"
      }`}
    >
      <div 
        className={`flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative ${
          isScrolled 
            ? "max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-5 md:px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "max-w-7xl bg-transparent px-0 py-2 border-transparent"
        }`}
      >
        <Link 
          href="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative z-10 flex items-center shrink-0"
        >
          <Image
            src="/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png"
            alt="Zinid Estética Automotiva Logo"
            width={100}
            height={32}
            className="h-7 md:h-8 w-auto object-contain transition-transform duration-500"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href === "/" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`relative px-5 py-2 text-sm font-medium transition-colors rounded-full ${
                activeSection === link.href ? "text-white" : "text-zinc-300 hover:text-white"
              }`}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-bg"
                  className="absolute inset-0 bg-white/5 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {activeSection === link.href && (
                <div className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <MagneticButton
            as="a"
            href="https://wa.me/5531995998390"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            Agendar serviço
          </MagneticButton>
        </div>

        {/* Mobile Toggle — min 48x48 touch target */}
        <button
          className="lg:hidden relative z-[60] p-3 -mr-1 text-zinc-300 active:scale-90 transition-transform"
          onClick={() => toggleMenu(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ minWidth: 48, minHeight: 48 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu — Full-Screen Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 lg:hidden bg-zinid-black/98 backdrop-blur-2xl flex flex-col"
            >
              {/* Top bar with logo and close */}
              <div className="flex items-center justify-between px-5 pt-4 pb-4">
                <Image
                  src="/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png"
                  alt="Zinid Logo"
                  width={100}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => toggleMenu(false)}
                  className="p-3 text-zinc-300 active:scale-90 transition-transform"
                  aria-label="Fechar menu"
                  style={{ minWidth: 48, minHeight: 48 }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav links — centered, large touch targets, staggered animation */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === "/" && window.location.pathname === "/") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        toggleMenu(false);
                      }}
                      className={`block text-3xl font-bold tracking-tight py-4 transition-colors ${
                        activeSection === link.href ? "text-white" : "text-zinc-500 active:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA — easy thumb access */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-8 pb-10 pt-4 safe-area-bottom"
              >
                <a
                  href="https://wa.me/5531995998390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white text-black rounded-2xl py-5 text-base font-bold tracking-wide active:scale-95 transition-transform"
                >
                  Agendar via WhatsApp
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
