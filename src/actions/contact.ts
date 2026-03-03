'use server';

import { supabase } from '@/lib/supabase';
import { InquiryForm } from '@/types';

export async function submitContactForm(data: InquiryForm) {
  try {
    // Memasukkan data ke tabel 'inquiries' di Supabase
    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: data.name,
          whatsapp_number: data.whatsapp_number,
          business_name: data.business_name,
          interest: data.interest,
          message: data.message,
          status: 'new', // Status default
        }
      ]);

    if (error) {
      console.error('Supabase Error:', error);
      return { success: false, message: 'Gagal mengirim pesan. Silakan coba lagi.' };
    }

    return { success: true, message: 'Pesan berhasil terkirim! Tim kami akan segera menghubungi Anda via WhatsApp.' };
  } catch (err) {
    console.error('Server Error:', err);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
  }
}