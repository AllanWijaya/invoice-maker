import { InvoiceData, InvoiceItem } from "@/types/invoice";

interface InvoiceSettingsProps {
  invoiceData: InvoiceData;
  setInvoiceData: (data: InvoiceData) => void;
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => void;
  handleLoadItemsFromJson: () => void;
  handleLoadFullInvoice: () => void;
}

export default function InvoiceSettings({
  invoiceData = {
    invoiceNo: "",
    date: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    notes: "",
  },
  setInvoiceData,
  addItem,
  removeItem,
  updateItem,
  handleLoadItemsFromJson,
  handleLoadFullInvoice,
}: InvoiceSettingsProps) {
  return (
    <>
      <div className="row mb-3">
        <div className="col-12 mb-3">
          <label className="form-label small text-muted text-uppercase fw-semibold">
            No. Invoice
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={invoiceData.invoiceNo}
            onChange={(e) =>
              setInvoiceData({
                ...invoiceData,
                invoiceNo: e.target.value,
              })
            }
            placeholder="INV-20250101-001"
          />
        </div>
        <div className="col-12">
          <label className="form-label small text-muted text-uppercase fw-semibold">
            Tanggal
          </label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={invoiceData.date}
            onChange={(e) =>
              setInvoiceData({
                ...invoiceData,
                date: e.target.value,
              })
            }
          />
        </div>
      </div>

      <hr className="my-3" />

      <div className="mb-3">
        <label className="form-label small text-muted text-uppercase fw-semibold">
          Informasi Klien
        </label>
        <input
          type="text"
          className="form-control form-control-sm mb-2"
          placeholder="Nama Klien"
          value={invoiceData.clientName}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              clientName: e.target.value,
            })
          }
        />
        <input
          type="email"
          className="form-control form-control-sm mb-2"
          placeholder="Email"
          value={invoiceData.clientEmail}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              clientEmail: e.target.value,
            })
          }
        />
        <textarea
          className="form-control form-control-sm"
          rows={2}
          placeholder="Alamat"
          value={invoiceData.clientAddress}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              clientAddress: e.target.value,
            })
          }
        />
      </div>

      <hr className="my-3" />

      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label className="form-label small text-muted text-uppercase fw-semibold mb-0">
            Item Invoice
          </label>
          <button
            onClick={addItem}
            className="btn btn-link btn-sm text-primary p-0"
          >
            + Tambah Item
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Deskripsi</th>
                <th style={{ width: "70" }}>Qty</th>
                <th style={{ width: "100" }}>Harga</th>
                <th style={{ width: "30" }}></th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Nama item"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-center"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "price",
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-sm btn-link text-danger p-0"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {invoiceData.items.length === 0 && (
          <p className="text-muted text-center small py-3">Belum ada item</p>
        )}
      </div>

      <hr className="my-3" />

      <div className="mb-3">
        <label className="form-label small text-muted text-uppercase fw-semibold">
          Catatan
        </label>
        <textarea
          className="form-control form-control-sm"
          rows={2}
          value={invoiceData.notes}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              notes: e.target.value,
            })
          }
          placeholder="Catatan untuk klien..."
        />
      </div>

      <hr className="my-3" />

      <div className="mt-3">
        <label className="form-label small text-muted text-uppercase fw-semibold">
          Load Data dari JSON
        </label>
        <div className="d-grid gap-2">
          <button
            onClick={handleLoadItemsFromJson}
            className="btn btn-outline-secondary btn-sm"
          >
            📂 Load Items.json
          </button>
          <small className="text-muted text-center">atau</small>
          <button
            onClick={handleLoadFullInvoice}
            className="btn btn-outline-primary btn-sm"
          >
            📂 Load Full Invoice.json
          </button>
        </div>
      </div>
    </>
  );
}
