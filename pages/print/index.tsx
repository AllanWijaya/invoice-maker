import InvoicePreview from "@/pages/components/InvoicePreview";
import { useRef } from "react";

export default function PrintPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const appConfig =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("app-config") ?? "{}")
      : null;

  const invoiceData = appConfig?.state?.invoiceData;

  const brandData = appConfig?.state?.brandData;

  const printOptions = appConfig?.state?.printOptions;

  return (
    <InvoicePreview
      previewRef={previewRef}
      brandData={brandData}
      invoiceData={invoiceData}
      printOptions={printOptions}
    />
  );
}
