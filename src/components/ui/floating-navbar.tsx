"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
        className={cn(
          // Mempercantik efek Glassmorphism & Shadow Tosca tipis
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto border border-white/40 rounded-full bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(20,184,166,0.15)] z-5000 px-4 py-3 items-center justify-center space-x-2 md:space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-2 text-slate-600 hover:text-teal-700 transition-colors px-4 py-2 rounded-full group"
            )}
          >
            {/* Bubble Hover Effect */}
            <span className="absolute inset-0 w-full h-full bg-slate-100/80 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 ease-out -z-10" />
            
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm font-bold">{navItem.name}</span>
          </Link>
        ))}
        
        {/* Tombol khas Aceternity dengan efek glow di bawahnya */}
        <Link 
          href="#kontak" 
          className="relative border border-teal-500/30 text-teal-700 text-sm font-bold px-6 py-2 rounded-full hover:bg-teal-50 transition-colors overflow-hidden group ml-2"
        >
          <span className="relative z-10">Mulai Proyek</span>
          {/* Garis gradasi diperbaiki menggunakan bg-gradient-to-r */}
          <span className="absolute inset-x-0 w-3/4 mx-auto -bottom-px bg-linear-to-r from-transparent via-teal-500 to-transparent h-px opacity-70 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};