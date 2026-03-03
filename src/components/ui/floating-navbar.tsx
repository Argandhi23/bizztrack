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
    // Memastikan nilai current adalah angka
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // Jika di paling atas, sembunyikan navbar melayang (karena kita pakai navbar statis/hero)
        setVisible(false);
      } else {
        if (direction < 0) {
          // Scroll ke atas -> Munculkan
          setVisible(true);
        } else {
          // Scroll ke bawah -> Sembunyikan
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-slate-200 rounded-full bg-white/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-5000 px-6 py-4 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-slate-600 hover:text-teal-600 transition-colors"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm font-semibold">{navItem.name}</span>
          </Link>
        ))}
        
        {/* Tombol khas Aceternity dengan efek glow di bawahnya */}
        <Link href="#kontak" className="border text-sm font-bold relative border-slate-200 text-slate-900 px-6 py-2 rounded-full hover:bg-slate-50 transition-colors">
          <span>Mulai Proyek</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-teal-500 to-transparent h-px" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};