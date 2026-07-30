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

export const createDefaultInvoice = (): InvoiceData => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return {
    invoiceNo: `INV-${year}${month}${day}-001`,
    date: now.toISOString().split("T")[0],

    place: "",
    POnumber: "",
    POdate: "",

    clientName: "",
    clientEmail: "",
    clientAddress: "",

    items: [],

    isCustomInputPrice: false,
    subTotal: 0,
    dppAmount: 0,
    taxAmount: 0,
    totalPrice: 0,

    notes: "Terima kasih atas kepercayaan Anda",

    receiver: "Penerima",
    receiver_name: "",

    best_regards: "Hormat Kami",
    best_regards_name: "",

    space_best_regards: 4,

    toClient: "",
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
