export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  client_name?: string;
  live_url?: string;
  created_at: string;
}

export interface InquiryForm {
  name: string;
  whatsapp_number: string;
  business_name?: string;
  interest: string;
  message?: string;
}