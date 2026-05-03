/* eslint-disable @next/next/no-img-element */
import { BrandData } from "@/types/invoice";

interface BrandSettingsProps {
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  removeLogo: () => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  colorOptions: { name: string; value: string }[];
}

export default function BrandSettings({
  brandData = {
    logo: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    footerText: "",
    taxRate: 0,
    accentColor: "#0d6efd",
  },
  setBrandData,
  removeLogo,
  handleLogoUpload,
  colorOptions = [
    { name: "Biru", value: "#0d6efd" },
    { name: "Hijau", value: "#198754" },
    { name: "Merah", value: "#dc3545" },
    { name: "Ungu", value: "#6f42c1" },
    { name: "Oranye", value: "#fd7e14" },
    { name: "Hitam", value: "#212529" },
  ],
}: BrandSettingsProps) {
  return (
    <>
      <div className="mb-4">
        <label className="form-label fw-semibold">Logo Perusahaan</label>
        <div className="border rounded p-3 text-center bg-light">
          {brandData.logo ? (
            <div className="mb-2">
              <img
                src={brandData.logo}
                alt="Company Logo"
                style={{
                  maxHeight: "100px",
                  maxWidth: "200px",
                  objectFit: "contain",
                }}
                className="mb-2"
              />
              <br />
              <button
                onClick={removeLogo}
                className="btn btn-sm btn-outline-danger"
              >
                Hapus Logo
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-2 text-muted">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="form-control form-control-sm"
              />
              <small className="text-muted d-block mt-2">
                Format: JPG, PNG (Max 2MB)
              </small>
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Nama Perusahaan</label>
        <input
          type="text"
          className="form-control"
          value={brandData.companyName}
          onChange={(e) =>
            setBrandData({
              ...brandData,
              companyName: e.target.value,
            })
          }
          placeholder="PT Example Indonesia"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Alamat Perusahaan</label>
        <textarea
          className="form-control"
          rows={2}
          value={brandData.companyAddress}
          onChange={(e) =>
            setBrandData({
              ...brandData,
              companyAddress: e.target.value,
            })
          }
          placeholder="Jl. Sudirman No. 123, Jakarta"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Telepon</label>
          <input
            type="text"
            className="form-control"
            value={brandData.companyPhone}
            onChange={(e) =>
              setBrandData({
                ...brandData,
                companyPhone: e.target.value,
              })
            }
            placeholder="(021) 1234567"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            value={brandData.companyEmail}
            onChange={(e) =>
              setBrandData({
                ...brandData,
                companyEmail: e.target.value,
              })
            }
            placeholder="info@company.com"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Teks Footer</label>
        <input
          type="text"
          className="form-control"
          value={brandData.footerText}
          onChange={(e) =>
            setBrandData({
              ...brandData,
              footerText: e.target.value,
            })
          }
          placeholder="Terima kasih atas kepercayaan Anda"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">PPN / Tax Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={brandData.taxRate}
            onChange={(e) =>
              setBrandData({
                ...brandData,
                taxRate: parseFloat(e.target.value) || 0,
              })
            }
            step="0.5"
          />
          <small className="text-muted">Contoh: 11 untuk PPN 11%</small>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Warna Aksen</label>
          <div className="d-flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() =>
                  setBrandData({
                    ...brandData,
                    accentColor: color.value,
                  })
                }
                className="btn rounded-circle p-0"
                style={{
                  backgroundColor: color.value,
                  width: "32px",
                  height: "32px",
                  border:
                    brandData.accentColor === color.value
                      ? "2px solid #000"
                      : "1px solid #ddd",
                }}
                title={color.name}
                type="button"
              />
            ))}
            <input
              type="color"
              className="form-control form-control-color w-auto"
              value={brandData.accentColor}
              onChange={(e) =>
                setBrandData({
                  ...brandData,
                  accentColor: e.target.value,
                })
              }
              style={{ width: "50px" }}
            />
          </div>
        </div>
      </div>

      <div className="border-top pt-3 mt-2">
        <label className="form-label fw-semibold">Preview Brand</label>
        <div className="border rounded p-3 bg-light">
          <div className="d-flex align-items-center gap-3">
            {brandData.logo && (
              <img
                src={brandData.logo}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
            )}
            <div>
              <strong style={{ color: brandData.accentColor }}>
                {brandData.companyName || "Nama Perusahaan"}
              </strong>
              <br />
              <small className="text-muted">
                {brandData.companyAddress || "Alamat perusahaan"}
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
