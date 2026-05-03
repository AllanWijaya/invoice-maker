interface HeaderProps {
  onSave: () => void;
  onDownload: () => void;
  onShowHistory: () => void;
}
export default function Header({
  onSave,
  onDownload,
  onShowHistory,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-bottom sticky-top">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h1 className="h3 mb-0 text-dark fw-bold">
              Invoice<span className="fw-bold text-primary">Pro</span>
            </h1>
            <p className="text-muted small mb-0">
              Minimalis • Elegan • Profesional
            </p>
          </div>
          <div className="d-flex gap-2">
            <button onClick={onSave} className="btn btn-success btn-sm">
              💾 Simpan
            </button>
            <button onClick={onDownload} className="btn btn-primary btn-sm">
              📥 Download JSON
            </button>
            <button
              onClick={onShowHistory}
              className="btn btn-secondary btn-sm"
            >
              📋 Riwayat
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
