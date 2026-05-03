import { useState, useRef } from "react";
import { InvoiceItem } from "../../types/invoice";

interface JsonUploaderProps {
  onLoadItems: (items: InvoiceItem[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoadFullInvoice?: (data: any) => void;
  mode?: "items" | "full";
}

export default function JsonUploader({
  onLoadItems,
  onLoadFullInvoice,
  mode = "items",
}: JsonUploaderProps) {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file.type !== "application/json") {
      alert("File harus berformat JSON");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);

        if (mode === "items") {
          if (Array.isArray(jsonData)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const itemsWithIds = jsonData.map((item: any, index: number) => ({
              description: item.description || "",
              quantity: item.quantity || 1,
              price: item.price || 0,
              id: Date.now() + index,
            }));
            onLoadItems(itemsWithIds);
            alert("Items berhasil di load!");
          } else {
            alert("Format harus array of items");
          }
        } else {
          if (jsonData.invoiceNo && jsonData.items) {
            onLoadFullInvoice?.(jsonData);
            alert("Invoice lengkap berhasil di load!");
          } else {
            alert("Format JSON tidak valid untuk invoice lengkap");
          }
        }
      } catch (err) {
        console.log(err);
        alert("Gagal parsing file JSON");
      }
    };

    reader.readAsText(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clearFile = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="d-none"
      />

      {!fileName ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-outline-secondary btn-sm w-100"
        >
          📂 {mode === "items" ? "Load Items.json" : "Load Full Invoice.json"}
        </button>
      ) : (
        <div className="d-flex justify-content-between align-items-center border rounded p-2 bg-light">
          <span className="small text-truncate">📄 {fileName}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="btn btn-sm btn-link text-danger p-0"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
