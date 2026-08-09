import { RefObject, useLayoutEffect, useState } from "react";

export default function useMeasureRows(
  tbodyRef: RefObject<HTMLTableSectionElement | null>,
  deps: unknown[] = [],
) {
  const [rowHeights, setRowHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!tbodyRef.current) return;

    const measure = () => {
      const rows = Array.from(
        tbodyRef.current!.querySelectorAll("tr[data-row]"),
      );

      setRowHeights(
        rows.map((row) => Math.ceil(row.getBoundingClientRect().height)),
      );
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(tbodyRef.current);

    return () => observer.disconnect();
  }, deps);

  return rowHeights;
}
