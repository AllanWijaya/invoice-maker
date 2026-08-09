import { BrandData, InvoiceData } from "@/types/invoice";

interface InvoiceSignatureProps {
  invoiceData: InvoiceData;
  brandData: BrandData;
}
export default function InvoiceSignature({
  invoiceData,
  brandData,
}: InvoiceSignatureProps) {
  return (
    <>
      <div className="border-t border-gray-300 pt-1 mt-1 custom-text text-xs">
        <table className="w-full" suppressHydrationWarning>
          <tbody>
            <tr>
              <td className="w-1/2">
                <p className="text-center uppercas font-semibold p-0 m-0">
                  {invoiceData?.receiver}
                </p>
              </td>
              <td className="w-1/2">
                <p className="text-center uppercas font-semibold p-0 m-0">
                  {invoiceData?.best_regards}
                </p>
              </td>
            </tr>
            {brandData?.esign ? (
              <tr>
                <td className="w-1/2"></td>
                <td className="flex justify-center items-center">
                  {Array.from({
                    length: invoiceData?.space_best_regards || 0,
                  }).map((_, index) => (
                    <br key={index} />
                  ))}
                  <img
                    src={brandData?.esign}
                    alt="Company Esign"
                    className="max-h-20 max-w-[180px] object-contain"
                  />
                  {Array.from({
                    length: invoiceData?.space_best_regards || 0,
                  }).map((_, index) => (
                    <br key={index} />
                  ))}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={2}>
                  {Array.from({
                    length: invoiceData?.space_best_regards || 0,
                  }).map((_, index) => (
                    <br key={index} />
                  ))}
                </td>
              </tr>
            )}
            <tr>
              <td className="w-1/2">
                {invoiceData?.receiver_name && (
                  <p className="text-center uppercas font-semibold underline m-0">
                    {invoiceData?.receiver_name}
                  </p>
                )}
              </td>
              <td className="w-1/2">
                {invoiceData?.best_regards_name && (
                  <p className="text-center uppercas font-semibold underline m-0">
                    {invoiceData?.best_regards_name}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {invoiceData?.notes && (
        <div className="border-t border-gray-300 mt-2 pt-1 text-xs">
          <p className="custom-text uppercase font-semibold mb-0">Catatan</p>
          <div className="custom-text whitespace-pre-line text-gray-700">
            {invoiceData?.notes}
          </div>
        </div>
      )}
    </>
  );
}
