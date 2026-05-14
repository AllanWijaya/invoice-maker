export interface InvoiceItem {
  id: number;
  no: number;
  description: string;
  quantity: number;
  price: number;
  unit?: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
  best_regards?: string;
  toClient?: string;
}

export interface SavedInvoice extends InvoiceData {
  savedAt: string;
}

export interface BrandData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  logo: string | null; // base64 or URL
  footerText: string;
  taxRate: number; // PPN dalam persen
  accentColor: string;
  jenisTransaksi: "non-ppn" | "include-ppn" | "exclude-ppn";
}
