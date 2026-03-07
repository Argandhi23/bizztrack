'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Berapa lama proses pembuatan sistem atau website?",
    answer: "Tergantung kompleksitas. Untuk Web Profile standar memakan waktu 3-7 hari. Namun untuk Custom System (E-Commerce, POS, atau Aplikasi Web Kompleks) membutuhkan waktu 2 hingga 6 minggu untuk memastikan arsitektur database dan keamanannya sempurna."
  },
  {
    question: "Apakah BizzTrack menyediakan domain dan server/hosting?",
    answer: "Ya, betul. Semua paket pembuatan kami sudah *All-In*, mencakup Gratis Domain (.com / .id) dan Cloud Server berkecepatan tinggi selama 1 tahun pertama. Anda cukup terima beres."
  },
  {
    question: "Apakah sistemnya aman dari hacker atau kebocoran data?",
    answer: "Keamanan adalah prioritas kami. Kami menggunakan teknologi modern (seperti enkripsi kata sandi, perlindungan injeksi SQL di Supabase/Database, dan API yang diamankan) untuk menjaga integritas data bisnis Anda."
  },
  {
    question: "Bagaimana jika terjadi error (bug) setelah serah terima?",
    answer: "Setiap sistem yang kami rilis dilindungi oleh Garansi Maintenance & Bug Fixing. Jika ada error teknis dari kode kami, tim support kami akan langsung menanganinya tanpa biaya tambahan selama masa garansi."
  },
  {
    question: "Apakah fitur website bisa ditambah di kemudian hari?",
    answer: "Sangat bisa! Sistem kami dibangun dengan arsitektur yang *scalable* (mudah diperbesar). Kapanpun bisnis Anda berkembang dan butuh fitur baru, kami siap mengembangkan modul tambahannya."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Mengubah background utama menjadi bg-slate-950
    <section className="py-24 bg-slate-950 relative overflow-hidden z-10">
      
      {/* Efek glow tipis di kiri atas FAQ */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-teal-400 font-semibold tracking-wider uppercase text-sm mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Pertanyaan yang Sering <span className="text-teal-400">Diajukan</span>
          </h2>
          <p className="text-lg text-slate-400">
            Masih ragu? Temukan jawaban atas pertanyaan umum terkait proses pengembangan sistem kami.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                // Warna card FAQ juga disesuaikan menjadi turunan dari slate
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-teal-500/50 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.1)]' 
                    : 'border-slate-800 bg-slate-900/50 hover:border-teal-500/30 hover:bg-slate-900'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-teal-400' : 'text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ml-4 ${isOpen ? 'text-teal-400' : 'text-slate-500'}`}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-400 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}