/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useRef, useState } from "react";

import useMeasureRows from "@/hooks/UseMeasureRows";

import HiddenMeasureTable from "./sections/HiddenMeasureTable";
import { InvoicePaginatorProps } from "@/types/invoice";
import useInvoicePagination from "@/hooks/UseInvoicePagination";
import InvoicePage from "./InvoicePage";

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

  const measureRef = useRef<HTMLTableSectionElement>(null);

  const rowHeights = useMeasureRows(measureRef, [
    invoiceData.items,
    printOptions,
  ]);

  const isMeasuring =
    invoiceData.items.length > 0 &&
    rowHeights.length !== invoiceData.items.length;

  const pages = useInvoicePagination({
    items: invoiceData.items,

    rowHeights,

    pageHeight: 1122,

    headerHeight: 190,

    customerHeight: 130,

    summaryHeight: 170,

    signatureHeight: 170,

    notesHeight: invoiceData.notes ? 80 : 0,
  });

  const totalPages = pages.length;

  const pageData = useMemo(
    () =>
      pages.map((page) => ({
        ...invoiceData,
        items: page.items,
      })),
    [invoiceData, pages],
  );

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0);
      return;
    }

    setCurrentPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(0);
  }, [invoiceData.invoiceNo]);

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

  if (isMeasuring) {
    return (
      <>
        <HiddenMeasureTable
          invoiceData={invoiceData}
          brandData={brandData}
          items={invoiceData.items ?? []}
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

  const currentInvoice = pageData[currentPage];

  const currentPageData = pages[currentPage];

  if (!currentPageData) {
    return (
      <HiddenMeasureTable
        invoiceData={invoiceData}
        brandData={brandData}
        items={invoiceData.items ?? []}
        measureRef={measureRef}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <HiddenMeasureTable
        invoiceData={invoiceData}
        brandData={brandData}
        items={invoiceData.items}
        measureRef={measureRef}
      />

      <InvoicePage
        ref={previewRef}
        invoiceData={currentInvoice}
        brandData={brandData}
        printOptions={printOptions}
        page={currentPageData}
        isLastPage={currentPage === totalPages - 1}
      />

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-1">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            >
              Previous
            </button>

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
