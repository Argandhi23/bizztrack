'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// =================================================================
// 1. KOMPONEN AUTO-SLIDER (Tetap sama)
// =================================================================
const ImageSlider = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-100 text-slate-400 font-medium">
        Gambar Belum Tersedia
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden group">
      {images.map((src, idx) => (
        <Image 
          key={idx}
          src={src} 
          alt={`${title} - screenshot ${idx + 1}`}
          fill
          className={`object-cover transition-all duration-1000 ease-in-out ${
            idx === currentIndex 
              ? 'opacity-100 scale-100 group-hover:scale-105'
              : 'opacity-0 scale-110'
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 z-20">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                idx === currentIndex ? 'w-4 bg-teal-500' : 'w-1.5 bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </div>
  );
};

// =================================================================
// 2. KOMPONEN GRID DENGAN GSAP SCROLLTRIGGER (STAGGERED FADE UP)
// =================================================================
interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      // Animasi muncul berurutan (stagger) saat di-scroll
      gsap.from('.portfolio-item', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%", // Mulai saat top grid menyentuh 85% tinggi layar
        },
        y: 60,              // Muncul dari bawah
        opacity: 0,         // Dari transparan
        duration: 0.8,      // Durasi animasi tiap card
        stagger: 0.15,      // Jeda waktu antar card (efek domino)
        ease: "power3.out"  // Efek perlambatan yang mulus di akhir
      });
    }, gridRef);

    return () => ctx.revert();
  }, [projects.length]);

  if (projects.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-slate-300">
        <p className="text-slate-500">Belum ada portofolio yang ditambahkan.</p>
      </div>
    );
  }

  return (
    // Kembali ke layout Grid original milikmu
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const projectImages = project.images 
          ? project.images 
          : (project.image_url ? [project.image_url] : []);

        return (
          // Tambahkan class .portfolio-item untuk ditarget oleh GSAP
          <div key={project.id} className="portfolio-item h-full">
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.03}
              transitionSpeed={2500}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#ffffff"
              glarePosition="all"
              className="h-full rounded-2xl"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-slate-100 group flex flex-col h-full">
                
                {/* Tinggi gambar dikembalikan ke h-56 agar tidak ke-crop aneh */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden shrink-0">
                  <ImageSlider images={projectImages} title={project.title} />
                </div>

                {/* Area Konten */}
                <div className="p-6 flex flex-col grow relative bg-white">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack?.map((tech: string, index: number) => (
                      <span key={index} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.live_url && (
                    <Link 
                      href={project.live_url} 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold text-sm transition mt-auto group/btn"
                    >
                      Kunjungi Web <ExternalLink size={16} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </Tilt>
          </div>
        );
      })}
    </div>
  );
}