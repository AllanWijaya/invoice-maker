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

  page: InvoicePageData;

  isLastPage: boolean;
}

const InvoicePage = forwardRef<HTMLDivElement, Props>(
  ({ invoiceData, brandData, page, isLastPage }, ref) => {
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
          breakInside: "avoid",
          pageBreakAfter: isLastPage ? "auto" : "always",
        }}
      >
        <InvoiceHeader invoiceData={invoiceData} brandData={brandData} />

        <InvoiceCustomer invoiceData={invoiceData} />

        <InvoiceTable
          items={page.items}
          invoiceData={invoiceData}
          brandData={brandData}
          measureRef={measureRef}
        />

        {isLastPage && (
          <>
            <InvoiceSummary invoiceData={invoiceData} brandData={brandData} />

            <InvoiceSignature invoiceData={invoiceData} brandData={brandData} />
          </>
        )}
      </div>
    );
  },
);

InvoicePage.displayName = "InvoicePage";

export default InvoicePage;
