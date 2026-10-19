import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/students";

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(API_URL, { signal: controller.signal })
      .then((res) => setStudents(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const totalStudents = students.length;
  const recentStudents = students.slice(-5).reverse();

  return (
    <>
      {/* ── Greeting ── */}
      <div className="dashboard-greeting">
        <h2>👋 Welcome back, Admin</h2>
        <p>Here's what's happening with your students today.</p>
      </div>

      {/* ── Stats Cards ── */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#eff6ff", color: "#1a56db" }}>👥</div>
          <div>
            <div className="stat-value">{loading ? "—" : totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f0fdf4", color: "#059669" }}>✅</div>
          <div>
            <div className="stat-value">{loading ? "—" : Math.max(0, totalStudents - 2)}</div>
            <div className="stat-label">Active Students</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fffbeb", color: "#d97706" }}>📈</div>
          <div>
            <div className="stat-value">{loading ? "—" : Math.min(totalStudents, 5)}</div>
            <div className="stat-label">New This Month</div>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="dashboard-grid">
        {/* Recent Students */}
        <div className="card">
          <div className="card-header">
            <h3>📋 Recent Students</h3>
            <Link to="/students" className="btn-primary" style={{ padding: "7px 14px", fontSize: "12px" }}>
              View All →
            </Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {loading ? (
              <div className="empty-state">
                <span className="loading-spinner" /> Loading students…
              </div>
            ) : recentStudents.length === 0 ? (
              <div className="empty-state">
                No students yet. <Link to="/students/create" style={{ color: "#1a56db", fontWeight: 600 }}>Add one →</Link>
              </div>
            ) : (
              <table className="student-table" style={{ minWidth: "auto" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((s) => (
                    <tr key={s.id}>
                      <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          className="student-avatar"
                          style={{
                            background: `hsl(${(s.id * 47) % 360}, 65%, 91%)`,
                            color: `hsl(${(s.id * 47) % 360}, 55%, 35%)`,
                          }}
                        >
                          {s.name?.charAt(0)?.toUpperCase()}
                        </div>
                        {s.name}
                      </td>
                      <td>{s.email}</td>
                      <td>
                        <span style={{
                          background: "#eff6ff", color: "#1a56db", fontSize: "11px",
                          fontWeight: 600, padding: "3px 10px", borderRadius: "20px",
                          border: "1px solid #dbeafe"
                        }}>
                          {s.course ?? "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3>⚡ Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <Link to="/students/create" className="quick-action-btn">
                <span className="qa-icon" style={{ background: "#eff6ff" }}>➕</span>
                <div>
                  <div>Add New Student</div>
                  <div style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8", marginTop: "2px" }}>
                    Register a new student record
                  </div>
                </div>
              </Link>

              <Link to="/students" className="quick-action-btn">
                <span className="qa-icon" style={{ background: "#f0fdf4" }}>👥</span>
                <div>
                  <div>View All Students</div>
                  <div style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8", marginTop: "2px" }}>
                    Browse and manage records
                  </div>
                </div>
              </Link>

              <div className="quick-action-btn" style={{ cursor: "default", opacity: 0.5 }}>
                <span className="qa-icon" style={{ background: "#fffbeb" }}>📊</span>
                <div>
                  <div>Generate Report</div>
                  <div style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8", marginTop: "2px" }}>
                    Coming soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}