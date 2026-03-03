'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/types';
// Import Tilt!
import Tilt from 'react-parallax-tilt';

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
      {projects.map((project) => (
        <motion.div variants={itemVariants} key={project.id}>
          {/* Sihir 3D untuk Portofolio! */}
          <Tilt
            tiltMaxAngleX={5} // Sudutnya lebih kecil untuk portofolio agar gambar tidak distorsi
            tiltMaxAngleY={5}
            scale={1.03}
            transitionSpeed={2500}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ffffff" // Pantulan cahaya putih
            glarePosition="all"
            className="h-full rounded-2xl" // Pastikan Tilt mengambil tinggi penuh
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-slate-100 group flex flex-col h-full">
              {/* Area Gambar */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                {project.image_url ? (
                  <Image 
                    src={project.image_url} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-400 font-medium">
                    Gambar Belum Tersedia
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Area Konten */}
              <div className="p-6 flex flex-col grow relative bg-white">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">{project.title}</h3>
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
      ))}
    </motion.div>
  );
}