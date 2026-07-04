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
  } else if (jenisTransaksi === "dpp-nilai-lain") {
    // DPP = Subtotal * (taxRate / (taxRate + 1))
    return subtotal * (taxRate / (taxRate + 1));
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
  } else if (jenisTransaksi === "dpp-nilai-lain") {
    const dpp = subtotal * (taxRate / (taxRate + 1));
    return dpp * ((taxRate + 1) / 100);
  }

  // For "exclude-ppn"
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (
  items: InvoiceItem[],
  taxRate: number,
  jenisTransaksi: string,
) => {
  if (["dpp-nilai-lain"].includes(jenisTransaksi)) {
    return (
      calculateSubtotal(items) + calculateTax(items, taxRate, jenisTransaksi)
    );
  } else if (jenisTransaksi === "exclude-ppn") {
    return (
      calculateSubtotal(items) + calculateTax(items, taxRate, jenisTransaksi)
    );
  }
  return calculateSubtotal(items);
};

export const formatCurrency = (amount: number, isCurrency: boolean = false,digit=0) => {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: digit,
  };

  if (isCurrency) {
    options.style = "currency";
    options.currency = "IDR";
  }

  return new Intl.NumberFormat("en-US", options).format(amount);
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
      const p = Math.floor(num / 10);
      const s = num % 10;
      return puluhan[p] + (s ? ` ${satuan[s]}` : "");
    }

    if (num < 1000) {
      const r = Math.floor(num / 100);
      const s = num % 100;

      if (r === 1) {
        return "seratus" + (s ? ` ${numToString(s)}` : "");
      }

      return satuan[r] + " ratus" + (s ? ` ${numToString(s)}` : "");
    }

    return "";
  };

  const integerPart = Math.floor(amount);
  const decimalPart = amount.toString().split(".")[1];

  const chunks: number[] = [];
  let temp = integerPart;

  while (temp > 0) {
    chunks.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  let result = "";

  for (let i = 0; i < chunks.length; i++) {
    if (!chunks[i]) continue;

    let text = numToString(chunks[i]);

    if (i === 1 && chunks[i] === 1) {
      text = "seribu";
    }

    result = `${text} ${ribuan[i]} ${result}`;
  }

  result = result.trim();

  if (decimalPart) {
    const decimalText = decimalPart
      .split("")
      .map((d) => satuan[Number(d)])
      .join(" ");

    result += " koma " + decimalText;
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

export const roundDown = (value: number, digit = 2) => {
  const factor = 10 ** digit;
  return Math.floor(value * factor) / factor;
};