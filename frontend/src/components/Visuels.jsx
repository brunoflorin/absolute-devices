export default function Visuels({ visuels, onClick }) {
  if (!visuels || visuels.length === 0) return null;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 16,
      marginTop: 20
    }}>
      {visuels.map(v => (
        <div key={v.src} style={{ textAlign: "center" }}>
          <img
            src={v.src.startsWith("/") ? v.src : `/visuels/${v.src}`}
            alt={v.label || ""}
            style={{ maxWidth: "100%", cursor: onClick ? "pointer" : "default" }}
            onClick={() => onClick && onClick(v.src)}
          />
          {v.label && (
            <div style={{ marginTop: 6, fontSize: 14 }}>
              {v.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
