import { useState, useEffect } from "react";
import { InvoiceData, SavedInvoice } from "../types/invoice";

interface LoadSavedInvoicesProps {
  onLoadInvoice: (data: InvoiceData) => void;
}

export default function LoadSavedInvoices({
  onLoadInvoice,
}: LoadSavedInvoicesProps) {
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([]);
  const [showModal, setShowModal] = useState(false);

  const loadInvoices = () => {
    const saved = localStorage.getItem("saved_invoices");
    if (saved) {
      setSavedInvoices(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const deleteInvoice = (index: number) => {
    if (confirm("Hapus invoice ini?")) {
      const updated = [...savedInvoices];
      updated.splice(index, 1);
      localStorage.setItem("saved_invoices", JSON.stringify(updated));
      loadInvoices();
    }
  };

  const loadInvoice = (invoice: SavedInvoice) => {
    const { ...cleanInvoice } = invoice;
    onLoadInvoice(cleanInvoice as InvoiceData);
    setShowModal(false);
    alert("Invoice berhasil dimuat!");
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-secondary btn-sm w-100"
      >
        📋 Riwayat Invoice
      </button>

      {/* Modal Bootstrap */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📋 Invoice Tersimpan</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                {savedInvoices.length === 0 ? (
                  <p className="text-muted text-center py-4">
                    Belum ada invoice tersimpan
                  </p>
                ) : (
                  <div className="list-group">
                    {savedInvoices.map((invoice, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <strong>{invoice.invoiceNo}</strong>
                            <br />
                            <small className="text-muted">
                              {invoice.clientName} • {invoice.date}
                            </small>
                            <br />
                            <small className="text-muted">
                              Tersimpan:{" "}
                              {new Date(invoice.savedAt).toLocaleString()}
                            </small>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => loadInvoice(invoice)}
                              className="btn btn-sm btn-primary"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => deleteInvoice(index)}
                              className="btn btn-sm btn-danger"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
