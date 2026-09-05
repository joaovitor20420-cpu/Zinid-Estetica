"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
}

export function Preloader({ progress }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 600); // Pequeño delay em 100% para o usuário ver
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-6">
            <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 tabular-nums">
              {progress}%
            </div>
            
            <div className="w-full max-w-xs h-[2px] bg-white/10 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
          </div>
          
          <div className="absolute bottom-12 text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
            Zinid Estética Automotiva
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
