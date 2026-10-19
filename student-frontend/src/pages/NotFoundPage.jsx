import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "24px",
          background: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "44px",
          marginBottom: "20px",
          border: "1px solid #dbeafe",
        }}
      >
        🔍
      </div>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 800,
          color: "#1e293b",
          margin: "0 0 8px",
          letterSpacing: "-1px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#475569",
          margin: "0 0 12px",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          maxWidth: "420px",
          color: "#64748b",
          fontSize: "14px",
          lineHeight: "1.6",
          marginBottom: "28px",
        }}
      >
        The page you are looking for doesn't exist or has been moved. Use the navigation or return to the dashboard.
      </p>
      <Link to="/dashboard" className="btn-primary" style={{ padding: "12px 24px" }}>
        ← Return to Dashboard
      </Link>
    </div>
  );
}
