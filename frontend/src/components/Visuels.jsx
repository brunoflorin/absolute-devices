export default function Visuels({ visuels, onClick }) {
  if (!visuels || visuels.length === 0) return null;

  const resolveSrc = (src) => {
    if (!src) return "";
    return src.startsWith("/") ? src : `/visuels/${src}`;
  };

  const isPdf = (src) => /\.pdf$/i.test(src);
  const isImage = (src) => /\.(png|jpe?g|webp|gif|svg)$/i.test(src);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        marginTop: 20,
      }}
    >
      {visuels.map((v) => {
        const src = resolveSrc(v.src);
        const pdf = isPdf(src);
        const image = isImage(src);
        const clickable = typeof onClick === "function";

        return (
          <div key={src} style={{ textAlign: "center" }}>
            <div
              onClick={() => clickable && onClick(src)}
              style={{
                cursor: clickable ? "pointer" : "default",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
            >
              {pdf ? (
                <iframe
                  src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={v.label || "PDF"}
                  style={{
                    width: "100%",
                    height: 280,
                    border: "none",
                    display: "block",
                    pointerEvents: "none",
                    background: "#fff",
                  }}
                />
              ) : image ? (
                <img
                  src={src}
                  alt={v.label || ""}
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    fontSize: 14,
                  }}
                >
                  Aperçu non disponible
                </div>
              )}
            </div>

            {v.label && (
              <div style={{ marginTop: 6, fontSize: 14 }}>
                {v.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}