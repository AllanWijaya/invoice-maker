import { VERSION } from "@/lib/AppConfig";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 text-sm">
        <div className="flex items-center gap-2 text-zinc-700">
          <FileText className="h-4 w-4 text-zinc-500" />
          <span className="font-medium">Invoice Maker</span>
        </div>

        <div className="text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} Invoice Maker. All rights reserved.
          </p>
        </div>
        <p className="text-zinc-500">
          Version <strong>{VERSION}</strong>
        </p>
      </div>
    </footer>
  );
}
