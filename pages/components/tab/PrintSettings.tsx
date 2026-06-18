/* eslint-disable @next/next/no-img-element */

import {
  calculateTotal,
  formatCurrency,
  handleChangeState,
} from "@/lib/Helper";
import { BrandData, InvoiceData, PrintOptions } from "../../../types/invoice";
import { Dispatch } from "react";

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
    <>
      <div className="border rounded p-3 bg-light text-center mb-4">
        <div
          className="bg-white mx-auto shadow-sm p-2"
          style={{ maxWidth: "100%", overflow: "hidden" }}
        >
          <div className="p-2">
            <small className="text-muted">Preview Cetak</small>
            <div className="border p-2 mt-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                {brandData.logo && (
                  <img
                    src={brandData.logo}
                    alt="Logo"
                    style={{ height: "25px" }}
                  />
                )}
                <small className="fw-bold">
                  {brandData.companyName || "Invoice"}
                </small>
              </div>
              <hr className="my-1" />
              <small>No: {invoiceData.invoiceNo}</small>
              <hr className="my-1" />
              <div className="text-center p-2 bg-light">
                <small className="text-muted">
                  Total:{" "}
                  {formatCurrency(
                    calculateTotal(
                      invoiceData.items,
                      brandData.taxRate,
                      brandData.jenisTransaksi,
                    ),
                  )}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top pt-3">
        <label className="form-label fw-semibold">Pengaturan Cetak</label>

        <div className="alert alert-info small mt-2">
          💡 Gunakan fitur cetak browser (Ctrl+P / Cmd+P) untuk pengaturan
          lengkap:
          <ul className="mb-0 mt-1">
            <li>Ukuran kertas (A4, Letter, dll)</li>
            <li>Orientasi (Potrait/Landscape)</li>
            <li>Margin cetak</li>
            <li>Jumlah copy</li>
          </ul>
        </div>
      </div>

      <div className="d-grid gap-2 mt-3">
        <div className="row g-2">
          <div className="col-6">
            <input
              type="radio"
              className="btn-check"
              name="pageSize"
              value="a4"
              onChange={(e) => handleChangeState(e, onPrintOptions)}
              checked={printOptions?.pageSize === "a4"}
              id="kertasA4"
            />
            <label
              className={`btn w-100 h-100 p-3 rounded-3 text-start bg-white d-flex flex-column justify-content-between shadow-sm border-2 ${
                printOptions?.pageSize === "a4"
                  ? "border-primary"
                  : "border-light-subtle"
              }`}
              htmlFor="kertasA4"
            >
              <div className="d-flex justify-content-between align-items-center w-100 mb-1">
                <span
                  className={`fw-bold small ${printOptions?.pageSize === "a4" ? "text-primary" : "text-dark"}`}
                >
                  Kertas A4
                </span>
                <i
                  className={`bi bi-file-earmark-text fs-5 ${printOptions?.pageSize === "a4" ? "text-primary" : "text-muted"}`}
                ></i>
              </div>
              <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                210 x 297 mm • Standar Laporan
              </span>
            </label>
          </div>

          <div className="col-6">
            <input
              type="radio"
              className="btn-check"
              name="pageSize"
              value="continuous"
              onChange={(e) => handleChangeState(e, onPrintOptions)}
              checked={printOptions?.pageSize === "continuous"}
              id="kertasContinuous"
            />
            <label
              className={`btn w-100 h-100 p-3 rounded-3 text-start bg-white d-flex flex-column justify-content-between shadow-sm border-2 ${
                printOptions?.pageSize === "continuous"
                  ? "border-primary"
                  : "border-light-subtle"
              }`}
              htmlFor="kertasContinuous"
            >
              <div className="d-flex justify-content-between align-items-between w-100 mb-1">
                <span
                  className={`fw-bold small ${printOptions?.pageSize === "continuous" ? "text-primary" : "text-dark"}`}
                >
                  Continuous Form
                </span>
                <i
                  className={`bi bi-printer fs-5 ${printOptions?.pageSize === "continuous" ? "text-primary" : "text-muted"}`}
                ></i>
              </div>
              <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                9.5 x 11 inch • Dot Matrix / Faktur
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 mt-3">
        <button onClick={handlePrint} className="btn btn-primary btn-lg">
          🖨️ Cetak Invoice
        </button>
        <button
          onClick={() => window.print()}
          className="btn btn-outline-secondary"
        >
          📄 Cetak dengan Pengaturan Browser (Ctrl+P)
        </button>
      </div>

      <hr className="my-3" />

      <div>
        <label className="form-label fw-semibold">Yang Akan Dicetak:</label>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="printLogo"
            defaultChecked
            disabled
          />
          <label className="form-check-label" htmlFor="printLogo">
            Logo Perusahaan {brandData.logo ? "✓" : "(belum diupload)"}
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="printCompany"
            defaultChecked
            disabled
          />
          <label className="form-check-label" htmlFor="printCompany">
            Informasi Perusahaan
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="printClient"
            defaultChecked
            disabled
          />
          <label className="form-check-label" htmlFor="printClient">
            Informasi Klien
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="printItems"
            defaultChecked
            disabled
          />
          <label className="form-check-label" htmlFor="printItems">
            Daftar Item ({invoiceData.items.length} item)
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="printFooter"
            defaultChecked
            disabled
          />
          <label className="form-check-label" htmlFor="printFooter">
            Footer {brandData.footerText && "✓"}
          </label>
        </div>
      </div>
    </>
  );
}
