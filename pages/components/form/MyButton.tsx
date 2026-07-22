export default function MyButton({
  children,
  onClick,
  props,
}: {
  children: React.ReactNode;
  onClick: () => void;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs border border-zinc-200 font-medium shadow-sm transition-all hover:bg-zinc-100 hover:border-zinc-300 active:scale-95"
      {...props}
    >
      {children}
    </button>
  );
}
