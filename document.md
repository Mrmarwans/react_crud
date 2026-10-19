# 🧭 Complete Beginner's Guide: How to Apply React Router

This guide explains step-by-step how to set up and use **React Router** in a React project, based on the exact structure used in this project.

---

## 📌 Table of Contents
1. [What is React Router?](#1-what-is-react-router)
2. [Step 1: Install React Router](#step-1-install-react-router)
3. [Step 2: Wrap Your App with `<BrowserRouter>`](#step-2-wrap-your-app-with-browserrouter)
4. [Step 3: Organize Your Folders (Pages & Layouts)](#step-3-organize-your-folders-pages--layouts)
5. [Step 4: Define Your Routes in `App.jsx`](#step-4-define-your-routes-in-appjsx)
6. [Step 5: Create a Shared Layout with `<Outlet />`](#step-5-create-a-shared-layout-with-outlet-)
7. [Step 6: Navigate Between Pages (`<Link>` and `<NavLink>`)](#step-6-navigate-between-pages-link-and-navlink)
8. [Step 7: Dynamic URLs & `useParams()` (Edit / View Single Item)](#step-7-dynamic-urls--useparams-edit--view-single-item)
9. [Step 8: Programmatic Navigation with `useNavigate()`](#step-8-programmatic-navigation-with-usenavigate)
10. [Step 9: Handling 404 Pages and Redirects](#step-9-handling-404-pages-and-redirects)
11. [Quick Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## 1. What is React Router?

In a traditional website, clicking a link causes the browser to fetch a new HTML page from the server, causing a white flash and a full page reload.

In a **Single Page Application (SPA)** with **React Router**:
- Only **one** HTML page (`index.html`) is loaded.
- When the URL changes, React Router swaps components instantly **without reloading the browser**.
- Your app feels like a fast, native desktop or mobile app.

---

## Step 1: Install React Router

Open your terminal in your frontend project folder (`student-frontend`) and run:

```bash
npm install react-router
```
*(or `npm install react-router-dom` for React Router v6)*

---

## Step 2: Wrap Your App with `<BrowserRouter>`

React Router needs to listen to the browser's address bar. You enable this by wrapping your `<App />` with `<BrowserRouter>` in [`src/main.jsx`](file:///c:/Users/Future_Mind/Desktop/31.08.2026%20Backup/C%20Drive/Desktop/CRUD_REACT/student-frontend/src/main.jsx).

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router'; // 👈 1. Import BrowserRouter
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 2. Wrap App here */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

> [!TIP]
> You only need **one** `<BrowserRouter>` for your whole application!

---

## Step 3: Organize Your Folders (Pages & Layouts)

A clean folder structure makes routing easy to maintain:

```text
src/
├── components/          # Reusable UI pieces (Navbar, buttons, modals)
│   └── Navbar.jsx
├── layouts/             # Shared page shells (Header + Outlet)
│   └── AppLayout.jsx
├── pages/               # Each route gets its own page component
│   ├── DashboardPage.jsx
│   ├── StudentListPage.jsx
│   ├── CreatePage.jsx
│   ├── EditPage.jsx
│   ├── LoginPage.jsx
│   └── NotFoundPage.jsx
├── App.jsx              # Route definitions (<Routes> & <Route>)
└── main.jsx             # Entry point (<BrowserRouter>)
```

---

## Step 4: Define Your Routes in `App.jsx`

In [`src/App.jsx`](file:///c:/Users/Future_Mind/Desktop/31.08.2026%20Backup/C%20Drive/Desktop/CRUD_REACT/student-frontend/src/App.jsx), import your pages and use `<Routes>` and `<Route>`:

```jsx
// src/App.jsx
import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import StudentListPage from "./pages/StudentListPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* 1. Standalone Route (no shared navbar) */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Routes that share the common AppLayout (Navbar + Content) */}
      <Route element={<AppLayout />}>
        {/* Redirect root "/" to "/dashboard" */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentListPage />} />
        <Route path="/students/create" element={<CreatePage />} />
        
        {/* Dynamic Route: :id is a parameter */}
        <Route path="/students/:id/edit" element={<EditPage />} />
      </Route>

      {/* 3. Catch-all Route for any unknown URL */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
```

---

## Step 5: Create a Shared Layout with `<Outlet />`

When you want the **Navbar/Header** to stay on screen while only the main content changes between pages, use a **Layout Route** with `<Outlet />`.

```jsx
// src/layouts/AppLayout.jsx
import { Outlet } from "react-router"; // 👈 1. Import Outlet
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      {/* Persistent Navbar on every page */}
      <Navbar />

      {/* The current matching route renders HERE */}
      <main className="app-main">
        <Outlet /> {/* 👈 2. Outlet acts as a placeholder for child routes */}
      </main>
    </div>
  );
}
```

> [!IMPORTANT]
> **Never hardcode page components inside your layout!**
> ❌ `<div><Outlet /><StudentListPage /></div>` (This will render the student list on every page)
> ✅ `<div><Outlet /></div>` (Only the route currently visited by the user will be rendered)

---

## Step 6: Navigate Between Pages (`<Link>` and `<NavLink>`)

Never use standard HTML `<a href="...">` in React, because it causes full browser reloads.

### Use `<Link>`:
```jsx
import { Link } from "react-router";

// Clean navigation without page reload
<Link to="/students">View All Students</Link>
<Link to="/students/create">＋ Add Student</Link>
```

### Use `<NavLink>` for Navigation Menus:
`<NavLink>` automatically adds an `active` state when the current URL matches the link!

```jsx
// src/components/Navbar.jsx
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      {/* isActive is true when the URL is /dashboard */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/students"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Students
      </NavLink>
    </nav>
  );
}
```

---

## Step 7: Dynamic URLs & `useParams()` (Edit / View Single Item)

When editing or viewing a specific student, the URL has an ID (e.g. `/students/5/edit`).

### 1. Define the route with a colon `:`
```jsx
<Route path="/students/:id/edit" element={<EditPage />} />
```

### 2. Read the parameter using `useParams()` in your page:
```jsx
// src/pages/EditPage.jsx
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditPage() {
  // Extract 'id' from the URL
  const { id } = useParams();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch data for this specific student
    axios.get(`http://127.0.0.1:8000/api/students/${id}`)
      .then((res) => setStudent(res.data.data));
  }, [id]);

  return (
    <div>
      <h2>Editing Student #{id}</h2>
      {/* Edit Form */}
    </div>
  );
}
```

---

## Step 8: Programmatic Navigation with `useNavigate()`

Use `useNavigate()` when you need to redirect the user after an action (like after submitting a form, deleting an item, or logging in).

```jsx
// src/pages/CreatePage.jsx
import { useNavigate } from "react-router";
import axios from "axios";

export default function CreatePage() {
  const navigate = useNavigate(); // 👈 1. Get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save student to backend
    await axios.post("http://127.0.0.1:8000/api/students", { name, email, course });

    // 👈 2. Automatically navigate to /students list
    navigate("/students");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs */}
      <button type="submit">Save Student</button>
      
      {/* You can also go back in history */}
      <button type="button" onClick={() => navigate(-1)}>Go Back</button>
    </form>
  );
}
```

---

## Step 9: Handling 404 Pages and Redirects

### 1. Redirecting with `<Navigate />`
To redirect a user from `/` to `/dashboard`:
```jsx
<Route path="/" element={<Navigate to="/dashboard" replace />} />
```
*(The `replace` attribute prevents the redirect from cluttering browser history).*

### 2. 404 Not Found Page with `*`
Place this at the very bottom of your `<Routes>`:
```jsx
<Route path="*" element={<NotFoundPage />} />
```
Whenever a user types an unknown URL like `/random-page`, React Router renders `NotFoundPage`.

---

## Quick Reference Cheat Sheet

| Feature | Code Example | What it does |
| :--- | :--- | :--- |
| **Router Provider** | `<BrowserRouter><App /></BrowserRouter>` | Connects app to browser URL |
| **Route Container** | `<Routes>...</Routes>` | Matches current URL to child routes |
| **Single Route** | `<Route path="/about" element={<About />} />` | Renders `<About />` when URL is `/about` |
| **Layout Route** | `<Route element={<AppLayout />}>...</Route>` | Wraps child routes in shared layout |
| **Layout Placeholder** | `<Outlet />` | Where child routes render inside layout |
| **Hyperlink** | `<Link to="/students">Students</Link>` | Navigates without page reload |
| **Active Navlink** | `<NavLink to="/dashboard">Dashboard</NavLink>` | Adds `.active` styling to active link |
| **URL Parameter** | `path="/students/:id"` | Creates a variable `:id` in URL |
| **Read URL Param** | `const { id } = useParams();` | Gets variable value from URL |
| **Redirect in Code** | `const nav = useNavigate(); nav('/students')` | Redirects user via JavaScript |
| **Redirect Component**| `<Navigate to="/dashboard" replace />` | Automatically redirects on render |
| **404 Catch-All** | `<Route path="*" element={<NotFound />} />` | Catches any unmatched URL |
