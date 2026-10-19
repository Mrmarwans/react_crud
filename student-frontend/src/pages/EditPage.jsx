import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api/students";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_URL}/${id}/edit`)
      .then((res) => {
        if (!isMounted) return;
        const student = res.data.data;
        if (student) {
          setName(student.name ?? "");
          setEmail(student.email ?? "");
          setCourse(student.course ?? "");
        }
      })
      .catch(() => {
        // Fallback: try fetching all students and find by id
        axios
          .get(API_URL)
          .then((res) => {
            if (!isMounted) return;
            const student = (res.data.data ?? []).find((s) => String(s.id) === String(id));
            if (student) {
              setName(student.name ?? "");
              setEmail(student.email ?? "");
              setCourse(student.course ?? "");
            } else {
              toast.error("Student record not found.");
              navigate("/students");
            }
          })
          .catch(() => {
            toast.error("Failed to load student details.");
            navigate("/students");
          });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !course.trim()) {
      toast.warning("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.put(`${API_URL}/${id}`, { name, email, course });
      toast.success(res.data.message || "Student updated successfully!");
      navigate("/students");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update student.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (focused) => ({
    width: "100%",
    padding: "11px 14px 11px 40px",
    border: `1.5px solid ${focused ? "#1a56db" : "#e2e8f0"}`,
    borderRadius: "10px",
    fontSize: "13.5px",
    color: "#1e293b",
    background: "#fff",
    outline: "none",
    transition: "all 0.18s ease",
    boxShadow: focused ? "0 0 0 3px rgba(26,86,219,0.12)" : "none",
    boxSizing: "border-box",
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <span className="loading-spinner" /> Loading student details…
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "560px", margin: "20px auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid #e5eaf5",
          boxShadow: "0 4px 24px rgba(30,64,175,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a, #1a56db)",
            padding: "24px 28px",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              ✏️
            </div>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
                Edit Student #{id}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "12.5px",
                  marginTop: "3px",
                  margin: 0,
                }}
              >
                Update the details below and save your changes
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#94a3b8",
                  }}
                >
                  👤
                </span>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle(focusedField === "name")}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#94a3b8",
                  }}
                >
                  ✉️
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle(focusedField === "email")}
                />
              </div>
            </div>

            {/* Course */}
            <div>
              <label
                htmlFor="course"
                style={{
                  display: "block",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: "6px",
                }}
              >
                Course
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#94a3b8",
                  }}
                >
                  📚
                </span>
                <input
                  id="course"
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  onFocus={() => setFocusedField("course")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle(focusedField === "course")}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "14px",
                justifyContent: "center",
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner" style={{ borderColor: "#fff", borderTopColor: "transparent" }} />
                  Updating Student…
                </>
              ) : (
                "✅ Update Student"
              )}
            </button>

            <Link
              to="/students"
              style={{
                display: "block",
                textAlign: "center",
                padding: "11px",
                background: "#f8fafc",
                color: "#64748b",
                border: "1.5px solid #e2e8f0",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
