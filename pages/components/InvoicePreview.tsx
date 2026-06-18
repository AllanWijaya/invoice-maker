/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { BrandData, InvoiceData, PrintOptions } from "../../types/invoice";
import {
  calculateDPP,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  formatDate,
} from "../../lib/Helper";

interface InvoicePreviewProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  invoiceData: InvoiceData;
  brandData: BrandData;
  printOptions?: PrintOptions;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({
    invoiceData = {
      invoiceNo: "",
      date: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      items: [],
      notes: "",
      toClient: null,
    },
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
    previewRef,
    printOptions,
  }) => {
    console.log(printOptions);
    return (
      <div
        className={`${printOptions?.pageSize === "a4" ? "invoice-a4" : "continuous-form"} card border-0 shadow-sm sticky-top`}
        style={{ top: "100px" }}
      >
        <div className="card-header bg-white border-bottom">
          <h5 className="mb-0">Preview Invoice</h5>
        </div>
        <div
          className="card-body bg-light"
          style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
        >
          <div
            ref={previewRef}
            className="bg-white p-4 rounded shadow-sm"
            id="invoice-preview"
          >
            <div className="border-bottom border-3 border-dark pb-3 mb-3">
              <div className="row justify-content-between align-items-start">
                <div className="col-9 d-flex align-items-center gap-3">
                  {brandData.logo && (
                    <img
                      src={brandData.logo}
                      alt="Logo"
                      style={{
                        flexGrow: 1,
                        width: "150px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <div>
                    <h2
                      className="h4 mb-0 fw-bold"
                      style={{ color: brandData.accentColor }}
                    >
                      {brandData.companyName || "INVOICE"}
                    </h2>
                    <p className="custom-text mb-0">
                      {brandData.companyAddress}
                    </p>
                    <p className="custom-text mb-0">
                      {brandData.companyPhone &&
                        `Telp: ${brandData.companyPhone}`}
                      {brandData.companyEmail &&
                        ` | Email: ${brandData.companyEmail}`}
                    </p>
                    <p className="custom-text mb-0">
                      {brandData.companyNPWP &&
                        `NPWP: ${brandData.companyNPWP}`}
                    </p>
                  </div>
                </div>
                <div className="col-3 text-end">
                  <div className="badge bg-secondary mb-1">INVOICE</div>
                  <p className="mb-0 fw-semibold">
                    {invoiceData.invoiceNo || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-light p-3 rounded">
                {invoiceData.toClient ? (
                  <>
                    <div className="d-flex justify-content-between align-items-start  fw-semibold">
                      <p className="custom-text my-0">{invoiceData.toClient}</p>
                      <p className="custom-text my-0">
                        {invoiceData.place && `${invoiceData.place}, `}
                        {invoiceData.date ? formatDate(invoiceData.date) : "-"}
                      </p>
                    </div>
                    <p className="custom-text fw-semibold my-0">
                      {invoiceData.clientName || "-"}
                    </p>
                  </>
                ) : (
                  <div className="d-flex justify-content-between align-items-start  fw-semibold">
                    <p className="custom-text my-0">
                      {invoiceData.clientName || "-"}
                    </p>
                    <p className="custom-text my-0">
                      {invoiceData.place && `${invoiceData.place}, `}
                      {invoiceData.date ? formatDate(invoiceData.date) : "-"}
                    </p>
                  </div>
                )}

                <p className="custom-text my-0  fw-semibold">
                  {invoiceData.clientEmail || ""}
                </p>
                <p className="custom-text my-0  fw-semibold ">
                  {invoiceData.clientAddress || ""}
                </p>
                <table className="w-100">
                  <tr className="fw-semibold">
                    <td style={{ width: "10%" }}>No PO</td>
                    <td style={{ width: "1%" }}>:</td>
                    <td style={{ width: "60%" }}>
                      {invoiceData.POnumber || ""}
                    </td>
                  </tr>
                  <tr className="fw-semibold">
                    <td style={{ width: "10%" }}>Tanggal PO</td>
                    <td style={{ width: "1%" }}>:</td>
                    <td style={{ width: "60%" }}>{invoiceData.POdate || ""}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="table-responsive mb-0 pb-0">
              <table className="table table-sm table-bordered border-dark mb-0">
                <tr>
                  <th className="text-center" style={{ width: "7%" }}>
                    No
                  </th>
                  <th className="text-center" style={{ width: "25%" }}>
                    Nama Barang
                  </th>
                  <th className="text-center" style={{ width: "14%" }}>
                    Qty
                  </th>
                  <th className="text-center" style={{ width: "14%" }}>
                    Satuan
                  </th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Harga Satuan
                  </th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Jumlah Harga
                  </th>
                </tr>
                {invoiceData.items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-0 px-2 text-center">{item.no}</td>

                    <td className="p-0 px-2">{item.description || "-"}</td>
                    <td className="p-0 px-2 text-center">{item.quantity}</td>
                    <td className="p-0 px-2 text-center">{item.unit}</td>
                    <td className="px-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Rp.</span>
                        <span>{formatCurrency(item.price)}</span>
                      </div>
                    </td>
                    <td className="ps-2 pe-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Rp.</span>
                        <span>
                          {formatCurrency(item.quantity * item.price)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {invoiceData.items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center custom-text py-3">
                      Tidak ada item
                    </td>
                  </tr>
                )}
              </table>
            </div>
            <table className="w-100">
              <tr>
                <td style={{ width: "61.6%" }}></td>
                <td style={{ width: "20%" }}>Subtotal</td>
                <td style={{ width: "5%" }}>Rp.</td>
                <td className="text-end pe-2" style={{ width: "15%" }}>
                  {formatCurrency(calculateSubtotal(invoiceData.items))}
                </td>
              </tr>

              {["include-ppn", "exclude-ppn"].includes(
                brandData.jenisTransaksi,
              ) && (
                <>
                  {brandData.jenisTransaksi === "include-ppn" && (
                    <tr>
                      <td style={{ width: "60%" }}></td>
                      <td style={{ width: "20%" }}>DPP</td>
                      <td style={{ width: "5%" }}>Rp.</td>
                      <td className="text-end pe-2" style={{ width: "15%" }}>
                        {formatCurrency(
                          calculateDPP(
                            invoiceData.items,
                            brandData.taxRate,
                            brandData.jenisTransaksi,
                          ),
                        )}
                      </td>
                    </tr>
                  )}

                  {brandData.taxRate > 0 && (
                    <tr>
                      <td style={{ width: "60%" }}></td>
                      <td style={{ width: "20%" }}>PPN {brandData.taxRate}%</td>
                      <td style={{ width: "5%" }}>Rp.</td>
                      <td className="text-end pe-2" style={{ width: "15%" }}>
                        {formatCurrency(
                          calculateTax(
                            invoiceData.items,
                            brandData.taxRate,
                            brandData.jenisTransaksi,
                          ),
                        )}
                      </td>
                    </tr>
                  )}
                </>
              )}

              <tr style={{ borderTop: "1px solid #111111" }}>
                <td style={{ width: "60%" }}></td>
                <td
                  className="fw-semibold"
                  style={{
                    width: "20%",
                    paddingTop: "8px",
                  }}
                >
                  Total Harga
                </td>
                <td
                  className="fw-semibold"
                  style={{
                    width: "5%",
                    paddingTop: "8px",
                  }}
                >
                  Rp.
                </td>
                <td
                  className="text-end pe-2 fw-semibold"
                  style={{
                    width: "15%",
                    paddingTop: "8px",
                    color: brandData.accentColor,
                  }}
                >
                  {formatCurrency(
                    calculateTotal(
                      invoiceData.items,
                      brandData.taxRate,
                      brandData.jenisTransaksi,
                    ),
                  )}
                </td>
              </tr>
            </table>
            {/* </div> */}
            <br />
            <br />
            <div className="border-top pt-3 mt-3">
              <table className="w-100">
                <tr>
                  <td width="50%">
                    <p className="text-center text-uppercse fw-semibold">
                      {invoiceData.receiver}
                    </p>
                  </td>
                  <td width="50%">
                    <p className="text-center text-uppercse fw-semibold">
                      {invoiceData.best_regards}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <br />
                    <br />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    {invoiceData.receiver_name ? (
                      <p className="text-center text-uppercse fw-semibold">
                        {invoiceData.receiver_name}
                      </p>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td width="50%">
                    {invoiceData.best_regards_name ? (
                      <p className="text-center text-uppercse fw-semibold">
                        {invoiceData.best_regards_name}
                      </p>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              </table>
            </div>
            {invoiceData.notes && (
              <div className="border-top pt-3 mt-3">
                <p className="custom-text text-uppercase fw-semibold">
                  Catatan
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: invoiceData.notes.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
            )}
            <div className="text-center pt-3 mt-3 border-top">
              <p style={{ color: brandData.accentColor }}>
                {brandData.footerText || "Terima kasih atas kepercayaan Anda"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
