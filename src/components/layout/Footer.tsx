'use client';

// Tambahkan import hooks React dan GSAP
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, ShoppingBag, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Custom SVG Icon untuk TikTok
const TikTokIcon = ({ size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%', // Mulai saat footer hampir terlihat semua
        }
      });

      // 1. Munculkan Header CTA terlebih dahulu
      tl.from('.footer-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      // 2. Munculkan kolom-kolom info secara bergantian (stagger)
      .from('.footer-col', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.4')
      // 3. Munculkan bagian copyright terakhir dengan sekadar fade in
      .from('.footer-bottom', {
        opacity: 0,
        duration: 0.6,
      }, '-=0.2');
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Tempelkan ref di elemen footer
    <footer ref={footerRef} className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Efek Glow Halus di Background Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-50 bg-teal-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tambahkan class footer-cta */}
        <div className="footer-cta flex flex-col md:flex-row items-start md:items-center justify-between pb-16 border-b border-slate-800 gap-8">
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
          
          {/* Tambahkan class footer-col di SETIAP kolom */}
          <div className="footer-col space-y-6">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Bizz<span className="text-teal-500">Track</span>
            </span>
            <p className="text-slate-400 leading-relaxed text-sm">
              Partner digital terpercaya untuk Bisnis Indonesia. Kami tidak sekadar membuat website, kami membangun solusi untuk mempercepat pertumbuhan bisnis Anda.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="https://www.instagram.com/bizz.track_?igsh=MXY1cWUzMDl4ams3dw==" target="_blank" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300" title="Instagram">
                <Instagram size={18} />
              </Link>
              <Link href="https://www.tiktok.com/@bizz.track?_r=1&_t=ZS-94PHVcQuJE2" target="_blank" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300" title="TikTok">
                <TikTokIcon size={18} />
              </Link>
              <Link href="https://www.facebook.com/share/18VjxTnAVc/?mibextid=wwXIfr" target="_blank" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300" title="Facebook">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-300" title="Shopee (Menyusul)">
                <ShoppingBag size={18} />
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="text-white font-bold mb-6 text-lg">Layanan Kami</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Website Company Profile<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Toko Online (E-Commerce)<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Sistem Kasir (POS)<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="#layanan" className="hover:text-teal-400 transition-colors inline-block relative group">Custom Web App<span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="text-white font-bold mb-6 text-lg">Perusahaan</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Beranda</Link></li>
              <li><Link href="#portofolio" className="hover:text-teal-400 transition-colors">Portofolio & Karya</Link></li>
              <li><Link href="#kontak" className="hover:text-teal-400 transition-colors">Hubungi Kami</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">Kota Madiun, Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-teal-500 shrink-0" />
                <span className="text-slate-400">+62 858-5343-3816</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-teal-500 shrink-0" />
                <span className="text-slate-400">bizztrack444@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Tambahkan class footer-bottom */}
        <div className="footer-bottom pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} BizzTrack Digital Agency. Hak Cipta Dilindungi.</p>
        </div>

      </div>
    </footer>
  );
}