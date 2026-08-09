import { calculateTotal, formatTerbilang, ucwords } from "@/lib/Helper";
import { BrandData, InvoiceData } from "@/types/invoice";

interface InvoiceSummaryProps {
  invoiceData: InvoiceData;
  brandData: BrandData;
}
export default function InvoiceSummary({
  invoiceData,
  brandData,
}: InvoiceSummaryProps) {
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
    <table className="custom-text w-full border-t border-black text-xs">
      <tbody>
        <tr>
          <td
            className="font-semibold pt-1"
            style={{ width: `${column.terbilang}%` }}
          >
            Terbilang
          </td>
          <td className="font-semibold pt-1 w-[2%]">:</td>
          <td
            className="pr-2 font-semibold italic pt-1 w-[80%]"
            style={{ color: brandData?.accentColor }}
          >
            {ucwords(
              formatTerbilang(
                invoiceData?.totalPrice ||
                  calculateTotal(
                    invoiceData?.items,
                    brandData?.taxRate,
                    brandData?.jenisTransaksi,
                  ),
              ),
            )}{" "}
            Rupiah
          </td>
        </tr>
      </tbody>
    </table>
  );
}
