import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceData, BrandData, InvoiceItem } from "./types/invoice";
import Header from "./components/form/Header";
import InvoiceSettings from "./components/tab/InvoiceSettings";
import BrandSettings from "./components/tab/BrandSettings";
import PrintSettings from "./components/tab/PrintSettings";
import { useLocalStorage } from "../hooks/UseLocalStorage";
import InvoicePreview from "./components/InvoicePreview";

export default function Home() {
  const [activeTab, setActiveTab] = useState("invoice");
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNo: `INV-${new Date().getFullYear()}${(new Date().getMonth() + 1)
      .toString()
      .padStart(
        2,
        "0",
      )}${new Date().getDate().toString().padStart(2, "0")}-001`,
    date: new Date().toISOString().split("T")[0],
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    notes: "Terima kasih atas kepercayaan Anda",
  });

  const [brandData, setBrandData] = useLocalStorage<BrandData>(
    "brand_settings",
    {
      companyName: "PT Example Indonesia",
      companyAddress: "Jl. Sudirman No. 123, Jakarta Selatan",
      companyPhone: "(021) 1234-5678",
      companyEmail: "info@example.com",
      logo: null,
      footerText: "Terima kasih atas kepercayaan Anda",
      taxRate: 11,
      accentColor: "#0d6efd",
    },
  );

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now(),
      description: "",
      quantity: 1,
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

  // Load Items dari JSON
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

  // Load Full Invoice
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

  // Save ke Local Storage
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

  // Download JSON
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

  // Load saved invoices
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

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setBrandData({ ...brandData, logo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setBrandData({ ...brandData, logo: null });
  };

  const handlePrint = useReactToPrint({
    contentRef: previewRef, // Gunakan contentRef, bukan content
    documentTitle: `Invoice_${invoiceData.invoiceNo}`,
    onPrintError: (error) => console.error(error),
  });

  const colorOptions = [
    { name: "Biru", value: "#0d6efd" },
    { name: "Hijau", value: "#198754" },
    { name: "Merah", value: "#dc3545" },
    { name: "Ungu", value: "#6f42c1" },
    { name: "Oranye", value: "#fd7e14" },
    { name: "Hitam", value: "#212529" },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <Header
        onSave={saveToLocalStorage}
        onDownload={downloadAsJson}
        onShowHistory={showSavedInvoices}
      />
      <main className="container py-4">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom p-0">
                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === "invoice" ? "active" : ""}`}
                      onClick={() => setActiveTab("invoice")}
                      type="button"
                    >
                      📄 Invoice
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === "brand" ? "active" : ""}`}
                      onClick={() => setActiveTab("brand")}
                      type="button"
                    >
                      🏢 Brand
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === "print" ? "active" : ""}`}
                      onClick={() => setActiveTab("print")}
                      type="button"
                    >
                      🖨️ Cetak
                    </button>
                  </li>
                </ul>
              </div>
              <div
                className="card-body"
                style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
              >
                <div
                  style={{
                    display: activeTab === "invoice" ? "block" : "none",
                  }}
                >
                  <InvoiceSettings
                    invoiceData={invoiceData}
                    setInvoiceData={setInvoiceData}
                    addItem={addItem}
                    removeItem={removeItem}
                    updateItem={updateItem}
                    handleLoadItemsFromJson={handleLoadItemsFromJson}
                    handleLoadFullInvoice={handleLoadFullInvoice}
                  />
                </div>

                <div
                  style={{ display: activeTab === "brand" ? "block" : "none" }}
                >
                  <BrandSettings
                    brandData={brandData}
                    setBrandData={setBrandData}
                    removeLogo={removeLogo}
                    handleLogoUpload={handleLogoUpload}
                    colorOptions={colorOptions}
                  />
                </div>

                <div
                  style={{ display: activeTab === "print" ? "block" : "none" }}
                >
                  <PrintSettings
                    brandData={brandData}
                    invoiceData={invoiceData}
                    handlePrint={handlePrint}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <InvoicePreview
              previewRef={previewRef}
              brandData={brandData}
              invoiceData={invoiceData}
            />
          </div>
        </div>
      </main>

      <style jsx global>{`
        .nav-tabs .nav-link {
          color: #6c757d;
          border: none;
          padding: 0.75rem 1.25rem;
          transition: all 0.2s;
        }
        .nav-tabs .nav-link:hover {
          color: #0d6efd;
          background-color: transparent;
        }
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          border-bottom: 2px solid #0d6efd;
          background-color: transparent;
        }
        .card-header-tabs {
          margin-right: 0;
          margin-left: 0;
          border-bottom: 1px solid #dee2e6;
        }
        @media print {
          .sticky-top,
          .card-header,
          button,
          .btn,
          .nav-tabs,
          header {
            display: none !important;
          }
          .card {
            border: none !important;
            box-shadow: none !important;
          }
          .bg-light {
            background-color: white !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
