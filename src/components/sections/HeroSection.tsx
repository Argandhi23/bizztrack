'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Globe, Zap, Database, LayoutTemplate } from 'lucide-react';
// Import 2 library ajaib kita!
import { TypeAnimation } from 'react-type-animation';
import Marquee from 'react-fast-marquee';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-0 lg:pt-48 overflow-hidden bg-slate-50 flex flex-col justify-between min-h-screen">
      {/* Background Ornamen Abstrak (Blob) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-teal-200/40 blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-80 h-80 rounded-full bg-teal-200/40 blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full mb-20">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge kecil di atas judul */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-teal-100 text-teal-600 text-sm font-bold tracking-wide mb-8 shadow-sm">
            Partner Digital Bisnis Anda
            </span>
          </motion.div>

          {/* Judul dengan Efek Mengetik */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.2]"
          >
            Bangun <span className="text-teal-500">Sistem Digital</span> <br className="hidden md:block" />
            Untuk{' '}
            {/* Komponen TypeAnimation yang membuat efek mengetik */}
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
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Tinggalkan cara manual. Kami membantu menskalakan bisnis Anda dengan teknologi website modern yang cepat, aman, dan dirancang khusus untuk Anda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
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
          </motion.div>
        </div>
      </div>

      {/* Marquee Banner - Pita Berjalan di bagian paling bawah Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="border-y border-slate-200 bg-white/80 backdrop-blur-md py-6 mt-auto"
      >
        <Marquee gradient={true} gradientColor="white" speed={40} pauseOnHover={true}>
          <div className="flex items-center gap-16 px-8">
            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Code2 className="text-teal-500" /> React
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Code2 className="text-teal-500" /> Next.js
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Database className="text-emerald-500" /> MongoDB
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Database className="text-emerald-500" /> MySQL
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Database className="text-emerald-500" /> Supabase
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Smartphone className="text-blue-500" /> Flutter
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Globe className="text-indigo-500" /> HTML • CSS • JavaScript
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Zap className="text-amber-500" /> Firebase
            </div>

            {/* Duplikasi agar loop smooth */}
            <div className="flex items-center gap-3 text-slate-600 font-bold text-lg hover:text-teal-600 transition-colors cursor-default">
              <Code2 className="text-teal-500" /> React & Next.js
            </div>
          </div>
        </Marquee>
      </motion.div>
    </section>
  );
}