"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#" },
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center ${
        isScrolled ? "pt-4 px-4" : "pt-8 px-6"
      }`}
    >
      <div 
        className={`flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative ${
          isScrolled 
            ? "max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "max-w-7xl bg-transparent px-0 py-2 border-transparent"
        }`}
      >
        <Link href="#" className="relative z-10 flex items-center shrink-0">
          <Image
            src="/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png"
            alt="Zinid Estética Automotiva Logo"
            width={100}
            height={32}
            className="h-8 w-auto object-contain transition-transform duration-500"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full"
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-bg"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="https://wa.me/5531995998390"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300"
          >
            Agendar serviço
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-10 p-2 text-zinc-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
              className={`absolute left-0 right-0 lg:hidden shadow-2xl overflow-hidden origin-top ${
                isScrolled ? "top-[120%] bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6" : "top-full mt-4 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              }`}
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-zinc-400 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-white/5">
                <a
                  href="https://wa.me/5531995998390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white text-black rounded-full py-4 text-base font-medium"
                >
                  Agendar via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
