'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layout, Database, Code, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-6 h-6 transition-colors duration-300 icon-svg text-slate-500" />,
    title: 'Discovery & Requirement',
    description: 'Kami menganalisis proses bisnis Anda secara mendalam, mengumpulkan kebutuhan sistem, dan merancang arsitektur solusi digital yang paling efisien.'
  },
  {
    icon: <Layout className="w-6 h-6 transition-colors duration-300 icon-svg text-slate-500" />,
    title: 'UI/UX & System Design',
    description: 'Merancang visual antarmuka (UI) yang memanjakan mata sekaligus menyusun Wireframe dan rancangan struktur database agar alur data terorganisir.'
  },
  {
    icon: <Database className="w-6 h-6 transition-colors duration-300 icon-svg text-slate-500" />,
    title: 'Backend & Database Setup',
    description: 'Membangun "mesin" utama website Anda menggunakan Supabase/MySQL. Mengamankan API, mengatur relasi data, dan logika server yang kompleks.'
  },
  {
    icon: <Code className="w-6 h-6 transition-colors duration-300 icon-svg text-slate-500" />,
    title: 'Frontend Integration',
    description: 'Menerjemahkan desain UI menjadi kode Next.js/React yang super cepat. Mengintegrasikan tampilan dengan Backend API agar web menjadi dinamis.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 transition-colors duration-300 icon-svg text-slate-500" />,
    title: 'QA, Testing & Security',
    description: 'Pengujian ketat terhadap bug, performa kecepatan, kompatibilitas di berbagai HP, dan celah keamanan sebelum sistem diserahkan ke publik.'
  },
  {
    icon: <Rocket className="w-6 h-6 transition-colors duration-300 icon-svg text-slate-500" />,
    title: 'Deployment & Maintenance',
    description: 'Meluncurkan sistem ke live server. Kami juga memantau stabilitas server 24/7 dan memberikan garansi perbaikan jika terjadi kendala teknis.'
  }
];

export default function WorkflowSection() {
  // Tambahkan Tipe HTMLDivElement untuk ref
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  // Definisikan bahwa array ini berisi HTMLDivElement atau null
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animasi Garis GSAP Scrub 
      if (lineRef.current && sectionRef.current) {
        gsap.to(lineRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          }
        });
      }

      // 2. Animasi Card Muncul (Casting toArray sebagai HTMLElement[])
      const cards = gsap.utils.toArray<HTMLElement>('.step-card-wrapper');
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // 3. Efek Ikon "Menyala" saat garis melewatinya
      nodesRef.current.forEach((node) => {
        // Cek null safety sebelum assign ke target GSAP
        if (node) {
          ScrollTrigger.create({
            trigger: node,
            start: 'top center',
            toggleClass: { targets: node, className: "is-active" },
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 overflow-hidden relative z-0">
      
      {/* Background Texture Subtle Dots */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[20px_20px] opacity-30 mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">Metodologi Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Proses <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-400">Engineering</span> BizzTrack
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Kami tidak menggunakan template instan. Setiap baris kode dan struktur database dirancang khusus untuk memastikan sistem bisnis Anda tangguh, skalabel, dan aman.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Garis Dasar (Abu-abu) */}
          <div className="absolute left-6.75 md:left-1/2 top-0 bottom-0 w-1.5 bg-slate-200 -translate-x-1/2 rounded-full"></div>
          
          {/* Garis Progress (Teal) */}
          <div 
            ref={lineRef} 
            className="absolute left-6.75 md:left-1/2 top-0 w-1.5 bg-linear-to-b from-teal-400 to-teal-600 -translate-x-1/2 rounded-full h-0 shadow-[0_0_20px_rgba(20,184,166,0.6)] z-0"
          ></div>

          {/* List Langkah */}
          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Konten Text (Card) */}
                <div className={`step-card-wrapper w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start md:pl-16' : 'md:justify-end md:pr-16'} pl-20 pr-4 mt-2 md:mt-0`}>
                  
                  {/* Card UI */}
                  <div className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-teal-200 transition-all duration-300 group overflow-hidden w-full max-w-lg">
                    
                    {/* Watermark Angka di Background Card */}
                    <div className="absolute -right-6 -bottom-8 text-[120px] font-black text-slate-50 opacity-50 select-none group-hover:text-teal-50/50 transition-colors duration-500 pointer-events-none">
                      0{index + 1}
                    </div>

                    <div className="relative z-10">
                      <span className="text-teal-500 font-bold text-sm mb-3 block tracking-wider uppercase">
                        Tahap {index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Lingkaran Ikon di Tengah */}
                <div 
                  // Perbaikan Arrow Function untuk ref agar tidak return nilai implisit
                  ref={(el) => {
                    nodesRef.current[index] = el;
                  }}
                  className="step-node absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full border-4 border-slate-50 bg-white flex items-center justify-center shadow-md transition-all duration-500 z-10 
                  [&.is-active]:bg-teal-500 [&.is-active]:border-teal-100 [&.is-active]:scale-125 [&.is-active_.icon-svg]:text-white [&.is-active]:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                >
                  {step.icon}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}