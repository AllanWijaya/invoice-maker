import { useRouter } from "next/navigation";
import MyButton from "../components/form/MyButton";
import { ArrowBigLeftDash } from "lucide-react";
import { InvoiceData } from "@/types/invoice";
import { useLocalStorage } from "@/hooks/UseLocalStorage";

export default function HistoryPage() {
  const router = useRouter();
  const [data] = useLocalStorage<InvoiceData[]>("saved_invoices", []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div style={{ width: 100 }}>
        <MyButton onClick={() => router.push("/")}>
          <ArrowBigLeftDash className="h-4 w-4" />
          Back
        </MyButton>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-zinc-900">History</h1>
        <p className="mt-2 text-sm text-zinc-600"></p>
      </div>

      {data.map((_item, _i) => (
        <MyButton key={_i} onClick={() => router.push(`/?id=${_i}`)}>
          Invoice #{_item.invoiceNo} -{" "}
          {new Date(_item.date).toLocaleDateString()}
        </MyButton>
      ))}
    </div>
  );
}
