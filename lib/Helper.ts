import { Dispatch } from "react";
import { InvoiceItem } from "../types/invoice";

export const calculateSubtotal = (items: InvoiceItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
};
export const calculateDPP = (
  items: InvoiceItem[],
  taxRate: number,
  jenisTransaksi: string,
) => {
  const subtotal = calculateSubtotal(items);

  if (jenisTransaksi === "include-ppn") {
    // DPP = Subtotal / (1 + taxRate/100)
    return subtotal / (1 + taxRate / 100);
  }

  // For "exclude-ppn", DPP = Subtotal
  return subtotal;
};

export const calculateTax = (
  items: InvoiceItem[],
  taxRate: number,
  jenisTransaksi: string,
) => {
  const subtotal = calculateSubtotal(items);

  if (jenisTransaksi === "include-ppn") {
    const dpp = subtotal / (1 + taxRate / 100);
    return dpp * (taxRate / 100);
  }

  // For "exclude-ppn"
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (
  items: InvoiceItem[],
  taxRate: number,
  jenisTransaksi: string,
) => {
  if (jenisTransaksi === "include-ppn") {
    return calculateSubtotal(items);
  }
  if (jenisTransaksi === "exclude-ppn") {
    return (
      calculateSubtotal(items) + calculateTax(items, taxRate, jenisTransaksi)
    );
  }
  return calculateSubtotal(items);
};

export const formatCurrency = (amount: number, isCurrency: boolean = false) => {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
  };

  if (isCurrency) {
    options.style = "currency";
    options.currency = "IDR";
  }

  return new Intl.NumberFormat("id-ID", options).format(amount);
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export const formatTerbilang = (amount: number): string => {
  if (amount === 0) return "nol";
  if (amount < 0) return "minus " + formatTerbilang(Math.abs(amount));

  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];
  const belasan = [
    "sepuluh",
    "sebelas",
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
    "enam belas",
    "tujuh belas",
    "delapan belas",
    "sembilan belas",
  ];
  const puluhan = [
    "",
    "",
    "dua puluh",
    "tiga puluh",
    "empat puluh",
    "lima puluh",
    "enam puluh",
    "tujuh puluh",
    "delapan puluh",
    "sembilan puluh",
  ];
  const ribuan = ["", "ribu", "juta", "miliar", "triliun"];

  const numToString = (num: number): string => {
    if (num === 0) return "";
    if (num < 10) return satuan[num];
    if (num < 20) return belasan[num - 10];
    if (num < 100) {
      const puluh = Math.floor(num / 10);
      const sisa = num % 10;
      return puluhan[puluh] + (sisa > 0 ? " " + satuan[sisa] : "");
    }
    if (num < 1000) {
      const ratus = Math.floor(num / 100);
      const sisa = num % 100;
      if (ratus === 1) {
        return "seratus" + (sisa > 0 ? " " + numToString(sisa) : "");
      }
      return (
        satuan[ratus] + " ratus" + (sisa > 0 ? " " + numToString(sisa) : "")
      );
    }
    return "";
  };

  const chunks: number[] = [];
  let temp = amount;
  while (temp > 0) {
    chunks.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  let result = "";
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk === 0) continue;

    let chunkText = numToString(chunk);

    if (i === 1 && chunk === 1) {
      chunkText = "seribu";
    }

    if (i === 0) {
      result = chunkText + " " + result;
    } else {
      result = chunkText + " " + ribuan[i] + " " + result;
    }
  }

  return result.trim();
};

export const ucfirst = (str: string): string => {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const ucwords = (str: string): string => {
  if (!str || str.length === 0) return str;
  return str
    .split(" ")
    .map((word) => ucfirst(word))
    .join(" ");
};

export const handleChangeState = (
  e: React.ChangeEvent<HTMLInputElement>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSet: Dispatch<React.SetStateAction<any>>,
) => {
  const { name, value, type, checked } = e.target;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSet((prev: any) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
