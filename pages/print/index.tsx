import { useAppConfigStore } from "@/hooks/store/appConfigStore";
import InvoicePreview from "@/pages/components/InvoicePreview";
import { useRef } from "react";

export default function PrintPage() {
  const hasHydrated = useAppConfigStore((s) => s.hasHydrated);

  const previewRef = useRef<HTMLDivElement>(null);

  if (!hasHydrated) {
    return null;
  }

  return <InvoicePreview previewRef={previewRef} />;
}
