import { handleChangeStateZustand } from "@/lib/Helper";
import { InvoiceData } from "../../../types/invoice";
import { Printer, Check, FileCheck2, PrinterCheck } from "lucide-react";
import MyButton from "../form/MyButton";
import { useAppConfigStore } from "@/hooks/store/appConfigStore";

interface PrintSettingsProps {
  invoiceData: InvoiceData;
  handlePrint: () => void;
  downloadPdf: () => void;
}

type PAGE_CONFIG_TYPE = Record<
  string,
  {
    label: string;
    width: number;
    height: number | null;
    continuous?: boolean;
    description?: string;
  }
>;

export const PAGE_CONFIG: PAGE_CONFIG_TYPE = {
  a4: {
    label: "A4",
    width: 210,
    height: 297,
  },
  a5: {
    label: "A5",
    width: 148,
    height: 210,
  },
  letter: {
    label: "Letter",
    width: 216,
    height: 279,
  },
  continuous: {
    label: "Continuous Form",
    width: 241.3, // 9.5 inch
    height: 279.4, // 11 inch
    continuous: true,
    description: "Dot Matrix / Faktur",
  },
  thermal58: {
    label: "Thermal 58 mm",
    width: 58,
    height: 0,
    continuous: true,
  },
  thermal80: {
    label: "Thermal 80 mm",
    width: 80,
    height: 0,
    continuous: true,
  },
} as const;

export default function PrintSettings({
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
  downloadPdf,
}: PrintSettingsProps) {
  const { brandData, printOptions, setPrintOptions } = useAppConfigStore();

  return (
    <div className="space-y-6 text-sm text-zinc-700">
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Pengaturan Cetak
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(PAGE_CONFIG).map(([id, paper]) => {
          const active = printOptions?.pageSize === id;

          return (
            <label
              key={id}
              htmlFor={`paper-${id}`}
              className={`relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-3.5 transition-all ${
                active
                  ? "border-zinc-900 bg-zinc-900/5"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <input
                id={`paper-${id}`}
                type="radio"
                name="pageSize"
                value={id}
                checked={active}
                onChange={(e) => handleChangeStateZustand(e, setPrintOptions)}
                className="sr-only"
              />

              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`font-semibold ${
                    active ? "text-zinc-900" : "text-zinc-700"
                  }`}
                >
                  {paper.label}
                </span>

                <Printer
                  className={`h-5 w-5 ${
                    active ? "text-zinc-900" : "text-zinc-400"
                  }`}
                />
              </div>

              <span className="text-[11px] text-zinc-500">
                {paper.description}
              </span>
            </label>
          );
        })}
      </div>

      <div className="space-y-2">
        <MyButton onClick={handlePrint}>
          <PrinterCheck className="h-4 w-4" />
          Cetak Invoice
        </MyButton>
        <MyButton onClick={downloadPdf}>
          <FileCheck2 className="h-4 w-4" />
          Download PDF
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
