import { BrandData, InvoiceData, InvoiceItem } from "@/types/invoice";
import InvoiceTableRow from "./InvoiceTableRow";
import { RefObject } from "react";

interface InvoiceTableProps {
  invoiceData: InvoiceData;
  brandData: BrandData;
  items: InvoiceItem[];
  measureRef: RefObject<HTMLTableSectionElement | null>;
}
export default function InvoiceTable({
  invoiceData,
  brandData,
  items,
  measureRef,
}: InvoiceTableProps) {
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
    <div className="overflow-x-auto custom-text mb-0 pb-0">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50 border-t border-b border-black">
            <th
              className="p-1 text-center border-t border-b border-black"
              style={{ width: `${column.no}%` }}
            >
              No
            </th>
            <th
              className="p-1 text-center border-t border-b border-black"
              style={{ width: `${column.description}%` }}
            >
              Nama Barang
            </th>
            <th
              className="p-1 text-center border-t border-b border-black"
              style={{ width: `${column.quantity}%` }}
            >
              Qty
            </th>
            <th
              className="p-1 text-center border-t border-b border-black"
              style={{ width: `${column.unit}%` }}
            >
              Satuan
            </th>
            <th
              className="p-1 text-center border-t border-b border-black"
              style={{ width: `${column.price}%` }}
            >
              Harga Satuan
            </th>
            <th
              className="p-1 text-center border-t border-b border-black"
              style={{ width: `${column.total}%` }}
            >
              Jumlah Harga
            </th>
          </tr>
        </thead>
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
