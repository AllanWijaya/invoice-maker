import { InvoicePreviewProps } from "@/types/invoice";
import InvoicePaginator from "./InvoicePaginator";

export default function InvoicePreview(props: InvoicePreviewProps) {
  return <InvoicePaginator {...props} />;
}
