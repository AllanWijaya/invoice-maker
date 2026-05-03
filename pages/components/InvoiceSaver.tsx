import { useState } from "react";
import { InvoiceData } from "../types/invoice";

interface InvoiceSaverProps {
  invoiceData: InvoiceData;
}

export default function InvoiceSaver({ invoiceData }: InvoiceSaverProps) {
  const [saving, setSaving] = useState(false);

  const saveToLocalStorage = () => {
    setSaving(true);

    try {
      const savedInvoices = localStorage.getItem("saved_invoices");
      const invoices = savedInvoices ? JSON.parse(savedInvoices) : [];

      const newInvoice = {
        ...invoiceData,
        savedAt: new Date().toISOString(),
      };

      invoices.push(newInvoice);
      localStorage.setItem("saved_invoices", JSON.stringify(invoices));
      alert("Invoice berhasil disimpan!");
    } catch (err) {
      console.log(err);
      alert("Gagal menyimpan ke Local Storage");
    } finally {
      setSaving(false);
    }
  };

  const downloadAsJson = () => {
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${invoiceData.invoiceNo || "draft"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="d-flex gap-2">
      <button
        onClick={saveToLocalStorage}
        disabled={saving}
        className="btn btn-success btn-sm flex-grow-1"
      >
        💾 Simpan
      </button>
      <button
        onClick={downloadAsJson}
        className="btn btn-primary btn-sm flex-grow-1"
      >
        📥 Download JSON
      </button>
    </div>
  );
}
