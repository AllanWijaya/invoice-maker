/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { BrandData, InvoiceData } from "../types/invoice";
import {
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
  ({ invoiceData, brandData, previewRef }) => {
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
                    <small className="text-muted">
                      {brandData.companyAddress}
                    </small>
                    <br />
                    <small className="text-muted">
                      {brandData.companyPhone &&
                        `Telp: ${brandData.companyPhone}`}
                      {brandData.companyEmail &&
                        ` | Email: ${brandData.companyEmail}`}
                    </small>
                  </div>
                </div>
                <div className="text-end">
                  <div className="badge bg-secondary mb-1">INVOICE</div>
                  <p className="mb-0 fw-semibold">
                    {invoiceData.invoiceNo || "-"}
                  </p>
                  <small className="text-muted">
                    {invoiceData.date || "-"}
                  </small>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-light p-3 rounded">
                <small className="text-muted text-uppercase fw-semibold">
                  Kepada Yth,
                </small>
                <p className="mb-0 fw-semibold">
                  {invoiceData.clientName || "-"}
                </p>
                <small className="text-muted">
                  {invoiceData.clientEmail || "-"}
                </small>
                <p className="mb-0 small">{invoiceData.clientAddress || "-"}</p>
              </div>
            </div>

            <div className="table-responsive mb-4">
              <table className="table table-sm">
                <thead
                  style={{
                    backgroundColor: brandData.accentColor + "20",
                    color: brandData.accentColor,
                  }}
                >
                  <tr>
                    <th>Deskripsi</th>
                    <th className="text-end">Qty</th>
                    <th className="text-end">Harga</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.description || "-"}</td>
                      <td className="text-end">{item.quantity}</td>
                      <td className="text-end">{formatCurrency(item.price)}</td>
                      <td className="text-end">
                        {formatCurrency(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                  {invoiceData.items.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-muted py-3">
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
                {brandData.taxRate > 0 && (
                  <div className="d-flex justify-content-between mb-1">
                    <span>PPN {brandData.taxRate}%</span>
                    <span>
                      {formatCurrency(
                        calculateTax(invoiceData.items, brandData.taxRate),
                      )}
                    </span>
                  </div>
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
                      calculateTotal(invoiceData.items, brandData.taxRate),
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-top pt-3 mt-3 d-flex justify-content-end align-items-center">
              <br />
              <br />
              <div>
                <small className="text-center text-uppercase fw-semibold">
                  BEST REGARDS
                </small>
                <br />
                <br />
                <br />
                <hr />
              </div>
            </div>

            {invoiceData.notes && (
              <div className="border-top pt-3 mt-3">
                <small className="text-muted text-uppercase fw-semibold">
                  Catatan
                </small>
                <p className="small mb-0">{invoiceData.notes}</p>
              </div>
            )}

            <div className="text-center pt-3 mt-3 border-top">
              <small style={{ color: brandData.accentColor }}>
                {brandData.footerText || "Terima kasih atas kepercayaan Anda"}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
