import { InvoiceData, InvoiceItem } from "../../types/invoice";

interface InvoiceFormProps {
  onUpdate: (data: InvoiceData) => void;
  data: InvoiceData;
}

export default function InvoiceForm({
  onUpdate,
  data = {
    invoiceNo: "",
    date: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    notes: "",
  },
}: InvoiceFormProps) {
  const addItem = () => {
    const newItem: InvoiceItem = {
      no: data.items.length + 1,
      id: Date.now(),
      description: "",
      quantity: 1,
      price: 0,
    };
    onUpdate({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: number) => {
    onUpdate({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    onUpdate({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  return (
    <div className="space-y-4">
      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label small text-muted text-uppercase fw-semibold">
            No. Invoice
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={data.invoiceNo}
            onChange={(e) => onUpdate({ ...data, invoiceNo: e.target.value })}
            placeholder="INV-20250101-001"
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label small text-muted text-uppercase fw-semibold">
            Tanggal
          </label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={data.date}
            onChange={(e) => onUpdate({ ...data, date: e.target.value })}
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
          value={data.clientName}
          onChange={(e) => onUpdate({ ...data, clientName: e.target.value })}
        />
        <input
          type="email"
          className="form-control form-control-sm mb-2"
          placeholder="Email"
          value={data.clientEmail}
          onChange={(e) => onUpdate({ ...data, clientEmail: e.target.value })}
        />
        <textarea
          className="form-control form-control-sm"
          rows={2}
          placeholder="Alamat"
          value={data.clientAddress}
          onChange={(e) => onUpdate({ ...data, clientAddress: e.target.value })}
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
                <th style={{ width: "80" }}>Qty</th>
                <th style={{ width: "120" }}>Harga</th>
                <th style={{ width: "40" }}></th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Deskripsi item"
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
        {data.items.length === 0 && (
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
          value={data.notes}
          onChange={(e) => onUpdate({ ...data, notes: e.target.value })}
          placeholder="Catatan untuk klien..."
        />
      </div>
    </div>
  );
}
