import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { NumericFormat } from "react-number-format";
import { Plus, Trash2, FileCode2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import MyButton from "../form/MyButton";

interface InvoiceSettingsProps {
  invoiceData: InvoiceData;
  setInvoiceData: Dispatch<SetStateAction<InvoiceData>>;
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => void;
  handleLoadItemsFromJson: () => void;
  handleLoadFullInvoice: () => void;
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900";

const numericInputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-right text-xs text-zinc-900 shadow-sm outline-none focus:border-zinc-900";

const sectionTitleClass =
  "block text-xs font-semibold uppercase tracking-wider text-zinc-500";

export default function InvoiceSettings({
  invoiceData = {
    invoiceNo: "",
    date: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    notes: "",
    best_regards: "",
    best_regards_name: "",
    space_best_regards: 3,
    toClient: "",
    isCustomInputPrice: false,
  },
  setInvoiceData,
  addItem,
  removeItem,
  updateItem,
  handleLoadItemsFromJson,
  handleLoadFullInvoice,
}: InvoiceSettingsProps) {
  return (
    <div className="space-y-5 text-sm text-zinc-700">
      <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3.5">
        <div>
          <label
            htmlFor="useCustomInputPriceSwitch"
            className="cursor-pointer font-medium text-zinc-900"
          >
            Gunakan Custom Input Harga
          </label>
          <p className="text-xs text-zinc-500">
            Izinkan pengisian manual untuk total harga item dan ringkasan
          </p>
        </div>
        <button
          type="button"
          role="switch"
          id="useCustomInputPriceSwitch"
          aria-checked={Boolean(invoiceData.isCustomInputPrice)}
          onClick={() =>
            setInvoiceData((prev) => ({
              ...prev,
              isCustomInputPrice: !prev.isCustomInputPrice,
            }))
          }
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            invoiceData.isCustomInputPrice ? "bg-zinc-900" : "bg-zinc-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              invoiceData.isCustomInputPrice ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className={`mb-1 ${sectionTitleClass}`}>No. Invoice</label>
          <input
            type="text"
            className={inputClass}
            value={invoiceData.invoiceNo || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, invoiceNo: e.target.value }))
            }
            placeholder="INV-20250101-001"
          />
        </div>

        <div>
          <label className={`mb-1 ${sectionTitleClass}`}>Tempat</label>
          <input
            type="text"
            className={inputClass}
            value={invoiceData.place || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, place: e.target.value }))
            }
            placeholder="Jakarta"
          />
        </div>

        <div>
          <label className={`mb-1 ${sectionTitleClass}`}>Tanggal</label>
          <input
            type="text"
            className={inputClass}
            value={invoiceData.date || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, date: e.target.value }))
            }
            placeholder="01 Januari 2025"
          />
        </div>
      </div>

      <hr className="border-zinc-200" />

      <div className="space-y-3">
        <span className={sectionTitleClass}>Informasi Klien</span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            className={inputClass}
            placeholder="Kepada YTH"
            value={invoiceData.toClient || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, toClient: e.target.value }))
            }
          />
          <input
            type="text"
            className={inputClass}
            placeholder="Nama Klien"
            value={invoiceData.clientName || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                clientName: e.target.value,
              }))
            }
          />
        </div>

        <input
          type="email"
          className={inputClass}
          placeholder="Email Klien"
          value={invoiceData.clientEmail || ""}
          onChange={(e) =>
            setInvoiceData((prev) => ({ ...prev, clientEmail: e.target.value }))
          }
        />

        <textarea
          rows={2}
          className={inputClass}
          placeholder="Alamat Klien"
          value={invoiceData.clientAddress || ""}
          onChange={(e) =>
            setInvoiceData((prev) => ({
              ...prev,
              clientAddress: e.target.value,
            }))
          }
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            className={inputClass}
            placeholder="No PO"
            value={invoiceData.POnumber || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, POnumber: e.target.value }))
            }
          />
          <input
            type="text"
            className={inputClass}
            placeholder="Tanggal PO"
            value={invoiceData.POdate || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, POdate: e.target.value }))
            }
          />
        </div>
      </div>

      <hr className="border-zinc-200" />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className={sectionTitleClass}>Item Invoice</span>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Item
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 font-medium">Deskripsi</th>
                <th className="w-20 px-2 py-2.5 font-medium text-right">Qty</th>
                <th className="w-28 px-2 py-2.5 font-medium text-right">
                  Harga
                </th>
                <th className="w-20 px-2 py-2.5 font-medium">Satuan</th>
                {invoiceData.isCustomInputPrice && (
                  <th className="w-28 px-2 py-2.5 font-medium text-right">
                    Jumlah
                  </th>
                )}
                <th className="w-10 px-2 py-2.5 text-center font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {invoiceData.items?.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50">
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full rounded-md border border-zinc-200 bg-transparent px-2.5 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900"
                      value={item.description || ""}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Nama item"
                    />
                  </td>
                  <td className="p-2">
                    <NumericFormat
                      className="w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1.5 text-right text-xs text-zinc-900 outline-none focus:border-zinc-900"
                      value={item.quantity}
                      thousandSeparator=","
                      decimalSeparator="."
                      allowNegative={false}
                      onValueChange={(values) =>
                        updateItem(item.id, "quantity", values.floatValue ?? 0)
                      }
                    />
                  </td>
                  <td className="p-2">
                    <NumericFormat
                      className="w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1.5 text-right text-xs text-zinc-900 outline-none focus:border-zinc-900"
                      value={item.price}
                      thousandSeparator=","
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      onValueChange={(values) =>
                        updateItem(item.id, "price", values.floatValue ?? 0)
                      }
                    />
                  </td>
                  {invoiceData.isCustomInputPrice && (
                    <td className="p-2">
                      <NumericFormat
                        className="w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1.5 text-right text-xs text-zinc-900 outline-none focus:border-zinc-900"
                        value={item.totalPrice}
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        onValueChange={(values) =>
                          updateItem(
                            item.id,
                            "totalPrice",
                            values.floatValue ?? 0,
                          )
                        }
                      />
                    </td>
                  )}
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-900"
                      value={item.unit || ""}
                      onChange={(e) =>
                        updateItem(item.id, "unit", e.target.value)
                      }
                      placeholder="Pcs"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded p-1 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Hapus Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!invoiceData.items || invoiceData.items.length === 0) && (
            <div className="p-6 text-center text-xs text-zinc-400">
              Belum ada item ditambahkan.
            </div>
          )}
        </div>
      </div>

      {invoiceData.isCustomInputPrice && (
        <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3.5">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Override Ringkas Penjualan
          </span>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-zinc-600">
                Subtotal
              </label>
              <NumericFormat
                className={numericInputClass}
                value={invoiceData.subTotal}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                onValueChange={({ floatValue }) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    subTotal: floatValue ?? 0,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-zinc-600">DPP</label>
              <NumericFormat
                className={numericInputClass}
                value={invoiceData.dppAmount}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                onValueChange={({ floatValue }) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    dppAmount: floatValue ?? 0,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-zinc-600">PPN</label>
              <NumericFormat
                className={numericInputClass}
                value={invoiceData.taxAmount}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                onValueChange={({ floatValue }) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    taxAmount: floatValue ?? 0,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-900">
                Grand Total
              </label>
              <NumericFormat
                className={`${numericInputClass} font-semibold`}
                value={invoiceData.totalPrice}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                onValueChange={({ floatValue }) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    totalPrice: floatValue ?? 0,
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      <hr className="border-zinc-200" />

      <div className="space-y-4">
        <div>
          <span className={`mb-1 ${sectionTitleClass}`}>Tanda Terima</span>
          <div className="space-y-2">
            <textarea
              rows={2}
              className={inputClass}
              value={invoiceData.receiver || ""}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  receiver: e.target.value,
                }))
              }
              placeholder="Teks tanda terima..."
            />
            <input
              type="text"
              className={inputClass}
              value={invoiceData.receiver_name || ""}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  receiver_name: e.target.value,
                }))
              }
              placeholder="Nama Penerima..."
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className={sectionTitleClass}>Hormat Kami</span>
            <div className="flex items-center gap-2">
              <span className="text-xs">Space (px):</span>
              <input
                type="number"
                className="w-16 rounded-md border bg-white px-2 py-1 text-right text-xs shadow-sm outline-none"
                value={invoiceData.space_best_regards ?? 0}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    space_best_regards: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <textarea
              rows={2}
              className={inputClass}
              value={invoiceData.best_regards || ""}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  best_regards: e.target.value,
                }))
              }
              placeholder="Hormat kami..."
            />
            <input
              type="text"
              className={inputClass}
              value={invoiceData.best_regards_name || ""}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  best_regards_name: e.target.value,
                }))
              }
              placeholder="Nama Hormat Kami..."
            />
          </div>
        </div>

        <div>
          <span className={`mb-1 ${sectionTitleClass}`}>Catatan</span>
          <textarea
            rows={2}
            className={inputClass}
            value={invoiceData.notes || ""}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Catatan untuk klien..."
          />
        </div>
      </div>

      <hr className="border-zinc-200" />

      <div>
        <span className={`mb-2 ${sectionTitleClass}`}>Load Data dari JSON</span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <MyButton onClick={handleLoadItemsFromJson}>
            <FileCode2 className="h-4 w-4 text-zinc-400" />
            Load Items.json
          </MyButton>
          <MyButton onClick={handleLoadFullInvoice}>
            <FileCode2 className="h-4 w-4" />
            Load Full Invoice.json
          </MyButton>
        </div>
      </div>
    </div>
  );
}
