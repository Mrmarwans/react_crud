import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please provide email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back, Admin!");
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at top, #1e3a8a, #0f172a)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a, #1a56db)",
            padding: "32px 28px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              marginBottom: "12px",
            }}
          >
            🎓
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "#fff" }}>
            EduPortal Admin
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
            Sign in to access your student dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ padding: "32px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label
                htmlFor="login-email"
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "13px",
                fontSize: "14.5px",
                justifyContent: "center",
                marginTop: "10px",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Signing in…" : "Sign In to Dashboard →"}
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              to="/dashboard"
              style={{
                fontSize: "12.5px",
                color: "#1a56db",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Continue as Guest →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
