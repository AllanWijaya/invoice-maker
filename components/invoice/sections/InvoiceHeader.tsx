import { BrandData, InvoiceData } from "@/types/invoice";

interface InvoiceHeaderProps {
  invoiceData: InvoiceData;
  brandData: BrandData;
}
export default function InvoiceHeader({
  invoiceData,
  brandData,
}: InvoiceHeaderProps) {
  return (
    <div className="border-b-4 border-black pb-1 mb-2">
      <div className="flex justify-between items-start">
        {brandData?.useLetterhead ? (
          <div className="w-3/4 flex items-center gap-3">
            {brandData?.logo && (
              <img
                src={brandData?.logo}
                alt="Logo"
                className="w-[100px] shrink-0 object-contain"
              />
            )}
            <div className="w-full">
              <h2
                className="text-lg font-bold m-0"
                style={{ color: brandData?.accentColor }}
              >
                {brandData?.companyName || "INVOICE"}
              </h2>
              <p className="custom-text m-0 text-sm text-gray-700">
                {brandData?.companyAddress}
              </p>
              <table className="w-full text-xs">
                <tbody>
                  <tr className="custom-text">
                    <td className="w-[19%]">Telp | Email</td>
                    <td className="w-[1%]">: </td>
                    <td className="w-[60%]">
                      {brandData?.companyPhone || ""}
                      {brandData?.companyEmail
                        ? ` | ${brandData?.companyEmail}`
                        : ""}
                    </td>
                  </tr>
                  <tr className="custom-text">
                    <td className="w-[19%]">NPWP</td>
                    <td className="w-[1%]">: </td>
                    <td className="w-[60%]">{brandData?.companyNPWP || ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-3/4"></div>
        )}
        <div className="w-1/4 text-right text-xs">
          <span className="inline-block bg-gray-500 text-white text-[10px] px-2 py-0.5 rounded mb-1 font-medium">
            INVOICE
          </span>
          <p className="m-0 font-semibold text-gray-800">
            {invoiceData?.invoiceNo || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
