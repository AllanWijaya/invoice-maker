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
