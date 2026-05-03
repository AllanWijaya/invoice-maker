"use client";

import { Upload, FileJson, X } from "lucide-react";
import { useState, useRef } from "react";
import { InvoiceItem } from "@/types/invoice";

interface JsonUploaderProps {
  onLoadItems: (items: InvoiceItem[]) => void;
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
            const itemsWithIds = jsonData.map((item: any, index: number) => ({
              description: item.description || "",
              quantity: item.quantity || 1,
              price: item.price || 0,
              id: Date.now() + index,
            }));
            onLoadItems(itemsWithIds);
          } else {
            alert("Format harus array of items");
          }
        } else {
          onLoadFullInvoice?.(jsonData);
        }
      } catch (err) {
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
    <div
      onClick={() => fileInputRef.current?.click()}
      className="cursor-pointer"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!fileName ? (
        <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-indigo-300 transition">
          <Upload className="mx-auto h-5 w-5 text-gray-400" />
          <p className="mt-1 text-xs text-gray-500">
            {mode === "items"
              ? "Upload items.json"
              : "Upload full invoice.json"}
          </p>
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileJson className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-600 truncate">{fileName}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
