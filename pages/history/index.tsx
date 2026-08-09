import { useRouter } from "next/navigation";
import MyButton from "@/components/form/MyButton";
import { ArrowBigLeftDash, Trash } from "lucide-react";
import { InvoiceData } from "@/types/invoice";
import { useLocalStorage } from "@/hooks/UseLocalStorage";
import MyInput from "@/components/form/MyInput";

export default function HistoryPage() {
  const router = useRouter();
  const [data] = useLocalStorage<InvoiceData[]>("saved_invoices", []);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    "search_term",
    "",
  );

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    localStorage.setItem("saved_invoices", JSON.stringify(updatedData));
    router.refresh();
  };
  const filterData = (data: InvoiceData[], searchTerm: string) => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

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

      <div className="mt-6">
        <MyInput
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <p className="mt-2 text-sm text-zinc-600"></p>
      </div>

      {filterData(data, searchTerm).map((_item, _i) => (
        <div key={_i} className="mt-4 flex items-center justify-between">
          <MyButton key={_i} onClick={() => router.push(`/?id=${_i}`)}>
            Invoice #{_item.invoiceNo} -{" "}
            {new Date(_item.date).toLocaleDateString()}
          </MyButton>
          <MyButton
            key={_i}
            onClick={() => handleDelete(_i)}
            className="bg-red-500 hover:bg-red-600 text-white hover:text-black border-red-500"
            style={{ width: 100 }}
          >
            <Trash className="h-4 w-4" />
          </MyButton>
        </div>
      ))}
    </div>
  );
}
