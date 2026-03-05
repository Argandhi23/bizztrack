'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Globe, Zap, Database } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

// Ekstrak data tech stack agar mudah diduplikasi tanpa mengotori kode HTML
const techStack = [
  { icon: <Code2 className="text-teal-500" />, name: "React" },
  { icon: <Code2 className="text-teal-500" />, name: "Next.js" },
  { icon: <Database className="text-emerald-500" />, name: "MongoDB" },
  { icon: <Database className="text-emerald-500" />, name: "MySQL" },
  { icon: <Database className="text-emerald-500" />, name: "Supabase" },
  { icon: <Smartphone className="text-blue-500" />, name: "Flutter" },
  { icon: <Globe className="text-indigo-500" />, name: "HTML • CSS • JS" },
  { icon: <Zap className="text-amber-500" />, name: "Firebase" },
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
        duration: 1,
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
        }, '-=0.5')
        .to('.marquee-container', {
          opacity: 1,
          duration: 1,
        }, '-=0.3');

      // 2. ANIMASI PARALLAX SCRUB UNTUK BACKGROUND BLOB
      // Blob 1 melayang ke bawah dan berputar
      gsap.to('.blob-1', {
        y: 300,
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top", // Berjalan selama Hero Section masih terlihat
          scrub: 2, // Angka 2 membuatnya terasa sangat lambat dan halus
        }
      });

      // Blob 2 melayang ke atas berlawanan arah
      gsap.to('.blob-2', {
        y: -300,
        rotation: -90,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        }
      });

      // 3. MATCHMEDIA UNTUK KECEPATAN MARQUEE (HP VS LAPTOP)
      let mm = gsap.matchMedia();

      // Aturan untuk HP (Layar kecil)
      mm.add("(max-width: 767px)", () => {
        gsap.to(marqueeRef.current, {
          xPercent: -70, // Bergerak jauh lebih panjang agar terasa cepat di HP
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });
      });

      // Aturan untuk Laptop/Tablet (Layar besar)
      mm.add("(min-width: 768px)", () => {
        gsap.to(marqueeRef.current, {
          xPercent: -35, // Kecepatan normal untuk layar lebar (seperti yang kamu suka)
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-0 lg:pt-48 overflow-hidden bg-slate-50 flex flex-col justify-between min-h-screen z-0">

      {/* Background Blob (Ditambahkan class responsive md: agar aman di HP) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {/* Blob 1: Di HP ukurannya w-64 dan opacity 20%. Di laptop (md:) w-96 dan opacity 40% */}
        <div className="blob-1 absolute top-[-5%] left-[-20%] md:top-[-10%] md:left-[-10%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-teal-200/20 md:bg-teal-200/40 blur-2xl md:blur-3xl mix-blend-multiply"></div>

        {/* Blob 2: Sama, diperkecil dan dikurangi transparansinya di layar HP */}
        <div className="blob-2 absolute top-[20%] right-[-10%] md:right-[-5%] w-48 h-48 md:w-80 md:h-80 rounded-full bg-teal-200/20 md:bg-teal-200/40 blur-2xl md:blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full mb-20">
        <div className="text-center max-w-4xl mx-auto">

          <div className="overflow-hidden inline-block mb-8">
            <span className="mask-text block translate-y-full py-1.5 px-4 rounded-full bg-white border border-teal-100 text-teal-600 text-sm font-bold tracking-wide shadow-sm">
              Partner Digital Bisnis Anda
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.2] flex flex-col items-center gap-2">
            <div className="overflow-hidden inline-block">
              <span className="mask-text block translate-y-[120%]">Bangun <span className="text-teal-500">Sistem Digital</span></span>
            </div>
            <div className="overflow-hidden inline-block">
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
                  className="text-slate-900 inline-block min-w-70 md:min-w-100 text-left"
                  repeat={Infinity}
                />
              </span>
            </div>
          </h1>

          <p className="fade-up-element opacity-0 translate-y-10 text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Tinggalkan cara manual. Kami membantu menskalakan bisnis Anda dengan teknologi website modern yang cepat, aman, dan dirancang khusus untuk Anda.
          </p>

          <div className="fade-up-element opacity-0 translate-y-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#kontak"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-slate-900 rounded-2xl hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1"
            >
              Mulai Konsultasi <ArrowRight size={20} />
            </Link>
            <Link
              href="#portofolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold transition-all duration-300 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl hover:border-teal-600 hover:text-teal-600 hover:shadow-xl hover:-translate-y-1"
            >
              Lihat Karya Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Banner dengan isi yang diduplikasi 4x menggunakan Array Map agar w-max tidak pernah kehabisan konten saat digeser cepat di HP */}
      <div className="marquee-container opacity-0 border-y border-slate-200 bg-white/80 backdrop-blur-md py-6 mt-auto overflow-hidden">
        <div ref={marqueeRef} className="flex items-center gap-16 px-8 w-max whitespace-nowrap">

          {/* Loop Array techStack sebanyak 4 kali */}
          {[1, 2, 3, 4].map((set) => (
            <div key={set} className="flex items-center gap-16">
              {techStack.map((tech, idx) => (
                <div key={`${set}-${idx}`} className="flex items-center gap-3 text-slate-600 font-bold text-lg">
                  {tech.icon} {tech.name}
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}