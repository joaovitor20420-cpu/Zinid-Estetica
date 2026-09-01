import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinid-black pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="#" className="inline-block mb-6">
              <Image
                src="/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png"
                alt="Zinid Estética Automotiva Logo"
                width={140}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-zinc-400 max-w-sm mb-6">
              Detalhamento e cuidado automotivo em Betim - MG.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/5531995998390"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://maps.google.com/?q=Av.+Fausto+Ribeiro+da+Silva,+1257+-+Loja+4,+Bandeirinhas,+Betim+-+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white"
                aria-label="Google Maps"
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide">Navegação</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="#servicos" className="text-zinc-400 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="#galeria" className="text-zinc-400 hover:text-white transition-colors">Galeria</Link></li>
              <li><Link href="#contato" className="text-zinc-400 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide">Contato</h4>
            <ul className="space-y-4 text-zinc-400">
              <li>(31) 99599-8390</li>
              <li>Av. Fausto Ribeiro da Silva, 1257 - Loja 4</li>
              <li>Bandeirinhas, Betim - MG</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Zinid Estética Automotiva. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
