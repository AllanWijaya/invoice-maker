import { Download, History, Save, ReceiptText } from "lucide-react";
import MyButton from "./MyButton";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onSave: () => void;
  onDownload: () => void;
  onShowHistory: () => void;
}

export default function Header({
  onSave,
  onDownload,
  onShowHistory,
}: HeaderProps) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm">
            <ReceiptText className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold tracking-tight text-zinc-900">
              InvoicePro
            </h1>
            <span className="hidden rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 sm:inline-block">
              Beta
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MyButton onClick={onSave}>
            <Save className="h-3.5 w-3.5" />
            <span>Save</span>
          </MyButton>

          <MyButton onClick={onDownload}>
            <Download className="h-3.5 w-3.5 text-zinc-500" />
            <span>Export</span>
          </MyButton>

          {/* <MyButton onClick={onShowHistory}> */}
          <MyButton onClick={() => router.push("/history")}>
            <History className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline">History</span>
          </MyButton>
        </div>
      </div>
    </header>
  );
}
