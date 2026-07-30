/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import {
  calculateDPP,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  formatDate,
  formatTerbilang,
  ucwords,
} from "../../lib/Helper";
import { PAGE_CONFIG } from "./tab/PrintSettings";
import { PrintOptions } from "@/hooks/store/appConfigStore";
import { InvoiceData, BrandData } from "@/types/invoice";

interface InvoicePreviewProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  invoiceData: InvoiceData;
  brandData: BrandData;
  printOptions: PrintOptions;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ previewRef, invoiceData, brandData, printOptions }) => {
    const column = {
      no: 3,
      description: 39,
      quantity: 9,
      unit: 9,
      price: 20,
      total: 20,
      terbilang: 10,
    };
    // const invoiceData = useAppConfigStore((s) => s.invoiceData);
    // const brandData = useAppConfigStore((s) => s.brandData);
    // const printOptions = useAppConfigStore((s) => s.printOptions);

    const page = PAGE_CONFIG[printOptions.pageSize ?? "a4"];

    const width =
      printOptions.orientation === "landscape"
        ? (page.height ?? page.width)
        : page.width;

    const height =
      printOptions.orientation === "landscape" ? page.width : page.height;
    return (
      <div className="p-4 bg-slate-100 max-h-[calc(100vh-150px)] overflow-y-auto">
        <div
          ref={previewRef}
          className=" p-6 rounded shadow-sm"
          id="invoice-preview"
          style={{
            width: `${width}mm`,
            height: height ? `${height}mm` : "auto",
            color: "#18181b",
            background: "#ffffff",
          }}
        >
          <div className="border-b-4 border-black pb-1 mb-2">
            <div className="flex justify-between items-start">
              {brandData.useLetterhead ? (
                <div className="w-3/4 flex items-center gap-3">
                  {brandData.logo && (
                    <img
                      src={brandData.logo}
                      alt="Logo"
                      className="w-[100px] shrink-0 object-contain"
                    />
                  )}
                  <div className="w-full">
                    <h2
                      className="text-lg font-bold m-0"
                      style={{ color: brandData.accentColor }}
                    >
                      {brandData.companyName || "INVOICE"}
                    </h2>
                    <p className="custom-text m-0 text-sm text-gray-700">
                      {brandData.companyAddress}
                    </p>
                    <table className="w-full text-xs">
                      <tbody>
                        <tr className="custom-text">
                          <td className="w-[19%]">Telp | Email</td>
                          <td className="w-[1%]">: </td>
                          <td className="w-[60%]">
                            {brandData.companyPhone || ""}
                            {brandData.companyEmail
                              ? ` | ${brandData.companyEmail}`
                              : ""}
                          </td>
                        </tr>
                        <tr className="custom-text">
                          <td className="w-[19%]">NPWP</td>
                          <td className="w-[1%]">: </td>
                          <td className="w-[60%]">
                            {brandData.companyNPWP || ""}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="w-3/4"></div>
              )}
              <div className="w-1/4 text-right text-xs">
                <span className="inline-block bg-gray-500 text-white text-[10px] px-2 py-0.5 rounded mb-1 font-medium">
                  INVOICE
                </span>
                <p className="m-0 font-semibold text-gray-800">
                  {invoiceData.invoiceNo || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="bg-slate-50 p-2 rounded text-xs">
              {invoiceData.toClient ? (
                <>
                  <div className="flex justify-between items-start font-semibold">
                    <p className="custom-text my-0">{invoiceData.toClient}</p>
                    <p className="custom-text my-0">
                      {invoiceData.place && `${invoiceData.place}, `}
                      {invoiceData.date ? formatDate(invoiceData.date) : "-"}
                    </p>
                  </div>
                  <p className="custom-text font-semibold my-0">
                    {invoiceData.clientName || "-"}
                  </p>
                </>
              ) : (
                <div className="flex justify-between items-start font-semibold">
                  <p className="custom-text my-0">
                    {invoiceData.clientName || "-"}
                  </p>
                  <p className="custom-text my-0">
                    {invoiceData.place && `${invoiceData.place}, `}
                    {invoiceData.date ? formatDate(invoiceData.date) : "-"}
                  </p>
                </div>
              )}

              <p className="custom-text my-0 font-semibold">
                {invoiceData.clientEmail || ""}
              </p>
              <p className="custom-text my-0 font-semibold">
                {invoiceData.clientAddress || ""}
              </p>
              <table className="w-full text-xs mt-1">
                <tbody>
                  <tr className="custom-text font-semibold">
                    <td className="w-[10%]">No PO</td>
                    <td className="w-[1%]">:</td>
                    <td className="w-[60%]">{invoiceData.POnumber || ""}</td>
                  </tr>
                  <tr className="custom-text font-semibold">
                    <td className="w-[10%]">Tanggal PO</td>
                    <td className="w-[1%]">:</td>
                    <td className="w-[60%]">{invoiceData.POdate || ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-x-auto custom-text mb-0 pb-0">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-t border-b border-black">
                  <th
                    className="p-1 text-center border-t border-b border-black"
                    style={{ width: `${column.no}%` }}
                  >
                    No
                  </th>
                  <th
                    className="p-1 text-center border-t border-b border-black"
                    style={{ width: `${column.description}%` }}
                  >
                    Nama Barang
                  </th>
                  <th
                    className="p-1 text-center border-t border-b border-black"
                    style={{ width: `${column.quantity}%` }}
                  >
                    Qty
                  </th>
                  <th
                    className="p-1 text-center border-t border-b border-black"
                    style={{ width: `${column.unit}%` }}
                  >
                    Satuan
                  </th>
                  <th
                    className="p-1 text-center border-t border-b border-black"
                    style={{ width: `${column.price}%` }}
                  >
                    Harga Satuan
                  </th>
                  <th
                    className="p-1 text-center border-t border-b border-black"
                    style={{ width: `${column.total}%` }}
                  >
                    Jumlah Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-1 text-center border-t border-b border-black">
                      {item.no}
                    </td>
                    <td className="p-1 px-2 border-t border-b border-black">
                      {item.description || "-"}
                    </td>
                    <td className="p-1 text-center border-t border-b border-black">
                      {item.quantity}
                    </td>
                    <td className="p-1 text-center border-t border-b border-black">
                      {item.unit}
                    </td>
                    <td className="p-1 px-2 border-t border-b border-black">
                      <div className="flex justify-between items-center">
                        <span>Rp.</span>
                        <span>{formatCurrency(item.price, false, 2)}</span>
                      </div>
                    </td>
                    <td className="p-1 px-2 border-t border-b border-black">
                      <div className="flex justify-between items-center">
                        <span>Rp.</span>
                        <span>
                          {formatCurrency(
                            (invoiceData.isCustomInputPrice &&
                              item.totalPrice) ||
                              item.quantity * item.price,
                            false,
                            2,
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td
                    colSpan={4}
                    className="border-t border-b border-black"
                  ></td>
                  <td
                    className="p-1 px-2 border-t border-b border-black"
                    style={{ width: `${column.price}%` }}
                  >
                    Subtotal
                  </td>
                  <td
                    className="p-1 px-2 border-t border-b border-black"
                    style={{ width: `${column.total}%` }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Rp.</span>
                      <span>
                        {formatCurrency(
                          (invoiceData.isCustomInputPrice &&
                            invoiceData.subTotal) ||
                            calculateSubtotal(invoiceData.items),
                          false,
                          2,
                        )}
                      </span>
                    </div>
                  </td>
                </tr>

                {["include-ppn", "exclude-ppn", "dpp-nilai-lain"].includes(
                  brandData.jenisTransaksi,
                ) && (
                  <>
                    {["include-ppn", "dpp-nilai-lain"].includes(
                      brandData.jenisTransaksi,
                    ) && (
                      <tr>
                        <td
                          colSpan={4}
                          className="border-t border-b border-black"
                        ></td>
                        <td
                          className="p-1 px-2 border-t border-b border-black"
                          style={{ width: `${column.price}%` }}
                        >
                          DPP
                        </td>
                        <td
                          className="p-1 px-2 border-t border-b border-black"
                          style={{ width: `${column.total}%` }}
                        >
                          <div className="flex justify-between items-center">
                            <span>Rp.</span>
                            <span>
                              {formatCurrency(
                                (invoiceData.isCustomInputPrice &&
                                  invoiceData.dppAmount) ||
                                  calculateDPP(
                                    invoiceData.items,
                                    brandData.taxRate,
                                    brandData.jenisTransaksi,
                                  ),
                                false,
                                2,
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}

                    {brandData.taxRate > 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="border-t border-b border-black"
                        ></td>
                        <td
                          className="p-1 px-2 border-t border-b border-black"
                          style={{ width: `${column.price}%` }}
                        >
                          PPN{" "}
                          {["dpp-nilai-lain"].includes(brandData.jenisTransaksi)
                            ? brandData.taxRate + 1
                            : brandData.taxRate}
                          %
                        </td>
                        <td
                          className="p-1 px-2 border-t border-b border-black"
                          style={{ width: `${column.total}%` }}
                        >
                          <div className="flex justify-between items-center">
                            <span>Rp.</span>
                            <span>
                              {formatCurrency(
                                (invoiceData.isCustomInputPrice &&
                                  invoiceData.taxAmount) ||
                                  calculateTax(
                                    invoiceData.items,
                                    brandData.taxRate,
                                    brandData.jenisTransaksi,
                                  ),
                                false,
                                2,
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}

                <tr className="font-semibold">
                  <td
                    colSpan={4}
                    className="border-t border-b border-black"
                  ></td>
                  <td
                    className="p-1 px-2 border-t border-b border-black"
                    style={{ width: `${column.price}%` }}
                  >
                    Total Harga
                  </td>
                  <td
                    className="p-1 px-2 border-t border-b border-black"
                    style={{ width: `${column.total}%` }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Rp.</span>
                      <span>
                        {formatCurrency(
                          (invoiceData.isCustomInputPrice &&
                            invoiceData.totalPrice) ||
                            calculateTotal(
                              invoiceData.items,
                              brandData.taxRate,
                              brandData.jenisTransaksi,
                            ),
                          false,
                          2,
                        )}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <table className="custom-text w-full border-t border-black text-xs">
            <tbody>
              <tr>
                <td
                  className="font-semibold pt-1"
                  style={{ width: `${column.terbilang}%` }}
                >
                  Terbilang
                </td>
                <td className="font-semibold pt-1 w-[2%]">:</td>
                <td
                  className="pr-2 font-semibold italic pt-1 w-[80%]"
                  style={{ color: brandData.accentColor }}
                >
                  {ucwords(
                    formatTerbilang(
                      invoiceData.totalPrice ||
                        calculateTotal(
                          invoiceData.items,
                          brandData.taxRate,
                          brandData.jenisTransaksi,
                        ),
                    ),
                  )}{" "}
                  Rupiah
                </td>
              </tr>
            </tbody>
          </table>

          <div className="border-t border-gray-300 pt-1 mt-1 custom-text text-xs">
            <table className="w-full" suppressHydrationWarning>
              <tbody>
                <tr>
                  <td className="w-1/2">
                    <p className="text-center uppercas font-semibold p-0 m-0">
                      {invoiceData.receiver}
                    </p>
                  </td>
                  <td className="w-1/2">
                    <p className="text-center uppercas font-semibold p-0 m-0">
                      {invoiceData.best_regards}
                    </p>
                  </td>
                </tr>
                {brandData.esign ? (
                  <tr>
                    <td className="w-1/2"></td>
                    <td className="flex justify-center items-center">
                      {Array.from({
                        length: invoiceData.space_best_regards || 0,
                      }).map((_, index) => (
                        <br key={index} />
                      ))}
                      <img
                        src={brandData.esign}
                        alt="Company Esign"
                        className="max-h-20 max-w-[180px] object-contain"
                      />
                      {Array.from({
                        length: invoiceData.space_best_regards || 0,
                      }).map((_, index) => (
                        <br key={index} />
                      ))}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={2}>
                      {Array.from({
                        length: invoiceData.space_best_regards || 0,
                      }).map((_, index) => (
                        <br key={index} />
                      ))}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="w-1/2">
                    {invoiceData.receiver_name && (
                      <p className="text-center uppercas font-semibold underline m-0">
                        {invoiceData.receiver_name}
                      </p>
                    )}
                  </td>
                  <td className="w-1/2">
                    {invoiceData.best_regards_name && (
                      <p className="text-center uppercas font-semibold underline m-0">
                        {invoiceData.best_regards_name}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {invoiceData.notes && (
            <div className="border-t border-gray-300 mt-2 pt-1 text-xs">
              <p className="custom-text uppercase font-semibold mb-0">
                Catatan
              </p>
              <div className="custom-text whitespace-pre-line text-gray-700">
                {invoiceData.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
