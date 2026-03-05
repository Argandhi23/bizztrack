"use client";

import React, { useState } from "react";
import Link from "next/link";
// Pastikan AnimatePresence juga di-import
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
// Import ikon Menu dan X untuk tampilan Mobile
import { Home, Briefcase, FolderOpen, Phone, ArrowRight, Menu, X } from "lucide-react";

// Varian Animasi untuk efek berurutan (Stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function Navbar() {
  // State untuk mengontrol buka/tutup menu di HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Beranda",
      link: "/",
      icon: <Home className="h-5 w-5 md:h-4 md:w-4 text-slate-500 group-hover:text-teal-600 transition-colors" />,
    },
    {
      name: "Layanan",
      link: "#layanan",
      icon: <Briefcase className="h-5 w-5 md:h-4 md:w-4 text-slate-500 group-hover:text-teal-600 transition-colors" />,
    },
    {
      name: "Portofolio",
      link: "#portofolio",
      icon: <FolderOpen className="h-5 w-5 md:h-4 md:w-4 text-slate-500 group-hover:text-teal-600 transition-colors" />,
    },
    {
      name: "Kontak",
      link: "#kontak",
      icon: <Phone className="h-5 w-5 md:h-4 md:w-4 text-slate-500 group-hover:text-teal-600 transition-colors" />,
    },
  ];

  return (
    <>
      {/* 1. NAVBAR STATIS (PREMIUM WIDE-PILL) */}
      <header className="absolute top-0 left-0 w-full z-40 pt-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // Tambahkan relative dan z-50 di sini agar navbar selalu di atas dropdown
          className="relative max-w-7xl mx-auto flex items-center justify-between bg-white/40 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 md:px-8 md:py-4 z-50"
        >

          {/* Logo Kiri */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight transition-transform duration-300 group-hover:scale-105">
                Bizz
                {/* Efek berkedip pelan (breathing/pulse) menggunakan Framer Motion */}
                <motion.span
                  className="text-teal-600 inline-block"
                  animate={{ opacity: [1, 0.3, 1] }} // Terang -> Redup -> Terang
                  transition={{
                    duration: 3, // Berkedip setiap 3 detik (sangat pelan dan elegan)
                    repeat: Infinity, // Diulang terus-menerus
                    ease: "easeInOut" // Transisi memudar yang sangat halus
                  }}
                >
                  Track
                </motion.span>
              </span>
            </Link>
          </motion.div>

          {/* Menu Tengah Desktop */}
          <motion.nav variants={itemVariants} className="hidden md:flex items-center gap-2">
            {navItems.slice(1).map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="relative px-5 py-2 text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors rounded-full hover:bg-white/60"
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>

          {/* Tombol Kanan Desktop */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <Link
              href="#kontak"
              className="group flex items-center gap-2 px-7 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-teal-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:-translate-y-0.5"
            >
              Konsultasi Gratis
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Tombol Hamburger Mobile (Hanya muncul di HP) */}
          <motion.button
            variants={itemVariants}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-teal-600 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {/* Animasi rotasi saat ganti icon */}
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* ========================================= */}
        {/* DROPDOWN MENU MOBILE (Muncul saat diklik) */}
        {/* ========================================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-4 flex flex-col gap-2 md:hidden z-40"
            >
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  // Tutup otomatis saat link diklik
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-semibold transition-colors group"
                >
                  <div className="p-2 bg-slate-100 rounded-xl text-teal-600 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-base">{item.name}</span>
                </Link>
              ))}

              {/* Garis pemisah */}
              <div className="h-px w-full bg-slate-200 my-2"></div>

              {/* Tombol CTA Mobile */}
              <Link
                href="#kontak"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex justify-center items-center gap-2 py-4 mt-2 bg-slate-900 text-white font-bold rounded-2xl hover:bg-teal-600 transition-colors active:scale-95"
              >
                Mulai Konsultasi
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. FLOATING NAV ACETERNITY (Tetap ada saat di-scroll) */}
      <div className="relative w-full z-50">
        <FloatingNav navItems={navItems} />
      </div>
    </>
  );
}