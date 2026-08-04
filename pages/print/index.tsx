import { useRouter } from "next/router";
import { useMemo, useRef } from "react";
import InvoicePreview from "@/pages/components/InvoicePreview";

export default function PrintPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const data = useMemo(() => {
    if (!router.isReady || typeof router.query.data !== "string") {
      return null;
    }

    try {
      return JSON.parse(decodeURIComponent(router.query.data));
    } catch {
      return null;
    }
  }, [router.isReady, router.query.data]);

  if (!data) {
    return null;
  }

  return (
    <InvoicePreview
      previewRef={previewRef}
      invoiceData={data.invoiceData}
      brandData={data.brandData}
      printOptions={data.printOptions}
    />
  );
}
