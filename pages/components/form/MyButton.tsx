import { ButtonHTMLAttributes } from "react";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function MyButton({
  children,
  className,
  ...props
}: MyButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs border border-zinc-200 font-medium shadow-sm transition-all hover:bg-zinc-100 hover:border-zinc-300 active:scale-95 ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
