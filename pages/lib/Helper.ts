import { InvoiceItem } from "../types/invoice";

export const calculateSubtotal = (items: InvoiceItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
};

export const calculateTax = (items: InvoiceItem[], taxRate: number) => {
  return calculateSubtotal(items) * (taxRate / 100);
};

export const calculateTotal = (items: InvoiceItem[], taxRate: number) => {
  return calculateSubtotal(items) + calculateTax(items, taxRate);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};
