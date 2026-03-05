'use client';

// Tambahkan import hooks React dan GSAP
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Phone, CheckCircle2 } from 'lucide-react';
import { submitContactForm } from '@/actions/contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Skema Validasi Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama terlalu pendek' }),
  whatsapp_number: z.string().min(10, { message: 'Nomor WA minimal 10 angka' }).regex(/^[0-9]+$/, { message: 'Hanya boleh berisi angka' }),
  business_name: z.string().optional(),
  interest: z.string().min(1, { message: 'Silakan pilih layanan' }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  
  // Ref untuk menempelkan GSAP
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Memanggil Server Action
    const result = await submitContactForm(data);
    
    setSubmitStatus(result);
    setIsSubmitting(false);

    if (result.success) {
      reset(); // Kosongkan form jika berhasil
    }
  };

  // Efek GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Menggunakan timeline agar animasinya berurutan dengan mulus
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Animasi mulai saat section menyentuh 80% layar
        }
      });

      tl.from('.contact-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.contact-form', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4'); // Dimulai 0.4 detik lebih awal sebelum header selesai
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Tempelkan ref di section utama
    <section id="kontak" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tambahkan class contact-header */}
        <div className="contact-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Siap Mendigitalisasi <span className="text-teal-600">Bisnis Anda?</span>
          </h2>
          <p className="text-lg text-slate-600">
            Isi form di bawah ini untuk konsultasi gratis. Tim BizzTrack akan menghubungi Anda melalui WhatsApp.
          </p>
        </div>

        {/* Tambahkan class contact-form */}
        <div className="contact-form bg-white rounded-3xl shadow-xl shadow-teal-500/10 border border-slate-100 p-8 md:p-12">
          {submitStatus?.success ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto h-16 w-16 text-teal-500 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Terima Kasih!</h3>
              <p className="text-slate-600">{submitStatus.message}</p>
              <button 
                onClick={() => setSubmitStatus(null)}
                className="mt-6 text-teal-600 font-semibold hover:text-teal-700 underline"
              >
                Kirim pesan lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Nama Lengkap *</label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Budi Santoso"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Nomor WhatsApp *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-slate-500" />
                    </div>
                    <input
                      {...register('whatsapp_number')}
                      className="w-full pl-10 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="08123456789"
                    />
                  </div>
                  {errors.whatsapp_number && <p className="mt-1 text-sm text-red-500">{errors.whatsapp_number.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Nama Toko/Bisnis (Opsional)</label>
                  <input
                    {...register('business_name')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Toko Jaya Abadi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Layanan yang Diminati *</label>
                  <select
                    {...register('interest')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                  >
                    <option value="">-- Pilih Layanan --</option>
                    <option value="Web Company Profile">Web Company Profile</option>
                    <option value="Toko Online / E-Commerce">Toko Online / E-Commerce</option>
                    <option value="Sistem Kasir / POS">Sistem Kasir / Pembukuan</option>
                    <option value="Lainnya">Custom / Lainnya</option>
                  </select>
                  {errors.interest && <p className="mt-1 text-sm text-red-500">{errors.interest.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Ceritakan Kebutuhan Anda (Opsional)</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none"
                  placeholder="Contoh: Saya butuh web yang bisa untuk pesanan seperti Print Go..."
                ></textarea>
              </div>

              {submitStatus?.success === false && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? 'Mengirim Pesan...' : (
                  <>Kirim Pesan Sekarang <Send size={20} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}