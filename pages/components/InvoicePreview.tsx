/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { BrandData, InvoiceData } from "../../types/invoice";
import {
  calculateDPP,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "../../lib/Helper";

interface InvoicePreviewProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  invoiceData: InvoiceData;
  brandData: BrandData;
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
  }) => {
    return (
      <div
        className="card border-0 shadow-sm sticky-top"
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
            <div className="border-bottom pb-3 mb-3">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center gap-3">
                  {brandData.logo && (
                    <img
                      src={brandData.logo}
                      alt="Logo"
                      style={{
                        maxHeight: "60px",
                        maxWidth: "120px",
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
                    <p className="custom-text">
                      {brandData.companyPhone &&
                        `Telp: ${brandData.companyPhone}`}
                      {brandData.companyEmail &&
                        ` | Email: ${brandData.companyEmail}`}
                    </p>
                  </div>
                </div>
                <div className="text-end">
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
                    <div className="d-flex justify-content-between align-items-start">
                      <p className="custom-text text-uppercas fw-semibold my-0">
                        {invoiceData.toClient}
                      </p>
                      <p className="custom-text my-0">
                        {invoiceData.date || "-"}
                      </p>
                    </div>
                    <p className="fw-semibold my-0">
                      {invoiceData.clientName || "-"}
                    </p>
                  </>
                ) : (
                  <div className="d-flex justify-content-between align-items-start">
                    <p className="fw-semibold my-0">
                      {invoiceData.clientName || "-"}
                    </p>
                    <p className="custom-text my-0">
                      {invoiceData.date || "-"}
                    </p>
                  </div>
                )}

                <p className="custom-text my-0">
                  {invoiceData.clientEmail || "-"}
                </p>
                <p className="my-0 p">{invoiceData.clientAddress || "-"}</p>
              </div>
            </div>

            <div className="table-responsive mb-4">
              <table className="table table-sm table-bordered">
                <thead
                  style={{
                    backgroundColor: brandData.accentColor + "20",
                    color: brandData.accentColor,
                  }}
                >
                  <tr>
                    <th className="text-center" style={{ width: 50 }}>
                      No
                    </th>
                    <th
                      colSpan={2}
                      className="text-center"
                      style={{ width: 150 }}
                    >
                      Qty
                    </th>
                    <th className="text-center">Nama Barang</th>
                    <th className="text-center">Harga Satuan</th>
                    <th className="text-center">Jumlah Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.no}</td>
                      <td className="text-center" style={{ width: "10%" }}>
                        {item.quantity}
                      </td>
                      <td className="text-center" style={{ width: "10%" }}>
                        {item.unit}
                      </td>

                      <td>{item.description || "-"}</td>
                      <td className="text-end justify-content-between">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="text-end">
                        {formatCurrency(item.quantity * item.price)}
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
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end">
              <div style={{ width: 300 }}>
                <div className="d-flex justify-content-between mb-1">
                  <span>Subtotal</span>
                  <span>
                    {formatCurrency(calculateSubtotal(invoiceData.items))}
                  </span>
                </div>
                {["include-ppn", "exclude-ppn"].includes(
                  brandData.jenisTransaksi,
                ) && (
                  <>
                    {brandData.jenisTransaksi === "include-ppn" && (
                      <div className="d-flex justify-content-between mb-1">
                        <span>DPP</span>
                        <span>
                          {formatCurrency(
                            calculateDPP(
                              invoiceData.items,
                              brandData.taxRate,
                              brandData.jenisTransaksi,
                            ),
                          )}
                        </span>
                      </div>
                    )}
                    {brandData.taxRate > 0 && (
                      <div className="d-flex justify-content-between mb-1">
                        <span>PPN {brandData.taxRate}%</span>
                        <span>
                          {formatCurrency(
                            calculateTax(
                              invoiceData.items,
                              brandData.taxRate,
                              brandData.jenisTransaksi,
                            ),
                          )}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div className="d-flex justify-content-between pt-2 border-top fw-bold">
                  <span>Total</span>
                  <span
                    style={{
                      color: brandData.accentColor,
                      fontSize: "1.2rem",
                    }}
                  >
                    {formatCurrency(
                      calculateTotal(
                        invoiceData.items,
                        brandData.taxRate,
                        brandData.jenisTransaksi,
                      ),
                    )}
                  </span>
                </div>
              </div>
            </div>

            <br />
            <br />
            <div className="border-top pt-3 mt-3 d-flex justify-content-around align-items-center">
              <div></div>
              <div>
                <p className="text-center text-uppercse fw-semibold">
                  {invoiceData.best_regards}
                </p>
                <br />
                <br />
                <br />
                <hr />
              </div>
            </div>

            {invoiceData.notes && (
              <div className="border-top pt-3 mt-3">
                <p className="custom-text text-uppercase fw-semibold">
                  Catatan
                </p>
                <p className="p mb-0">{invoiceData.notes}</p>
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
