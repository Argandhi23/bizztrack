'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MonitorSmartphone, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';

const services = [
  {
    icon: <MonitorSmartphone size={32} className="text-teal-400" />,
    title: 'Basic Package',
    price: '300K',
    description: 'Solusi website sederhana untuk memulai kehadiran digital bisnis Anda dengan fitur esensial.',
    features: ['2 Halaman', 'Desain Responsif', 'SEO Dasar', 'Free Hosting (1 Tahun)', 'Email Support'],
  },
  {
    icon: <ShoppingCart size={32} className="text-teal-400" />,
    title: 'Standard Package',
    price: '450K',
    description: 'Paket lengkap untuk bisnis yang ingin tampil lebih profesional dengan fitur tambahan dan support prioritas.',
    features: ['3-4 Halaman', 'Semua Fitur Basic', 'Integrasi Chat & Media Sosial', 'Free Domain (1 Tahun)', 'Support Prioritas'],
  }
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Judul muncul dari bawah
      gsap.from('.services-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Card muncul bergantian (stagger)
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Jeda antar card
        ease: 'back.out(1.2)' // Sedikit efek memantul
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Mengubah bg-black menjadi bg-slate-950 agar senada dengan bagian bawah
    <section id="layanan" ref={sectionRef} className="py-24 bg-slate-950 relative z-10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      
      {/* Background Blob efek Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-teal-400/10 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="services-header text-center mb-16 md:mb-20">
          <span className="text-teal-400 font-semibold tracking-wider uppercase text-sm mb-3 block">Keahlian Kami</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Solusi Digital untuk Bisnis Anda</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Kami tidak sekadar membuat website, kami membangun sistem yang membantu bisnis Anda beroperasi lebih cerdas, cepat, dan menguntungkan.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="service-card h-full">
              <Tilt 
                tiltMaxAngleX={10} 
                tiltMaxAngleY={10} 
                perspective={1000} 
                scale={1.02} 
                transitionSpeed={2000} 
                glareEnable={true} 
                glareMaxOpacity={0.15} 
                glareColor="#2dd4bf" 
                glarePosition="all" 
                className="h-full rounded-3xl"
              >
                {/* Mengubah bg-neutral-900 menjadi bg-slate-900 */}
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-lg shadow-black/40 hover:shadow-2xl hover:border-teal-500/40 hover:shadow-teal-500/20 transition-all duration-500 group relative h-full flex flex-col">
                  
                  <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-400 transition-all duration-300">
                    <div className="group-hover:text-slate-900 transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  
                  <div className="mt-3 mb-4">
                    <span className="text-4xl font-extrabold text-teal-400">{service.price}</span>
                    <span className="text-slate-400 text-sm ml-1">/project</span>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed grow">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-3 shadow-[0_0_8px_rgba(45,212,191,0.6)]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="#kontak" className="inline-flex items-center text-teal-400 font-bold group-hover:text-teal-300 transition-colors mt-auto">
                    Konsultasi Sekarang <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>

                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}