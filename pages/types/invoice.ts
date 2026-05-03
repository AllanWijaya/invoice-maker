export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
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
}
