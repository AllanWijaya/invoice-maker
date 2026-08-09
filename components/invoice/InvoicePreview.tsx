import { InvoicePreviewProps } from "@/types/invoice";
import InvoicePaginator from "./InvoicePaginator";

export default function InvoicePreview(props: InvoicePreviewProps) {
  if (!props || !props.invoiceData) return null;

  return <InvoicePaginator {...props} />;
}
