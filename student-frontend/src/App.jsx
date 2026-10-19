import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import StudentListPage from "./pages/StudentListPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductsPage from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/profile";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentListPage />} />
        <Route path="/students/create" element={<CreatePage />} />
        <Route path="/students/:id/edit" element={<EditPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile name="John Doe" age={25} course="Computer Science" />} /> 

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
