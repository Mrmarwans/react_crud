import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Navbar />
              <strong>Mini Shop</strong>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}