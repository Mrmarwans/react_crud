import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api/students";

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(API_URL, { signal: controller.signal })
      .then((res) => {
        setStudents(res.data.data ?? []);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          toast.error("Failed to load students.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast.success("Student deleted successfully.");
    } catch {
      toast.error("Failed to delete student.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/${id}/edit`);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* ── Top Header Row ── */}
      <div className="page-title-row">
        <div>
          <h2>👥 Student Records</h2>
          <p style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
            Total {students.length} student{students.length === 1 ? "" : "s"} enrolled
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "9px 14px",
              borderRadius: "10px",
              border: "1.5px solid #e2e8f0",
              fontSize: "13px",
              outline: "none",
              background: "#fff",
              color: "#1e293b",
            }}
          />
          <Link to="/students/create" className="btn-primary">
            ＋ Add Student
          </Link>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="student-table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Email</th>
              <th>Course</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="empty-state">
                  <span className="loading-spinner" /> Loading students…
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-state">
                  {students.length === 0 ? (
                    <div>
                      <p style={{ marginBottom: "12px" }}>No students registered yet.</p>
                      <Link to="/students/create" className="btn-primary">
                        ＋ Add First Student
                      </Link>
                    </div>
                  ) : (
                    "No matching students found."
                  )}
                </td>
              </tr>
            ) : (
              filteredStudents.map((s, idx) => (
                <tr key={s.id}>
                  <td style={{ color: "#94a3b8", fontWeight: 600 }}>
                    #{s.id ? String(s.id).padStart(3, "0") : idx + 1}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        className="student-avatar"
                        style={{
                          background: `hsl(${(s.id * 47) % 360}, 65%, 91%)`,
                          color: `hsl(${(s.id * 47) % 360}, 55%, 35%)`,
                        }}
                      >
                        {s.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: "#1e293b" }}>{s.name}</span>
                    </div>
                  </td>
                  <td>{s.email}</td>
                  <td>
                    <span
                      style={{
                        background: "#eff6ff",
                        color: "#1a56db",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "20px",
                        border: "1px solid #dbeafe",
                      }}
                    >
                      {s.course ?? "General"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button onClick={() => handleEdit(s.id)} className="btn-edit">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="btn-delete">
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="student-cards">
        {loading ? (
          <div className="empty-state">
            <span className="loading-spinner" /> Loading students…
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            {students.length === 0 ? (
              <div>
                <p style={{ marginBottom: "12px" }}>No students registered yet.</p>
                <Link to="/students/create" className="btn-primary">
                  ＋ Add First Student
                </Link>
              </div>
            ) : (
              "No matching students found."
            )}
          </div>
        ) : (
          filteredStudents.map((s) => (
            <div key={s.id} className="student-card">
              <div className="student-card-name">
                <div
                  className="student-avatar"
                  style={{
                    background: `hsl(${(s.id * 47) % 360}, 65%, 91%)`,
                    color: `hsl(${(s.id * 47) % 360}, 55%, 35%)`,
                  }}
                >
                  {s.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div>{s.name}</div>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#1a56db",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "12px",
                      border: "1px solid #dbeafe",
                      display: "inline-block",
                      marginTop: "3px",
                    }}
                  >
                    {s.course ?? "General"}
                  </span>
                </div>
              </div>

              <div className="student-card-detail">
                📧 {s.email}
              </div>

              <div className="student-card-actions">
                <button onClick={() => handleEdit(s.id)} className="btn-edit">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(s.id)} className="btn-delete">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentListPage;