"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FloatingNav } from "@/components/ui/floating-navbar"; 
import { Home, Briefcase, FolderOpen, Phone } from "lucide-react";

export default function Navbar() {
  // Data menu untuk Floating Nav Aceternity
  const navItems = [
    {
      name: "Beranda",
      link: "/",
      icon: <Home className="h-4 w-4 text-slate-500" />,
    },
    {
      name: "Layanan",
      link: "#layanan",
      icon: <Briefcase className="h-4 w-4 text-slate-500" />,
    },
    {
      name: "Portofolio",
      link: "#portofolio",
      icon: <FolderOpen className="h-4 w-4 text-slate-500" />,
    },
    {
      name: "Kontak",
      link: "#kontak",
      icon: <Phone className="h-4 w-4 text-slate-500" />,
    },
  ];

  return (
    <>
      {/* 1. NAVBAR STATIS (Hanya untuk posisi paling atas) */}
      <header className="absolute top-0 left-0 w-full z-40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Kiri */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Jika Anda punya file logo.png, Anda bisa pakai Image ini. 
                Atau kalau mau pakai teks sementara, ganti dengan tag <span> */}
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">
              Bizz<span className="text-teal-600">Track</span>
            </span>
          </Link>

          {/* Menu Tengah Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#layanan" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Layanan</Link>
            <Link href="#portofolio" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Karya</Link>
            <Link href="#kontak" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Kontak</Link>
          </nav>

          {/* Tombol Kanan Desktop */}
          <div className="hidden md:block">
            <Link 
              href="#kontak" 
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-teal-600 transition-all hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 inline-block"
            >
              Konsultasi Gratis
            </Link>
          </div>

        </div>
      </header>

      {/* 2. FLOATING NAV ACETERNITY (Mengambil alih saat di-scroll) */}
      <div className="relative w-full z-50">
        <FloatingNav navItems={navItems} />
      </div>
    </>
  );
}