import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:4000/admin";

  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState({ name: "Admin" });
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    navigate("/dashboard/login");
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "users") {
      fetchUsers();
    } else if (activePage === "orders") {
      fetchOrders();
    }
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <h2>📊 Welcome {user?.name || "Admin"}!</h2>;

      case "products":
        return (
          <div>
            <h2>🛒 Manage Products</h2>
            <p className="loading">Product management coming soon...</p>
          </div>
        );

      case "orders":
        return (
          <div>
            <h2>📦 Manage Orders</h2>
            {loading ? (
              <p className="loading">Loading orders...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {orders.map((order) => (
                  <div className="card" key={order._id}>
                    <h3>Order ID: {order._id}</h3>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Items:</strong> {order.items?.length || 0}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "users":
        return (
          <div>
            <h2>👥 Manage Users</h2>
            {loading ? (
              <p className="loading">Loading users...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {users.map((user) => (
                  <div className="card" key={user._id}>
                    <h3>{user.name}</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <h2>Welcome Admin!</h2>;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activePage === "products" ? "active" : ""}
            onClick={() => setActivePage("products")}
          >
            Products
          </li>
          <li
            className={activePage === "orders" ? "active" : ""}
            onClick={() => setActivePage("orders")}
          >
            Orders
          </li>
          <li
            className={activePage === "users" ? "active" : ""}
            onClick={() => setActivePage("users")}
          >
            Users
          </li>
          <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboardPage;