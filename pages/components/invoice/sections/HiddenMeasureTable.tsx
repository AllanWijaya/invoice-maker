import { BrandData, InvoiceData, InvoiceItem } from "@/types/invoice";
import InvoiceTableRow from "./InvoiceTableRow";
import { RefObject } from "react";

interface HiddenMeasureTableProps {
  invoiceData: InvoiceData;
  brandData: BrandData;
  items: InvoiceItem[];
  measureRef: RefObject<HTMLTableSectionElement | null>;
}
export default function HiddenMeasureTable({
  invoiceData,
  brandData,
  items,
  measureRef,
}: HiddenMeasureTableProps) {
  return (
    <div
      style={{
        position: "fixed",
        left: -99999,
        top: 0,
        visibility: "hidden",
        pointerEvents: "none",
      }}
    >
      <table
        className="border-collapse text-xs"
        style={{
          width: "210mm",
          tableLayout: "fixed",
        }}
      >
        <tbody ref={measureRef}>
          {items.map((item) => (
            <InvoiceTableRow
              key={item.id}
              item={item}
              invoiceData={invoiceData}
              brandData={brandData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
