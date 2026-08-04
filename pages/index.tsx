import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceData, BrandData, InvoiceItem } from "../types/invoice";
import Header from "./components/form/Header";
import InvoiceSettings from "./components/tab/InvoiceSettings";
import BrandSettings from "./components/tab/BrandSettings";
import PrintSettings, { PAGE_CONFIG } from "./components/tab/PrintSettings";
import InvoicePreview from "./components/InvoicePreview";
import { FileText, Building2, Printer } from "lucide-react";
import { useRouter } from "next/router";
import { useAppConfigStore } from "@/hooks/store/appConfigStore";
import Footer from "./components/form/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("invoice");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { invoiceData, setInvoiceData, brandData, setBrandData, printOptions } =
    useAppConfigStore();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;
    const savedInvoices = localStorage.getItem("saved_invoices");

    if (savedInvoices && id !== undefined) {
      try {
        const invoices = JSON.parse(savedInvoices);

        if (Array.isArray(invoices) && invoices[Number(id)]) {
          const cleanInvoice = invoices[Number(id)];

          setInvoiceData({
            ...cleanInvoice,
            items: cleanInvoice.items.map(
              (item: InvoiceItem, index: number) => ({
                ...item,
                id: Date.now() + index,
              }),
            ),
          });
          return;
        }
      } catch (error) {
        console.error("Gagal membaca data dari localStorage:", error);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.id]);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now(),
      no: invoiceData.items.length + 1,
      description: "",
      quantity: 1,
      unit: "",
      price: 0,
    };
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items, newItem] });
  };

  const removeItem = (id: number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  const handleLoadItemsFromJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const items = JSON.parse(e.target?.result as string);
            if (Array.isArray(items)) {
              const itemsWithIds = items.map(
                (item: InvoiceItem, index: number) => ({
                  ...item,
                  description: item.description || "",
                  quantity: item.quantity || 1,
                  price: item.price || 0,
                  id: Date.now() + index,
                }),
              );
              setInvoiceData({ ...invoiceData, items: itemsWithIds });
              alert("Items berhasil di load!");
            } else {
              alert("Format JSON harus berupa array of items");
            }
          } catch (err) {
            console.log(err);
            alert("Gagal parsing file JSON");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLoadFullInvoice = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const fullData = JSON.parse(e.target?.result as string);
            if (
              fullData.invoiceNo &&
              fullData.items &&
              Array.isArray(fullData.items)
            ) {
              const itemsWithIds = fullData.items.map(
                (item: InvoiceItem, index: number) => ({
                  ...item,
                  id: Date.now() + index,
                }),
              );
              setInvoiceData({ ...fullData, items: itemsWithIds });
              alert("Invoice lengkap berhasil di load!");
            } else {
              alert("Format JSON tidak valid");
            }
          } catch (err) {
            console.log(err);
            alert("Gagal parsing file JSON");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const saveToLocalStorage = () => {
    try {
      const savedInvoices = localStorage.getItem("saved_invoices");
      const invoices = savedInvoices ? JSON.parse(savedInvoices) : [];
      const newInvoice = { ...invoiceData, savedAt: new Date().toISOString() };
      invoices.push(newInvoice);
      localStorage.setItem("saved_invoices", JSON.stringify(invoices));
      alert("Invoice berhasil disimpan!");
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan");
    }
  };

  const downloadAsJson = () => {
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${invoiceData.invoiceNo}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const showSavedInvoices = () => {
    const saved = localStorage.getItem("saved_invoices");
    if (saved) {
      const invoices = JSON.parse(saved);
      if (invoices.length === 0) {
        alert("Belum ada invoice tersimpan");
        return;
      }
      let message = "📋 Daftar Invoice Tersimpan:\n\n";
      invoices.forEach((inv: InvoiceData, idx: number) => {
        message += `${idx + 1}. ${inv.invoiceNo} - ${inv.clientName || "Tanpa nama"} (${inv.date})\n`;
      });
      message +=
        "\nMasukkan nomor invoice yang akan dimuat (1-" +
        invoices.length +
        "):";
      const choice = prompt(message);
      const index = parseInt(choice || "") - 1;
      if (index >= 0 && index < invoices.length) {
        const { ...cleanInvoice } = invoices[index];
        const itemsWithIds = cleanInvoice.items.map(
          (item: InvoiceItem, i: number) => ({
            ...item,
            id: Date.now() + i,
          }),
        );
        setInvoiceData({ ...cleanInvoice, items: itemsWithIds });
        alert("Invoice berhasil dimuat!");
      }
    } else {
      alert("Belum ada invoice tersimpan");
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof BrandData,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setBrandData({ ...brandData, [key]: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (key: keyof BrandData) => {
    setBrandData({ ...brandData, [key]: null });
  };

  const page = PAGE_CONFIG[printOptions?.pageSize ?? "a4"];

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `Invoice_${invoiceData.invoiceNo}`,
    onPrintError: (error) => console.error(error),
    pageStyle: `
    @page {
      size: ${page.width}mm ${page.height}mm;
      margin: 0;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `,
  });

  const downloadPdf = async () => {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceData,
        brandData,
        printOptions,
      }),
    });

    if (!res.ok) {
      alert("Gagal membuat PDF");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${invoiceData.invoiceNo}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const colorOptions = [
    { name: "Biru", value: "#0d6efd" },
    { name: "Hijau", value: "#198754" },
    { name: "Merah", value: "#dc3545" },
    { name: "Ungu", value: "#6f42c1" },
    { name: "Oranye", value: "#fd7e14" },
    { name: "Hitam", value: "#212529" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-900 antialiased">
      <Header
        onSave={saveToLocalStorage}
        onDownload={downloadAsJson}
        onShowHistory={showSavedInvoices}
      />

      <main className="mx-auto max-w-7xl p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
          <aside className="sticky top-20 rounded-2xl border border-zinc-200/80 bg-white shadow-sm ">
            <div className="border-b border-zinc-100 p-4 sm:p-5">
              <div className="flex rounded-xl bg-zinc-100/80 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("invoice")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all ${
                    activeTab === "invoice"
                      ? "bg-white text-zinc-900 shadow-sm "
                      : "text-zinc-500 hover:text-zinc-900 "
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("brand")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all ${
                    activeTab === "brand"
                      ? "bg-white text-zinc-900 shadow-sm "
                      : "text-zinc-500 hover:text-zinc-900 "
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Brand</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("print")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all ${
                    activeTab === "print"
                      ? "bg-white text-zinc-900 shadow-sm "
                      : "text-zinc-500 hover:text-zinc-900 "
                  }`}
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-4 sm:p-6 custom-scrollbar">
              <div className={activeTab === "invoice" ? "block" : "hidden"}>
                <InvoiceSettings
                  addItem={addItem}
                  removeItem={removeItem}
                  updateItem={updateItem}
                  handleLoadItemsFromJson={handleLoadItemsFromJson}
                  handleLoadFullInvoice={handleLoadFullInvoice}
                />
              </div>

              <div className={activeTab === "brand" ? "block" : "hidden"}>
                <BrandSettings
                  removeImage={removeImage}
                  handleImageUpload={handleImageUpload}
                  colorOptions={colorOptions}
                />
              </div>

              <div className={activeTab === "print" ? "block" : "hidden"}>
                <PrintSettings
                  invoiceData={invoiceData}
                  handlePrint={handlePrint}
                  downloadPdf={downloadPdf}
                />
              </div>
            </div>
          </aside>

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Live Preview
                </span>
              </div>
            </div>

            <div className="flex min-h-[720px] justify-center rounded-2xl border border-zinc-200/80 bg-zinc-100/60 p-4 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40">
              <div className="w-full max-w-[800px]">
                <div
                  className={`custom-text card border-0 shadow-sm sticky top-[100px] bg-white rounded-lg`}
                >
                  <div className="px-4 py-3 bg-white border-b border-gray-200 rounded-t-lg">
                    <h5 className="m-0 text-base font-semibold text-gray-800">
                      Preview Invoice
                    </h5>
                  </div>
                  <div className="p-4 bg-slate-100 max-h-[calc(100vh-150px)] overflow-y-auto">
                    <InvoicePreview
                      previewRef={previewRef}
                      brandData={brandData}
                      invoiceData={invoiceData}
                      printOptions={printOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
