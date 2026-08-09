import { formatCurrency } from "@/lib/Helper";
import { BrandData, InvoiceData, InvoiceItem } from "@/types/invoice";

interface Props {
  item: InvoiceItem;
  invoiceData: InvoiceData;
  brandData: BrandData;
}

export default function InvoiceTableRow({ item, invoiceData }: Props) {
  return (
    <tr data-row>
      <td className="p-1 text-center border">{item.no}</td>

      <td className="p-1 px-2 border">{item.description || "-"}</td>

      <td className="p-1 text-center border">{item.quantity}</td>

      <td className="p-1 text-center border">{item.unit}</td>

      <td className="p-1 px-2 border">
        <div className="flex justify-between">
          <span>Rp.</span>

          <span>{formatCurrency(item.price, false, 2)}</span>
        </div>
      </td>

      <td className="p-1 px-2 border">
        <div className="flex justify-between">
          <span>Rp.</span>

          <span>
            {formatCurrency(
              invoiceData.isCustomInputPrice
                ? (item.totalPrice ?? 0)
                : item.price * item.quantity,

              false,
              2,
            )}
          </span>
        </div>
      </td>
    </tr>
  );
}
