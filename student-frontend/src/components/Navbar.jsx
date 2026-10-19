import { NavLink } from "react-router";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const links = (
    <>
      <NavLink to="/dashboard" className={linkClass} onClick={() => setMobileOpen(false)}>
        ⊞ Dashboard
      </NavLink>
      <NavLink to="/students" className={linkClass} onClick={() => setMobileOpen(false)}>
        👥 Students
      </NavLink>
      <NavLink to="/students/create" className={linkClass} onClick={() => setMobileOpen(false)}>
        ＋ Add Student
      </NavLink>
      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/about">
        About
      </NavLink>

      <NavLink to="/products">
        Products
      </NavLink>
    </>
  );

  return (
    <>
      <header className="app-header">
        <h1>
          <span className="logo-icon">🎓</span>
          EduPortal
        </h1>

        {/* Desktop nav */}
        <nav className="app-nav desktop-nav">
          {links}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile nav dropdown */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {links}
      </nav>
    </>
  );
}
