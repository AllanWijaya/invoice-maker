interface MyInputProps {
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export default function MyInput({
  className,
  placeholder,
  value,
  onChange,
  ...props
}: MyInputProps) {
  return (
    <input
      type="text"
      className={`w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className ?? ""}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...props}
    />
  );
}
