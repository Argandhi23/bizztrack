import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsapp';

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* 1. Navigasi Atas */}
      <Navbar />
      
      {/* 2. Hero (Pengenalan Utama) */}
      <HeroSection />
      
      
      {/* 4. Cara Kerja (Edukasi Klien - Background Terang) */}
      <WorkflowSection />
      
      {/* 5. Layanan & Harga (Penawaran - Background Gelap) */}
      <ServicesSection />
      
      {/* 6. Portofolio (Bukti Kerja - Background Terang) */}
      <PortfolioSection />
      
      {/* 7. FAQ (Menjawab Keraguan - Background Terang) */}
      <FaqSection />
      
      {/* 8. Kontak (Call to Action Akhir) */}
      <ContactSection />
      
      {/* 9. Footer (Penutup & Links) */}
      <Footer />
      
      {/* 10. Floating Button (Selalu Melayang) */}
      <FloatingWhatsApp />
    </main>
  );
}