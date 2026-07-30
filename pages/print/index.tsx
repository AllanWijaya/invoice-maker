import InvoicePreview from "@/pages/components/InvoicePreview";
import { useRef } from "react";

export default function PrintPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  return <InvoicePreview previewRef={previewRef} />;
}
