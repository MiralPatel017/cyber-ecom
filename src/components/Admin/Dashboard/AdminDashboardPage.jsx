import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from "recharts";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:4000/admin";

  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState({ name: "Admin" });
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => navigate("/dashboard/login"), 1500);
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

  const fetchSellers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/sellers`);
      setSellers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:4000/products`);
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "dashboard") {
      fetchUsers();
      fetchSellers();
      fetchProducts();
    } else if (activePage === "users") {
      fetchUsers();
      setSelectedUser(null);
    } else if (activePage === "sellers") {
      fetchSellers();
    } else if (activePage === "products") {
      fetchProducts();
    }
  }, [activePage]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  // Placeholder data for LineChart (growth over last 7 days)
  const lineChartData = [
    { date: "2025-09-06", users: 120, sellers: 30, products: 200 },
    { date: "2025-09-07", users: 125, sellers: 32, products: 210 },
    { date: "2025-09-08", users: 130, sellers: 33, products: 220 },
    { date: "2025-09-09", users: 135, sellers: 34, products: 230 },
    { date: "2025-09-10", users: 140, sellers: 35, products: 240 },
    { date: "2025-09-11", users: 145, sellers: 36, products: 250 },
    { date: "2025-09-12", users: 150, sellers: 37, products: 260 },
  ];

  // Pie Chart Data (proportion)
  const pieData = [
    { name: "Users", value: users.length },
    { name: "Sellers", value: sellers.length },
    { name: "Products", value: products.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h2>📊 Welcome {user?.name || "Admin"}!</h2>

            <div className="chart-section">
              <h3>📊 Total Counts</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: "Users", count: users.length },
                  { name: "Sellers", count: sellers.length },
                  { name: "Products", count: products.length }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h3>🥧 Entity Proportions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h3>📈 Growth Over Last 7 Days</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                  <Line type="monotone" dataKey="sellers" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="products" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "products":
        return (
          <div>
            <h2>🛒 Manage Products</h2>
            {loading ? (
              <p className="loading">Loading products...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {products.map((product) => (
                  <div className="card" key={product._id}>
                    <h3>{product.name}</h3>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      ❌ Delete
                    </button>
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
            ) : selectedUser ? (
              <div className="user-details">
                <h3>📋 User Details</h3>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Password:</strong> {selectedUser.password}</p>
                <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
                <button className="back-btn" onClick={handleBackToList}>
                  🔙 Back to Users List
                </button>
              </div>
            ) : (
              <div className="card-list">
                {users.map((user) => (
                  <div
                    className="card"
                    key={user._id}
                    onClick={() => handleUserClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{user.name}</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "sellers":
        return (
          <div>
            <h2>🏪 Manage Sellers</h2>
            {loading ? (
              <p className="loading">Loading sellers...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {sellers.map((seller) => (
                  <div className="card" key={seller._id}>
                    <h3>{seller.name}</h3>
                    <p><strong>Email:</strong> {seller.email}</p>
                    <button
                      className="delete-btn"
                      onClick={() => deleteSeller(seller._id)}
                    >
                      ❌ Delete
                    </button>
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
            className={activePage === "sellers" ? "active" : ""}
            onClick={() => setActivePage("sellers")}
          >
            Sellers
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

      <main className="main-content">
        {renderContent()}
        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default AdminDashboardPage;