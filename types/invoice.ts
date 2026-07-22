export interface InvoiceItem {
  id: number;
  no: number;
  description: string;
  quantity: number;
  price: number;
  //custom value
  totalPrice?: number;
  unit?: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  place?: string;
  POnumber?: string;
  POdate?: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];

  //custom value
  isCustomInputPrice?: boolean;
  subTotal?: number;
  dppAmount?: number;
  taxAmount?: number;
  totalPrice?: number;

  notes: string;
  receiver?: string;
  receiver_name?: string;
  best_regards?: string;
  best_regards_name?: string;
  space_best_regards?: number;
  toClient?: string;
}

export interface SavedInvoice extends InvoiceData {
  savedAt: string;
}

export type JenisTransaksi = "non-ppn" | "include-ppn" | "exclude-ppn";

export interface BrandData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyNPWP?: string;
  logo: string | null; // base64 or URL
  footerText: string;
  taxRate: number; // PPN dalam persen
  accentColor: string;
  jenisTransaksi: JenisTransaksi;
  useLetterhead?: boolean;
}

export interface PrintOptions {
  pageSize: string;
}
