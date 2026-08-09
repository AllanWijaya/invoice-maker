import { forwardRef, useRef } from "react";

import {
  BrandData,
  InvoiceData,
  InvoicePageData,
  PrintOptions,
} from "@/types/invoice";

import InvoiceHeader from "./sections/InvoiceHeader";
import InvoiceCustomer from "./sections/InvoiceCustomer";
import InvoiceTable from "./sections/InvoiceTable";
import InvoiceSummary from "./sections/InvoiceSummary";
import InvoiceSignature from "./sections/InvoiceSignature";

interface Props {
  invoiceData: InvoiceData;

  brandData: BrandData;

  printOptions: PrintOptions;

  /**
   * Data halaman yang sedang dirender.
   */
  page: InvoicePageData;

  /**
   * Menentukan apakah halaman ini adalah
   * halaman terakhir.
   *
   * Summary, Signature, dan Notes hanya
   * ditampilkan pada halaman terakhir.
   */
  isLastPage: boolean;
}

const InvoicePage = forwardRef<HTMLDivElement, Props>(
  ({ invoiceData, brandData, page, isLastPage }, ref) => {
    /**
     * Untuk sekarang ukuran halaman menggunakan A4.
     *
     * Nanti bisa dibuat berdasarkan printOptions:
     *
     * A4     = 210 x 297 mm
     * A5     = 148 x 210 mm
     * Thermal 80 = 80mm
     * Thermal 58 = 58mm
     */
    const width = 210;
    const height = 297;

    const measureRef = useRef<HTMLTableSectionElement>(null);
    return (
      <div
        ref={ref}
        className="invoice-page bg-white shadow-sm p-6"
        style={{
          width: `${width}mm`,
          minHeight: `${height}mm`,

          /**
           * Jangan memotong halaman ketika
           * dicetak menggunakan browser/Puppeteer.
           */
          breakInside: "avoid",

          /**
           * Setiap InvoicePage adalah satu
           * halaman invoice.
           */
          pageBreakAfter: isLastPage ? "auto" : "always",
        }}
      >
        {/* =========================================
            HEADER
            ========================================= */}

        <InvoiceHeader invoiceData={invoiceData} brandData={brandData} />

        {/* =========================================
            CUSTOMER
            ========================================= */}

        <InvoiceCustomer invoiceData={invoiceData} />

        {/* =========================================
            TABLE
            ========================================= */}

        <InvoiceTable
          items={page.items}
          invoiceData={invoiceData}
          brandData={brandData}
          measureRef={measureRef}
        />

        {/* =========================================
            FOOTER INVOICE
            ========================================= */}

        {isLastPage && (
          <>
            {/* SUMMARY */}

            <InvoiceSummary invoiceData={invoiceData} brandData={brandData} />

            {/* SIGNATURE */}

            <InvoiceSignature invoiceData={invoiceData} brandData={brandData} />
          </>
        )}
      </div>
    );
  },
);

InvoicePage.displayName = "InvoicePage";

export default InvoicePage;
