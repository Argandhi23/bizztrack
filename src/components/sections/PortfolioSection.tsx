import { supabase } from '@/lib/supabase';
import PortfolioGrid from './PortfolioGrid'; // Import komponen Grid animasi kita

async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return projects;
}

export default async function PortfolioSection() {
  const projects = await getProjects();

  return (
    <section id="portofolio" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm mb-3 block">
            Studi Kasus
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Karya Terbaik <span className="text-teal-600">Kami</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bukti nyata bagaimana kami membantu bisnis mendigitalisasi proses mereka. Dari web company profile hingga sistem pemesanan online tingkat lanjut.
          </p>
        </div>

        {/* Panggil komponen Grid Animasi dan masukkan datanya (props) */}
        <PortfolioGrid projects={projects} />

      </div>
    </section>
  );
}