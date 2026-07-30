import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BrandData, InvoiceData } from "@/types/invoice";

export interface PrintOptions {
  pageSize: string;
  orientation: "portrait" | "landscape";
}

interface AppConfigState {
  invoiceData: InvoiceData;
  brandData: BrandData;
  printOptions: PrintOptions;

  setInvoiceData: (data: Partial<InvoiceData>) => void;
  setBrandData: (data: Partial<BrandData>) => void;
  setPrintOptions: (data: Partial<PrintOptions>) => void;

  resetInvoiceData: () => void;
  resetBrandData: () => void;
  resetPrintOptions: () => void;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

const createDefaultInvoice = (): InvoiceData => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return {
    invoiceNo: `INV-${year}${month}${day}-001`,
    date: now.toISOString().split("T")[0],
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    notes: "Terima kasih atas kepercayaan Anda",
  };
};

const defaultInvoiceData: InvoiceData = createDefaultInvoice();

export const defaultBrandData: BrandData = {
  companyName: "",
  companyAddress: "",
  companyPhone: "",
  companyEmail: "",
  companyNPWP: "",
  logo: null,
  footerText: "",
  taxRate: 11,
  accentColor: "#3b82f6",
  jenisTransaksi: "non-ppn",
  useLetterhead: true,
  esign: null,
};

export const defaultPrintOptions: PrintOptions = {
  pageSize: "a4",
  orientation: "portrait",
};

export const useAppConfigStore = create<AppConfigState>()(
  persist(
    (set) => ({
      invoiceData: defaultInvoiceData,
      brandData: defaultBrandData,
      printOptions: defaultPrintOptions,

      setInvoiceData: (data) =>
        set((state) => ({
          invoiceData: {
            ...state.invoiceData,
            ...data,
          },
        })),

      setBrandData: (data) =>
        set((state) => ({
          brandData: {
            ...state.brandData,
            ...data,
          },
        })),

      setPrintOptions: (data) =>
        set((state) => ({
          printOptions: {
            ...state.printOptions,
            ...data,
          },
        })),

      resetInvoiceData: () =>
        set({
          invoiceData: defaultInvoiceData,
        }),

      resetBrandData: () =>
        set({
          brandData: defaultBrandData,
        }),

      resetPrintOptions: () =>
        set({
          printOptions: defaultPrintOptions,
        }),

      hasHydrated: false,
      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),
    }),
    {
      name: "app-config",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
