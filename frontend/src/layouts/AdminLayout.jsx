import React, { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = localStorage.getItem("admin");

  useEffect(() => {
    if (!isLogin) {
      navigate("/admin/login");
    }
  }, [isLogin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="logo">CyberAdmin</div>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard" className={location.pathname === "/" ? "active" : ""}>Dashboard</Link></li>
            <li><Link to="/admin/product" className={location.pathname === "/admin/product" ? "active" : ""}>Products</Link></li>
            <li><Link to="/admin/category" className={location.pathname === "/admin/category" ? "active" : ""}>Categories</Link></li>
            <li><Link to="/admin/user" className={location.pathname === "/admin/user" ? "active" : ""}>Users</Link></li>
            <li><Link to="/admin/order" className={location.pathname === "/admin/order" ? "active" : ""}>Orders</Link></li>
            <li><Link to="/admin/order-detail" className={location.pathname === "/admin/order-detail" ? "active" : ""}>Order Details</Link></li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="header-controls">
            {/* Thêm các control khác nếu cần */}
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;