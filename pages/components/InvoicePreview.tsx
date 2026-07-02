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
  formatTerbilang,
  ucwords,
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
    const column = {
      no: 3,
      description: 39,
      quantity: 9,
      unit: 9,
      price: 20,
      total: 20,
      terbilang: 10,
    };

    return (
      <div
        className={`${printOptions?.pageSize === "a4" ? "invoice-a4" : "continuous-form"} custom-text card border-0 shadow-sm sticky-top`}
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
            <div className="border-bottom border-3 border-dark pb-1 mb-1">
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
                    <table className="w-100">
                      <tr className="custom-text">
                        <td style={{ width: "19%" }}>Telp | Email</td>
                        <td style={{ width: "1%" }}>: </td>
                        <td style={{ width: "60%" }}>
                          {brandData.companyPhone || ""}
                          {brandData.companyEmail
                            ? ` | ${brandData.companyEmail}`
                            : ""}
                        </td>
                      </tr>
                      {/* <tr className="custom-text">
                        <td style={{ width: "19%" }}>Email</td>
                        <td style={{ width: "1%" }}>: </td>
                        <td style={{ width: "60%" }}></td>
                      </tr> */}
                      <tr className="custom-text">
                        <td style={{ width: "19%" }}>NPWP</td>
                        <td style={{ width: "1%" }}>: </td>
                        <td style={{ width: "60%" }}>
                          {brandData.companyNPWP || ""}
                        </td>
                      </tr>
                    </table>
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
            {/* Client Information */}
            <div className="mb-2">
              <div className="bg-light p-1 rounded">
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
                  <tr className="custom-text fw-semibold">
                    <td style={{ width: "10%" }}>No PO</td>
                    <td style={{ width: "1%" }}>:</td>
                    <td style={{ width: "60%" }}>
                      {invoiceData.POnumber || ""}
                    </td>
                  </tr>
                  <tr className="custom-text fw-semibold">
                    <td style={{ width: "10%" }}>Tanggal PO</td>
                    <td style={{ width: "1%" }}>:</td>
                    <td style={{ width: "60%" }}>{invoiceData.POdate || ""}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="table-responsive custom-text mb-0 pb-0">
              <table className="table table-sm table-bordere border-dark mb-0">
                <tr className="custom-border">
                  <th
                    className="text-center"
                    style={{ width: `${column.no}%` }}
                  >
                    No
                  </th>
                  <th
                    className="text-center"
                    style={{ width: `${column.description}%` }}
                  >
                    Nama Barang
                  </th>
                  <th
                    className="text-center"
                    style={{ width: `${column.quantity}%` }}
                  >
                    Qty
                  </th>
                  <th
                    className="text-center"
                    style={{ width: `${column.unit}%` }}
                  >
                    Satuan
                  </th>
                  <th
                    className="text-center"
                    style={{ width: `${column.price}%` }}
                  >
                    Harga Satuan
                  </th>
                  <th
                    className="text-center"
                    style={{ width: `${column.total}%` }}
                  >
                    Jumlah Harga
                  </th>
                </tr>
                {invoiceData.items.map((item) => (
                  <tr key={item.id} className="custom-border">
                    <td className="p-0 px-2 text-center">{item.no}</td>

                    <td className="p-0 px-2">{item.description || "-"}</td>
                    <td className="p-0 px-0 text-center">{item.quantity}</td>
                    <td className="p-0 px-0 text-center">{item.unit}</td>
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
                <tr>
                  <td colSpan={4}></td>
                  <td className="ps-2" style={{ width: `${column.price}%` }}>
                    Subtotal
                  </td>
                  <td
                    className="ps-2 pe-1"
                    style={{ width: `${column.total}%` }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Rp.</span>
                      <span>
                        {formatCurrency(calculateSubtotal(invoiceData.items))}
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
                      <tr style={{ borderTop: "0" }}>
                        <td colSpan={4}></td>

                        <td
                          className="ps-2"
                          style={{ width: `${column.price}%` }}
                        >
                          DPP
                        </td>
                        <td
                          className="ps-2 pe-1"
                          style={{ width: `${column.total}%` }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Rp.</span>
                            <span>
                              {formatCurrency(
                                Math.round(
                                  calculateDPP(
                                    invoiceData.items,
                                    brandData.taxRate,
                                    brandData.jenisTransaksi,
                                  ),
                                ),
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}

                    {brandData.taxRate > 0 && (
                      <tr>
                        <td colSpan={4}></td>

                        <td
                          className="ps-2"
                          style={{ width: `${column.price}%` }}
                        >
                          PPN{" "}
                          {["dpp-nilai-lain"].includes(brandData.jenisTransaksi)
                            ? brandData.taxRate + 1
                            : brandData.taxRate}
                          %
                        </td>
                        <td
                          className="ps-2 pe-1"
                          style={{ width: `${column.total}%` }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Rp.</span>
                            <span>
                              {formatCurrency(
                                Math.round(
                                  calculateTax(
                                    invoiceData.items,
                                    brandData.taxRate,
                                    brandData.jenisTransaksi,
                                  ),
                                ),
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}

                <tr className="custom-border">
                  <td colSpan={4}></td>
                  <td
                    className="ps-2  fw-semibold"
                    style={{
                      width: `${column.price}%`,
                    }}
                  >
                    Total Harga
                  </td>
                  <td
                    className="ps-2 pe-1"
                    style={{ width: `${column.total}%` }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Rp.</span>
                      <span>
                        {formatCurrency(
                          calculateTotal(
                            invoiceData.items,
                            brandData.taxRate,
                            brandData.jenisTransaksi,
                          ),
                        )}
                      </span>
                    </div>
                  </td>
                </tr>
                {invoiceData.items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center custom-text py-3">
                      Tidak ada item
                    </td>
                  </tr>
                )}
              </table>
            </div>
            <table
              className="custom-text w-100"
              style={{ borderTop: "1px solid #111111" }}
            >
              <tr>
                <td
                  className="fw-semibold"
                  width={`${column.terbilang}%`}
                  style={{
                    paddingTop: "4px",
                  }}
                >
                  Terbilang
                </td>
                <td
                  className="fw-semibold"
                  width={"2%"}
                  style={{
                    paddingTop: "4px",
                  }}
                >
                  :
                </td>
                <td
                  className="pe-2 fw-semibold fst-italic"
                  width={"80%"}
                  style={{
                    paddingTop: "4px",
                    color: brandData.accentColor,
                  }}
                >
                  {ucwords(
                    formatTerbilang(
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
            </table>
            {/* </div> */}
            <div className="border-top pt-1 mt-1 custom-text">
              <table className="w-100" suppressHydrationWarning>
                <tr>
                  <td width="50%">
                    <p className="text-center text-uppercse fw-semibold p-0">
                      {invoiceData.receiver}
                    </p>
                  </td>
                  <td width="50%">
                    <p className="text-center text-uppercse fw-semibold p-0">
                      {invoiceData.best_regards}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    {invoiceData.receiver_name ? (
                      <p className="text-center text-uppercse fw-semibold text-decoration-underline">
                        {invoiceData.receiver_name}
                      </p>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td width="50%">
                    {invoiceData.best_regards_name ? (
                      <p className="text-center text-uppercse fw-semibold text-decoration-underline">
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
              <div className="border-top">
                <p className="custom-text text-uppercase fw-semibold mb-0">
                  Catatan
                </p>
                <div
                  className="custom-text"
                  dangerouslySetInnerHTML={{
                    __html: invoiceData.notes.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
            )}
            {/* <div className="custom-text text-center pt- mt-1 border-top">
              <p
                className="custom-text"
                style={{ color: brandData.accentColor }}
              >
                {brandData.footerText || "Terima kasih atas kepercayaan Anda"}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    );
  },
);

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
