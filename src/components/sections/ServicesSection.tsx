'use client';

import { motion, Variants } from 'framer-motion';
import { MonitorSmartphone, ShoppingCart, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// Import Tilt!
import Tilt from 'react-parallax-tilt';

// ... (Data services dan Variants tetap sama persis) ...
const services = [
  {
    icon: <MonitorSmartphone size={32} className="text-teal-600" />,
    title: 'Basic Package',
    price: '300K',
    description: 'Solusi website sederhana untuk memulai kehadiran digital bisnis Anda dengan fitur esensial.',
    features: [
      '2 Halaman',
      'Desain Responsif',
      'SEO Dasar',
      'Free Hosting (1 Tahun)',
      'Email Support'
    ],
  },
  {
    icon: <ShoppingCart size={32} className="text-teal-600" />,
    title: 'Standard Package',
    price: '450K',
    description: 'Paket lengkap untuk bisnis yang ingin tampil lebih profesional dengan fitur tambahan dan support prioritas.',
    features: [
      '3-4 Halaman',
      'Semua Fitur Basic',
      'Integrasi Chat & Media Sosial',
      'Free Domain (1 Tahun)',
      'Support Prioritas'
    ],
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ServicesSection() {
  return (
    <section id="layanan" className="py-24 bg-white relative overflow-hidden">
      {/* ... (Background Blob dan Header Title tetap sama) ... */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm mb-3 block">
            Keahlian Kami
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Solusi Digital untuk Bisnis Anda
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Kami tidak sekadar membuat website, kami membangun sistem yang membantu bisnis Anda beroperasi lebih cerdas, cepat, dan menguntungkan.
          </p>
        </motion.div>

        {/* Grid Layanan dengan Efek TILT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              {/* Ini dia sihir 3D-nya! */}
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#14b8a6" // Warna pantulan cahaya (teal)
                glarePosition="all"
                className="h-full"
              >
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-500/10 transition-shadow duration-500 group relative h-full flex flex-col">
                  {/* Ikon */}
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-600 transition-all duration-300">
                    <div className="group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Konten */}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <div className="mt-3 mb-4">
                    <span className="text-4xl font-extrabold text-teal-500">
                      {service.price}
                    </span>
                    <span className="text-slate-500 text-sm ml-1">/project</span>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed grow">
                    {service.description}
                  </p>

                  {/* Fitur List */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-700 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href="#kontak"
                    className="inline-flex items-center text-teal-600 font-bold group-hover:text-teal-700 transition-colors mt-auto"
                  >
                    Konsultasi Sekarang
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}