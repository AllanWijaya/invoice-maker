import { formatDate } from "@/lib/Helper";
import { InvoiceData } from "@/types/invoice";

interface InvoiceCustomerProps {
  invoiceData: InvoiceData;
}
export default function InvoiceCustomer({ invoiceData }: InvoiceCustomerProps) {
  return (
    <div className="mb-2">
      <div className="bg-slate-50 p-2 rounded text-xs">
        {invoiceData?.toClient ? (
          <>
            <div className="flex justify-between items-start font-semibold">
              <p className="custom-text my-0">{invoiceData?.toClient}</p>
              <p className="custom-text my-0">
                {invoiceData?.place && `${invoiceData?.place}, `}
                {invoiceData?.date ? formatDate(invoiceData?.date) : "-"}
              </p>
            </div>
            <p className="custom-text font-semibold my-0">
              {invoiceData?.clientName || "-"}
            </p>
          </>
        ) : (
          <div className="flex justify-between items-start font-semibold">
            <p className="custom-text my-0">{invoiceData?.clientName || "-"}</p>
            <p className="custom-text my-0">
              {invoiceData?.place && `${invoiceData?.place}, `}
              {invoiceData?.date ? formatDate(invoiceData?.date) : "-"}
            </p>
          </div>
        )}

        <p className="custom-text my-0 font-semibold">
          {invoiceData?.clientEmail || ""}
        </p>
        <p className="custom-text my-0 font-semibold">
          {invoiceData?.clientAddress || ""}
        </p>
        <table className="w-full text-xs mt-1">
          <tbody>
            <tr className="custom-text font-semibold">
              <td className="w-[10%]">No PO</td>
              <td className="w-[1%]">:</td>
              <td className="w-[60%]">{invoiceData?.POnumber || ""}</td>
            </tr>
            <tr className="custom-text font-semibold">
              <td className="w-[10%]">Tanggal PO</td>
              <td className="w-[1%]">:</td>
              <td className="w-[60%]">{invoiceData?.POdate || ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
