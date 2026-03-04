'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import Tilt from 'react-parallax-tilt';

// =================================================================
// 1. KOMPONEN BARU: Auto-Slider untuk Gambar Portofolio
// =================================================================
const ImageSlider = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Jika gambar cuma 1 atau tidak ada, matikan fitur auto-slide
    if (images.length <= 1) return;

    // Geser gambar setiap 3 detik (3000ms)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    // Bersihkan memori saat komponen ditutup
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
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Render semua gambar, tapi atur transparansinya (opacity) berdasarkan index */}
      {images.map((src, idx) => (
        <Image 
          key={idx}
          src={src} 
          alt={`${title} - screenshot ${idx + 1}`}
          fill
          // Efek cross-fade (pudar menyilang) yang super mulus
          className={`object-cover transition-all duration-1000 ease-in-out ${
            idx === currentIndex 
              ? 'opacity-100 scale-100 group-hover:scale-105' // Gambar aktif
              : 'opacity-0 scale-110' // Gambar tersembunyi
          }`}
        />
      ))}

      {/* Indikator Titik (Dots) di bawah gambar jika lebih dari 1 */}
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

      {/* Overlay Gradient (Bayangan Gelap) agar dots lebih terlihat */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </div>
  );
};

// =================================================================
// 2. KOMPONEN UTAMA GRID PORTOFOLIO
// =================================================================
interface PortfolioGridProps {
  projects: Project[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-slate-300">
        <p className="text-slate-500">Belum ada portofolio yang ditambahkan.</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => {
        // PERBAIKAN: Menggabungkan image_url tunggal atau array images
        // Ambil array images jika ada, atau buat array baru dari image_url jika cuma 1
        const projectImages = project.images 
          ? project.images 
          : (project.image_url ? [project.image_url] : []);

        return (
          <motion.div variants={itemVariants} key={project.id}>
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
                
                {/* Memanggil Komponen Slider yang baru dibuat */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
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

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack?.map((tech: string, index: number) => (
                      <span key={index} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Tombol Lihat Live Web */}
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}