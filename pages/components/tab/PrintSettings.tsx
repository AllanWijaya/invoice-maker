/* eslint-disable @next/next/no-img-element */

import {
  calculateTotal,
  formatCurrency,
  handleChangeState,
} from "@/lib/Helper";
import { BrandData, InvoiceData, PrintOptions } from "../../../types/invoice";
import { Dispatch } from "react";
import {
  Printer,
  FileText,
  Info,
  Check,
  FileCheck2,
  PrinterCheck,
} from "lucide-react";
import MyButton from "../form/MyButton";

interface PrintSettingsProps {
  brandData: BrandData;
  invoiceData: InvoiceData;
  handlePrint: () => void;
  printOptions: PrintOptions;
  onPrintOptions: Dispatch<React.SetStateAction<PrintOptions>>;
}

export default function PrintSettings({
  brandData = {
    logo: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    footerText: "",
    taxRate: 0,
    accentColor: "#0d6efd",
    jenisTransaksi: "non-ppn",
  },
  invoiceData = {
    invoiceNo: "",
    date: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    notes: "",
  },
  handlePrint,
  printOptions,
  onPrintOptions,
}: PrintSettingsProps) {
  return (
    <div className="space-y-6 text-sm text-zinc-700">
      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 text-center">
        <div className="mx-auto max-w-full overflow-hidden rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
          <span className="text-xs font-medium text-zinc-400">
            Preview Ringkas Cetak
          </span>
          <div className="mt-2 space-y-2 rounded-md border border-zinc-100 p-3 text-left">
            <div className="flex items-center gap-2">
              {brandData.logo && (
                <img
                  src={brandData.logo}
                  alt="Logo"
                  className="h-6 object-contain"
                />
              )}
              <span className="font-semibold text-zinc-900">
                {brandData.companyName || "Invoice"}
              </span>
            </div>
            <hr className="border-zinc-200" />
            <div className="text-xs text-zinc-600">
              No:{" "}
              <span className="font-mono font-medium text-zinc-800">
                {invoiceData.invoiceNo || "-"}
              </span>
            </div>
            <hr className="border-zinc-200" />
            <div className="rounded-md bg-zinc-50 p-2 text-center">
              <span className="text-xs font-medium text-zinc-600">
                Total:{" "}
                <span className="font-semibold text-zinc-900">
                  {formatCurrency(
                    calculateTotal(
                      invoiceData.items,
                      brandData.taxRate,
                      brandData.jenisTransaksi,
                    ),
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Pengaturan Cetak
        </label>

        <div className="flex items-start gap-3 rounded-xl border border-sky-200/60 bg-sky-50/60 p-3.5 text-xs text-sky-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
          <div className="space-y-1">
            <p className="font-medium">
              Gunakan dialog cetak browser (Ctrl+P / Cmd+P) untuk penyesuaian:
            </p>
            <ul className="list-inside list-disc space-y-0.5 text-sky-800">
              <li>Ukuran kertas (A4, Letter, Continuous, dll.)</li>
              <li>Orientasi (Portrait / Landscape)</li>
              <li>Margin cetak dan header/footer browser</li>
              <li>Jumlah salinan (copies)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label
          htmlFor="kertasA4"
          className={`relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-3.5 transition-all ${
            printOptions?.pageSize === "a4"
              ? "border-zinc-900 bg-zinc-900/5"
              : "border-zinc-200 bg-white hover:border-zinc-300"
          }`}
        >
          <input
            type="radio"
            name="pageSize"
            value="a4"
            id="kertasA4"
            className="sr-only"
            onChange={(e) => handleChangeState(e, onPrintOptions)}
            checked={printOptions?.pageSize === "a4"}
          />
          <div className="mb-2 flex items-center justify-between">
            <span
              className={`font-semibold ${
                printOptions?.pageSize === "a4"
                  ? "text-zinc-900"
                  : "text-zinc-700"
              }`}
            >
              Kertas A4
            </span>
            <FileText
              className={`h-5 w-5 ${
                printOptions?.pageSize === "a4"
                  ? "text-zinc-900"
                  : "text-zinc-400"
              }`}
            />
          </div>
          <span className="text-[11px] text-zinc-500">
            210 x 297 mm • Standar Laporan
          </span>
        </label>

        <label
          htmlFor="kertasContinuous"
          className={`relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-3.5 transition-all ${
            printOptions?.pageSize === "continuous"
              ? "border-zinc-900 bg-zinc-900/5"
              : "border-zinc-200 bg-white hover:border-zinc-300"
          }`}
        >
          <input
            type="radio"
            name="pageSize"
            value="continuous"
            id="kertasContinuous"
            className="sr-only"
            onChange={(e) => handleChangeState(e, onPrintOptions)}
            checked={printOptions?.pageSize === "continuous"}
          />
          <div className="mb-2 flex items-center justify-between">
            <span
              className={`font-semibold ${
                printOptions?.pageSize === "continuous"
                  ? "text-zinc-900"
                  : "text-zinc-700"
              }`}
            >
              Continuous Form
            </span>
            <Printer
              className={`h-5 w-5 ${
                printOptions?.pageSize === "continuous"
                  ? "text-zinc-900"
                  : "text-zinc-400"
              }`}
            />
          </div>
          <span className="text-[11px] text-zinc-500">
            9.5 x 11 inch • Dot Matrix / Faktur
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <MyButton onClick={handlePrint}>
          <PrinterCheck className="h-4 w-4" />
          Cetak Invoice
        </MyButton>
        <MyButton onClick={() => window.print()}>
          <FileCheck2 className="h-4 w-4 text-zinc-500" />
          Cetak via Native Dialog (Ctrl+P)
        </MyButton>
      </div>

      <hr className="border-zinc-200" />

      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Elemen Yang Ikut Dicetak:
        </label>

        <div className="space-y-2.5 text-xs text-zinc-600">
          <div className="flex items-center gap-2.5">
            <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-zinc-100">
              <Check className="h-3 w-3 text-zinc-700" />
            </div>
            <span>
              Logo Perusahaan{" "}
              {brandData.logo ? (
                <span className="font-semibold text-emerald-600">
                  (Tersedia)
                </span>
              ) : (
                <span className="text-zinc-400">(Belum diupload)</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-zinc-100">
              <Check className="h-3 w-3 text-zinc-700" />
            </div>
            <span>Informasi Perusahaan</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-zinc-100">
              <Check className="h-3 w-3 text-zinc-700" />
            </div>
            <span>Informasi Klien</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-zinc-100">
              <Check className="h-3 w-3 text-zinc-700" />
            </div>
            <span>Daftar Item ({invoiceData.items?.length || 0} item)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-zinc-100">
              <Check className="h-3 w-3 text-zinc-700" />
            </div>
            <span>
              Footer Teks{" "}
              {brandData.footerText && (
                <span className="font-semibold text-emerald-600">(Aktif)</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
