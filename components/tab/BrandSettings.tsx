/* eslint-disable @next/next/no-img-element */
import { useAppConfigStore } from "@/hooks/store/appConfigStore";
import { dataStaticPPN } from "@/types/dataStatic";
import { BrandData, JenisTransaksi } from "@/types/invoice";
import { Upload, Trash2, Check, Image as ImageIcon } from "lucide-react";

interface BrandSettingsProps {
  removeImage: (key: keyof BrandData) => void;
  handleImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof BrandData,
  ) => void;
  colorOptions: { name: string; value: string }[];
}

export default function BrandSettings({
  removeImage,
  handleImageUpload,
  colorOptions = [
    { name: "Biru", value: "#0d6efd" },
    { name: "Hijau", value: "#198754" },
    { name: "Merah", value: "#dc3545" },
    { name: "Ungu", value: "#6f42c1" },
    { name: "Oranye", value: "#fd7e14" },
    { name: "Hitam", value: "#212529" },
  ],
}: BrandSettingsProps) {
  const { brandData, setBrandData } = useAppConfigStore();
  return (
    <div className="space-y-5 text-sm text-zinc-700">
      <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3.5">
        <div>
          <label
            htmlFor="useLetterheadSwitch"
            className="cursor-pointer font-medium text-zinc-900"
          >
            Gunakan Kop Surat
          </label>
          <p className="text-xs text-zinc-500">
            Tampilkan header & identitas resmi perusahaan
          </p>
        </div>
        <button
          type="button"
          role="switch"
          id="useLetterheadSwitch"
          aria-checked={brandData?.useLetterhead}
          onClick={() =>
            setBrandData({
              ...brandData,
              useLetterhead: !brandData?.useLetterhead,
            })
          }
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            brandData?.useLetterhead ? "bg-zinc-900" : "bg-zinc-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              brandData?.useLetterhead ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div>
        <label className="mb-1.5 block font-medium text-zinc-900">
          Logo Perusahaan
        </label>
        <div className="relative flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-4 text-center transition-all hover:bg-zinc-50">
          {brandData.logo ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={brandData.logo}
                alt="Company Logo"
                className="max-h-20 max-w-[180px] object-contain"
              />
              <button
                type="button"
                onClick={() => removeImage("logo")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 shadow-sm transition-all hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Logo
              </button>
            </div>
          ) : (
            <label className="flex w-full cursor-pointer flex-col items-center justify-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-zinc-700">
                Klik untuk unggah{" "}
                <span className="font-normal text-zinc-500">
                  atau drag & drop
                </span>
              </p>
              <p className="mt-1 text-[11px] text-zinc-400">
                SVG, PNG, atau JPG (Max 2MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "logo")}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-medium text-zinc-900">Esign</label>
        <div className="relative flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-4 text-center transition-all hover:bg-zinc-50">
          {brandData?.esign ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={brandData?.esign}
                alt="Company Esign"
                className="max-h-20 max-w-[180px] object-contain"
              />
              <button
                type="button"
                onClick={() => removeImage("esign")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 shadow-sm transition-all hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Esign
              </button>
            </div>
          ) : (
            <label className="flex w-full cursor-pointer flex-col items-center justify-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-zinc-700">
                Klik untuk unggah{" "}
                <span className="font-normal text-zinc-500">
                  atau drag & drop
                </span>
              </p>
              <p className="mt-1 text-[11px] text-zinc-400">
                SVG, PNG, atau JPG (Max 2MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "esign")}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="mb-1 block font-medium text-zinc-900">
            Nama Perusahaan
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            value={brandData.companyName}
            onChange={(e) =>
              setBrandData({ ...brandData, companyName: e.target.value })
            }
            placeholder="PT Example Indonesia"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-zinc-900">
            Alamat Perusahaan
          </label>
          <textarea
            rows={2}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            value={brandData.companyAddress}
            onChange={(e) =>
              setBrandData({ ...brandData, companyAddress: e.target.value })
            }
            placeholder="Jl. Sudirman No. 123, Jakarta"
          />
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium text-zinc-900">
              Telepon
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
              value={brandData.companyPhone}
              onChange={(e) =>
                setBrandData({ ...brandData, companyPhone: e.target.value })
              }
              placeholder="(021) 1234567"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-zinc-900">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
              value={brandData.companyEmail}
              onChange={(e) =>
                setBrandData({ ...brandData, companyEmail: e.target.value })
              }
              placeholder="info@company.com"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block font-medium text-zinc-900">NPWP</label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            value={brandData.companyNPWP}
            onChange={(e) =>
              setBrandData({ ...brandData, companyNPWP: e.target.value })
            }
            placeholder="NPWP Perusahaan"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-zinc-900">
            Teks Footer
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            value={brandData.footerText}
            onChange={(e) =>
              setBrandData({ ...brandData, footerText: e.target.value })
            }
            placeholder="Terima kasih atas kepercayaan Anda"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-medium text-zinc-900">
            PPN / Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.5"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            value={brandData.taxRate}
            onChange={(e) =>
              setBrandData({
                ...brandData,
                taxRate: parseFloat(e.target.value) || 0,
              })
            }
          />
          <span className="mt-1 block text-[11px] text-zinc-400">
            Contoh: 11 untuk PPN 11%
          </span>
        </div>

        <div>
          <label className="mb-1 block font-medium text-zinc-900">
            Jenis Transaksi
          </label>
          <select
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            value={brandData.jenisTransaksi}
            onChange={(e) =>
              setBrandData({
                ...brandData,
                jenisTransaksi: e.target.value as JenisTransaksi,
              })
            }
          >
            {dataStaticPPN.map((_item) => (
              <option key={_item.value} value={_item.value}>
                {_item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-zinc-900">
          Warna Aksen
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {colorOptions.map((color: { value: string; name: string }) => {
            const isSelected = brandData.accentColor === color.value;
            return (
              <button
                key={color.value}
                type="button"
                onClick={() =>
                  setBrandData({ ...brandData, accentColor: color.value })
                }
                className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-transform active:scale-90 ${
                  isSelected ? "ring-2 ring-zinc-900 ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                )}
              </button>
            );
          })}

          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-zinc-200 shadow-sm">
            <input
              type="color"
              className="absolute -inset-2 h-11 w-11 cursor-pointer opacity-0"
              value={brandData.accentColor}
              onChange={(e) =>
                setBrandData({ ...brandData, accentColor: e.target.value })
              }
              title="Custom Color"
            />
            <div
              className="h-full w-full"
              style={{ backgroundColor: brandData.accentColor }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3.5">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Preview Ringkas
        </span>
        <div className="flex items-center gap-3">
          {brandData.logo ? (
            <img
              src={brandData.logo}
              alt="Logo"
              className="h-8 w-auto max-w-[80px] object-contain"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-200/60 text-zinc-400">
              <ImageIcon className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-xs font-semibold"
              style={{ color: brandData.accentColor }}
            >
              {brandData.companyName || "Nama Perusahaan"}
            </p>
            <p className="truncate text-[11px] text-zinc-500">
              {brandData.companyAddress || "Alamat belum diisi"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
