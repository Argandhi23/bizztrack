'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
// Ikon Star dihapus karena sudah tidak dipakai
import { ArrowRight, Code2, Smartphone, Globe, Zap, Database, ShieldCheck, TrendingUp } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const techStack = [
  { icon: <Code2 className="text-teal-500" size={24} />, name: "React" },
  { icon: <Code2 className="text-teal-500" size={24} />, name: "Next.js" },
  { icon: <Database className="text-emerald-500" size={24} />, name: "MongoDB" },
  { icon: <Database className="text-emerald-500" size={24} />, name: "MySQL" },
  { icon: <Database className="text-emerald-500" size={24} />, name: "Supabase" },
  { icon: <Smartphone className="text-blue-500" size={24} />, name: "Flutter" },
  { icon: <Globe className="text-indigo-500" size={24} />, name: "HTML • CSS • JS" },
  { icon: <Zap className="text-amber-500" size={24} />, name: "Firebase" },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. TIMELINE ANIMASI MASUK (REVEAL)
      const tl = gsap.timeline();

      tl.to('.mask-text', {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
      })
        .to('.fade-up-element', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }, '-=0.6')
        .to('.marquee-container', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.4');

      // 2. ANIMASI PARALLAX SCRUB UNTUK BACKGROUND BLOB
      gsap.to('.blob-1', {
        y: 300,
        rotation: 90,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 }
      });

      gsap.to('.blob-2', {
        y: -300,
        rotation: -90,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 }
      });

      // 3. ANIMASI FLOATING CARDS (YOYO EFFECT)
      gsap.to('.floating-card', {
        y: -15,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // 4. MATCHMEDIA UNTUK KECEPATAN MARQUEE
      let mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        gsap.to(marqueeRef.current, {
          xPercent: -70,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 }
        });
      });

      mm.add("(min-width: 768px)", () => {
        gsap.to(marqueeRef.current, {
          xPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 }
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-0 lg:pt-48 overflow-hidden bg-slate-50 flex flex-col justify-between min-h-screen z-0">

      {/* Background Texture & Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        <div className="blob-1 absolute top-[-5%] left-[-20%] md:top-[-10%] md:left-[-10%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-teal-200/20 md:bg-teal-200/40 blur-3xl mix-blend-multiply"></div>
        <div className="blob-2 absolute top-[20%] right-[-10%] md:right-[-5%] w-48 h-48 md:w-80 md:h-80 rounded-full bg-emerald-200/20 md:bg-emerald-200/40 blur-3xl mix-blend-multiply"></div>
      </div>

      {/* FLOATING GLASS CARDS */}
      <div className="floating-card fade-up-element opacity-0 hidden lg:flex absolute left-8 xl:left-20 top-1/3 flex-col items-start p-4 bg-white/60 backdrop-blur-md border border-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] z-10 w-48">
        <div className="p-2 bg-teal-50 rounded-lg text-teal-600 mb-3">
          <TrendingUp size={20} />
        </div>
        <p className="text-xs text-slate-500 font-medium mb-1">Performa Website</p>
        <p className="text-lg font-bold text-slate-900">99.9% Uptime</p>
      </div>

      <div className="floating-card fade-up-element opacity-0 hidden lg:flex absolute right-8 xl:right-20 top-[45%] flex-col items-start p-4 bg-white/60 backdrop-blur-md border border-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] z-10 w-48">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 mb-3">
          <ShieldCheck size={20} />
        </div>
        <p className="text-xs text-slate-500 font-medium mb-1">Standar Keamanan</p>
        <p className="text-lg font-bold text-slate-900">Enkripsi AES-256</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full mb-16 lg:mb-24 z-20">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge Section */}
          <div className="overflow-hidden inline-block mb-8">
            <div className="mask-text translate-y-full flex items-center justify-center gap-2 py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-teal-100/80 shadow-sm ring-1 ring-slate-900/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-teal-700 text-sm font-semibold tracking-wide">
                Partner Digital Bisnis Anda
              </span>
            </div>
          </div>

          {/* Headline Section */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.15] flex flex-col items-center gap-2">
            <div className="overflow-hidden inline-block pb-2">
              <span className="mask-text block translate-y-[120%]">Bangun <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-400">Sistem Digital</span></span>
            </div>
            <div className="overflow-hidden inline-block pb-2">
              <span className="mask-text block translate-y-[120%]">
                Untuk{' '}
                <TypeAnimation
                  sequence={[
                    'Website Bisnis', 2000,
                    'Toko Online', 2000,
                    'Aplikasi Kasir', 2000,
                    'Company Profile', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-slate-800 inline-block min-w-70 md:min-w-105 text-left border-b-4 border-teal-400/30"
                  repeat={Infinity}
                />
              </span>
            </div>
          </h1>

          {/* Subheadline Section */}
          <p className="fade-up-element opacity-0 translate-y-8 text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Tinggalkan cara manual. Kami membantu menskalakan bisnis Anda dengan teknologi modern yang <strong className="font-semibold text-slate-800">cepat, aman, dan dirancang khusus</strong> untuk Anda.
          </p>

          {/* CTA Buttons */}
          <div className="fade-up-element opacity-0 translate-y-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#kontak"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-slate-900 rounded-2xl hover:bg-slate-800 hover:shadow-[0_8px_30px_rgba(20,184,166,0.2)] hover:-translate-y-1"
            >
              Mulai Konsultasi 
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#portofolio"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all duration-300 bg-white/50 backdrop-blur-sm border-2 border-slate-200 text-slate-700 rounded-2xl hover:bg-white hover:border-teal-500 hover:text-teal-600 hover:shadow-lg hover:shadow-teal-500/5 hover:-translate-y-1"
            >
              Lihat Karya Kami
            </Link>
          </div>

        </div>
      </div>

      {/* Marquee Banner */}
      <div className="marquee-container opacity-0 translate-y-8 border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 mt-auto overflow-hidden relative">
        <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-slate-50 via-transparent to-slate-50 md:mask-[linear-gradient(to_right,white,transparent_10%,transparent_90%,white)]"></div>
        
        <div ref={marqueeRef} className="flex items-center gap-16 px-8 w-max whitespace-nowrap">
          {[1, 2, 3, 4].map((set) => (
            <div key={set} className="flex items-center gap-16">
              {techStack.map((tech, idx) => (
                <div key={`${set}-${idx}`} className="flex items-center gap-3 text-slate-600 font-bold text-lg transition-colors hover:text-slate-900 cursor-default">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                    {tech.icon}
                  </div>
                  {tech.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}