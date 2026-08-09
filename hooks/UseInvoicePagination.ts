import { useMemo } from "react";
import { InvoiceItem } from "@/types/invoice";

export interface InvoicePage {
  page: number;
  totalPages: number;
  items: InvoiceItem[];
}

interface Options {
  items: InvoiceItem[];

  /**
   * Tinggi total halaman dalam px.
   * A4 297mm @ 96dpi ≈ 1122px
   */
  pageHeight: number;

  /**
   * Tinggi bagian atas halaman.
   */
  headerHeight: number;
  customerHeight: number;

  /**
   * Tinggi bagian bawah invoice.
   * Hanya dibutuhkan oleh halaman terakhir.
   */
  summaryHeight: number;
  signatureHeight: number;
  notesHeight: number;

  /**
   * Tinggi aktual setiap row yang
   * sudah diukur dari DOM.
   *
   * index rowHeights harus sama dengan
   * index items.
   */
  rowHeights: number[];
}

export default function useInvoicePagination({
  items,
  pageHeight,
  headerHeight,
  customerHeight,
  summaryHeight,
  signatureHeight,
  notesHeight,
  rowHeights,
}: Options): InvoicePage[] {
  return useMemo(() => {
    if (!items.length) {
      return [];
    }

    /**
     * Tinggi yang digunakan oleh bagian atas
     * setiap halaman.
     *
     * Header + Customer akan muncul
     * pada setiap halaman.
     */
    const topHeight = headerHeight + customerHeight;

    /**
     * Tinggi yang dibutuhkan oleh bagian bawah
     * invoice pada halaman terakhir.
     */
    const bottomHeight = summaryHeight + signatureHeight + notesHeight;

    /**
     * Untuk halaman selain halaman terakhir,
     * seluruh tinggi halaman dapat digunakan
     * untuk tabel.
     */
    const normalTableHeight = pageHeight - topHeight;

    /**
     * Halaman terakhir harus menyisakan ruang
     * untuk Summary + Signature + Notes.
     */
    const lastTableHeight = pageHeight - topHeight - bottomHeight;

    /**
     * Hindari nilai negatif jika konfigurasi
     * komponen terlalu besar.
     */
    const safeNormalTableHeight = Math.max(0, normalTableHeight);

    const safeLastTableHeight = Math.max(0, lastTableHeight);

    const pages: InvoicePage[] = [];

    let currentItems: InvoiceItem[] = [];
    let currentHeight = 0;

    /**
     * Fungsi untuk membuat page.
     */
    const pushPage = () => {
      if (!currentItems.length) {
        return;
      }

      pages.push({
        page: pages.length + 1,
        totalPages: 0,
        items: currentItems,
      });

      currentItems = [];
      currentHeight = 0;
    };

    /**
     * ------------------------------------------------
     * STRATEGI
     * ------------------------------------------------
     *
     * Kita belum tahu halaman terakhir akan berada
     * di mana.
     *
     * Karena itu kita terlebih dahulu membagi item
     * menggunakan tinggi normal halaman.
     *
     * Setelah semua item terbagi, kita cek halaman
     * terakhir apakah masih cukup untuk Summary,
     * Signature dan Notes.
     */

    items.forEach((item, index) => {
      const height = Math.max(1, rowHeights[index] ?? 30);

      /**
       * Jika row sendiri lebih besar dari ruang
       * halaman, tetap masukkan row tersebut.
       *
       * Jangan sampai terjadi infinite loop.
       */
      if (currentItems.length === 0 && height > safeNormalTableHeight) {
        currentItems.push(item);
        currentHeight = height;

        pushPage();

        return;
      }

      /**
       * Apakah row masih muat di halaman?
       */
      const willOverflow = currentHeight + height > safeNormalTableHeight;

      if (willOverflow) {
        pushPage();
      }

      currentItems.push(item);
      currentHeight += height;
    });

    /**
     * Masukkan item terakhir.
     */
    pushPage();

    /**
     * ------------------------------------------------
     * VALIDASI HALAMAN TERAKHIR
     * ------------------------------------------------
     *
     * Halaman terakhir harus mempunyai ruang:
     *
     * Header
     * Customer
     * Table
     * Summary
     * Signature
     * Notes
     *
     * Jika tabel pada halaman terakhir terlalu tinggi,
     * pindahkan beberapa item ke halaman baru.
     */
    if (pages.length > 0) {
      let lastPage = pages[pages.length - 1];

      let lastPageHeight = lastPage.items.reduce((total, item) => {
        const index = items.indexOf(item);

        return total + Math.max(1, rowHeights[index] ?? 30);
      }, 0);

      /**
       * Selama halaman terakhir tidak cukup untuk
       * Summary + Signature + Notes, pindahkan
       * item terakhir ke halaman baru.
       */
      while (
        lastPage.items.length > 1 &&
        lastPageHeight > safeLastTableHeight
      ) {
        const movedItem = lastPage.items.pop();

        if (!movedItem) {
          break;
        }

        const index = items.indexOf(movedItem);

        lastPageHeight -= Math.max(1, rowHeights[index] ?? 30);

        /**
         * Buat halaman baru.
         */
        const newPage: InvoicePage = {
          page: pages.length + 1,
          totalPages: 0,
          items: [movedItem],
        };

        pages.push(newPage);

        /**
         * Karena item dipindahkan ke page baru,
         * page baru sekarang menjadi halaman terakhir.
         */
        lastPage = pages[pages.length - 1];

        /**
         * Kalau item yang dipindahkan sendiri lebih
         * besar dari ruang halaman terakhir,
         * tetap biarkan. Ini lebih aman daripada
         * infinite loop.
         */
        break;
      }
    }

    /**
     * Update nomor halaman setelah seluruh
     * proses selesai.
     */
    const totalPages = pages.length;

    return pages.map((page, index) => ({
      ...page,
      page: index + 1,
      totalPages,
    }));
  }, [
    items,
    pageHeight,
    headerHeight,
    customerHeight,
    summaryHeight,
    signatureHeight,
    notesHeight,
    rowHeights,
  ]);
}
