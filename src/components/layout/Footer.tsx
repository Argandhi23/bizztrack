'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Efek Glow Halus di Background Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-50 bg-teal-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bagian Atas: Call to Action (CTA) Besar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-16 border-b border-slate-800 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Siap Mengubah <span className="text-teal-500">Masa Depan</span> Bisnis Anda?
            </h2>
            <p className="text-slate-400 text-lg">
              Jangan biarkan kompetitor mendahului Anda. Mari bangun sistem digital yang bekerja 24/7 untuk Bisnis Anda.
            </p>
          </div>
          <Link 
            href="#kontak"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)] hover:-translate-y-1 whitespace-nowrap"
          >
            Mulai Konsultasi Gratis
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bagian Tengah: Grid Link & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-6">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Bizz<span className="text-teal-500">Track</span>
            </span>
            <p className="text-slate-400 leading-relaxed text-sm">
              Partner digital terpercaya untuk Bisnis Indonesia. Kami tidak sekadar membuat website, kami membangun solusi untuk mempercepat pertumbuhan bisnis Anda.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Layanan */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Layanan Kami</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Website Company Profile<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Toko Online (E-Commerce)<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Sistem Kasir (POS)<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Custom Web App<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          {/* Kolom 3: Navigasi */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Perusahaan</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Beranda</Link></li>
              <li><Link href="#portofolio" className="hover:text-teal-400 transition-colors">Portofolio & Karya</Link></li>
              <li><Link href="#kontak" className="hover:text-teal-400 transition-colors">Hubungi Kami</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">Jl. Teknologi No. 88, Pusat Inovasi Digital, Jakarta Selatan, 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-teal-500 shrink-0" />
                <span className="text-slate-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-teal-500 shrink-0" />
                <span className="text-slate-400">halo@biztrack.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bagian Bawah: Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} BizTrack Digital Agency. Hak Cipta Dilindungi.</p>
        </div>

      </div>
    </footer>
  );
}