"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export function Footer() {
  return (
    <footer className="bg-zinid-black pt-24 pb-12 border-t border-zinid-blue/10 relative overflow-hidden">
      {/* Subtle top glow with brand color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-zinid-blue/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-zinid-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20"
        >
          
          <motion.div variants={itemVariants} className="lg:col-span-5 pr-0 lg:pr-12">
            <Link href="#" className="inline-block mb-8 group">
              <Image
                src="/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png"
                alt="Zinid Estética Automotiva Logo"
                width={160}
                height={55}
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8 max-w-sm">
              Elevando o padrão do detalhamento automotivo em Betim - MG. Cuidado obsessivo aos detalhes.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/5531995998390"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-zinid-blue hover:text-white hover:scale-110 hover:border-transparent transition-all duration-300 text-white group shadow-[0_0_0_rgba(0,71,255,0)] hover:shadow-[0_0_20px_rgba(0,71,255,0.4)]"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://maps.google.com/?q=Av.+Fausto+Ribeiro+da+Silva,+1257+-+Loja+4,+Bandeirinhas,+Betim+-+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-zinid-blue hover:text-white hover:scale-110 hover:border-transparent transition-all duration-300 text-white group shadow-[0_0_0_rgba(0,71,255,0)] hover:shadow-[0_0_20px_rgba(0,71,255,0.4)]"
                aria-label="Google Maps"
              >
                <MapPin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinid-blue shadow-[0_0_10px_rgba(0,71,255,0.5)]" /> Navegação
            </h4>
            <ul className="space-y-4">
              {['Início', 'Serviços', 'Galeria', 'Contato'].map((item, i) => (
                <li key={item}>
                  <Link 
                    href={i === 0 ? "#" : `#${item.toLowerCase()}`} 
                    className="group flex items-center text-zinc-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-zinid-blue" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinid-blue shadow-[0_0_10px_rgba(0,71,255,0.5)]" /> Contato
            </h4>
            <ul className="space-y-6 text-zinc-400 font-light">
              <li className="flex flex-col">
                <span className="text-zinc-600 text-xs uppercase tracking-wider mb-1 font-semibold">Telefone / WhatsApp</span>
                <a href="https://wa.me/5531995998390" className="text-lg hover:text-zinid-blue transition-colors">
                  (31) 99599-8390
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-600 text-xs uppercase tracking-wider mb-1 font-semibold">Endereço</span>
                <span className="leading-relaxed hover:text-zinc-300 transition-colors">
                  Av. Fausto Ribeiro da Silva, 1257 - Loja 4<br />
                  Bandeirinhas, Betim - MG<br />
                  32654-805
                </span>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-500 font-light">
            &copy; {new Date().getFullYear()} <span className="text-zinc-300">Zinid Estética Automotiva</span>. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-zinc-600 font-light">
            <a href="#" className="hover:text-zinid-blue transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-zinid-blue transition-colors">Termos de Uso</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
