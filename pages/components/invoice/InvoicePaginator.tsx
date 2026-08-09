import { useEffect, useMemo, useRef, useState } from "react";

import InvoicePage from "./InvoicePage";
import useMeasureRows from "@/hooks/UseMeasureRows";

import HiddenMeasureTable from "./sections/HiddenMeasureTable";
import { InvoicePaginatorProps } from "@/types/invoice";
import useInvoicePagination from "@/hooks/UseInvoicePagination";

interface Props extends InvoicePaginatorProps {
  pdfMode?: boolean;
}

export default function InvoicePaginator({
  previewRef,
  invoiceData,
  brandData,
  printOptions,
  pdfMode = false,
}: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * Ref untuk mengambil tinggi setiap row invoice.
   */
  const measureRef = useRef<HTMLTableSectionElement>(null);

  /**
   * Ambil tinggi row sebenarnya dari DOM.
   *
   * Contoh:
   *
   * [
   *   28,
   *   28,
   *   56,
   *   74,
   *   28
   * ]
   */
  const rowHeights = useMeasureRows(measureRef, [
    invoiceData.items,
    printOptions,
  ]);

  /**
   * Jangan membuat pagination sebelum
   * semua row selesai diukur.
   */
  const isMeasuring =
    invoiceData.items.length > 0 &&
    rowHeights.length !== invoiceData.items.length;

  /**
   * Pagination invoice.
   */
  const pages = useInvoicePagination({
    items: invoiceData.items,

    rowHeights,

    /*
     * A4 height dalam pixel pada
     * basis 96 DPI.
     *
     * 297mm ≈ 1122px
     */
    pageHeight: 1122,

    /*
     * Sesuaikan dengan tinggi aktual
     * komponen invoice Anda.
     */
    headerHeight: 190,

    customerHeight: 130,

    summaryHeight: 170,

    signatureHeight: 170,

    notesHeight: invoiceData.notes ? 80 : 0,
  });

  const totalPages = pages.length;

  /**
   * Gabungkan invoiceData dengan item
   * yang sudah dibagi berdasarkan halaman.
   */
  const pageData = useMemo(
    () =>
      pages.map((page) => ({
        ...invoiceData,
        items: page.items,
      })),
    [invoiceData, pages],
  );

  /**
   * Kalau data invoice berubah dan jumlah
   * halaman berkurang, pastikan currentPage
   * tidak menunjuk ke halaman yang sudah tidak ada.
   */
  useEffect(() => {
    if (totalPages === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(0);
      return;
    }

    setCurrentPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  /**
   * Reset ke halaman pertama ketika
   * invoice berubah.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(0);
  }, [invoiceData.invoiceNo]);

  /**
   * --------------------------------------------------
   * PDF MODE
   * --------------------------------------------------
   *
   * Browserless membutuhkan semua halaman
   * dirender sekaligus.
   */
  if (pdfMode) {
    if (isMeasuring) {
      return (
        <div className="p-8 text-center">Menghitung layout invoice...</div>
      );
    }

    return (
      <>
        {pageData.map((invoice, index) => (
          <div
            key={`invoice-page-${index}`}
            style={{
              pageBreakAfter: index === totalPages - 1 ? "auto" : "always",
            }}
          >
            <InvoicePage
              ref={index === 0 ? previewRef : undefined}
              invoiceData={invoice}
              brandData={brandData}
              printOptions={printOptions}
              page={pages[index]}
              isLastPage={index === totalPages - 1}
            />
          </div>
        ))}
      </>
    );
  }

  /**
   * --------------------------------------------------
   * PREVIEW MODE
   * --------------------------------------------------
   */

  /**
   * Belum selesai mengukur row.
   */
  if (isMeasuring) {
    return (
      <>
        <HiddenMeasureTable
          invoiceData={invoiceData}
          brandData={brandData}
          items={invoiceData.items}
          measureRef={measureRef}
        />

        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-sm text-gray-500">
            Menghitung layout invoice...
          </div>
        </div>
      </>
    );
  }

  /**
   * Tidak ada item.
   */
  if (totalPages === 0) {
    return (
      <>
        <HiddenMeasureTable
          invoiceData={invoiceData}
          brandData={brandData}
          items={invoiceData.items}
          measureRef={measureRef}
        />

        <InvoicePage
          ref={previewRef}
          invoiceData={invoiceData}
          brandData={brandData}
          printOptions={printOptions}
          page={{
            page: 1,
            totalPages: 1,
            items: [],
          }}
          isLastPage
        />
      </>
    );
  }

  /**
   * Invoice yang sedang ditampilkan.
   */
  const currentInvoice = pageData[currentPage];

  const currentPageData = pages[currentPage];

  return (
    <div className="flex flex-col gap-4">
      {/*
       * Hidden table hanya digunakan untuk
       * mengukur tinggi setiap InvoiceTableRow.
       */}
      <HiddenMeasureTable
        invoiceData={invoiceData}
        brandData={brandData}
        items={invoiceData.items}
        measureRef={measureRef}
      />

      {/*
       * Invoice page yang sedang aktif.
       */}
      <InvoicePage
        ref={previewRef}
        invoiceData={currentInvoice}
        brandData={brandData}
        printOptions={printOptions}
        page={currentPageData}
        isLastPage={currentPage === totalPages - 1}
      />

      {/*
       * Pagination controls.
       */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-1">
            {/* Previous */}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            >
              Previous
            </button>

            {/* Page numbers */}
            {pages.map((page, index) => (
              <button
                key={page.page}
                type="button"
                className={`btn btn-sm ${
                  index === currentPage ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setCurrentPage(index)}
              >
                {page.page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={currentPage === totalPages - 1}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages - 1, page + 1))
              }
            >
              Next
            </button>
          </div>

          <div className="text-xs text-gray-500">
            Halaman <span className="font-medium">{currentPage + 1}</span> dari{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
        </div>
      )}
    </div>
  );
}
