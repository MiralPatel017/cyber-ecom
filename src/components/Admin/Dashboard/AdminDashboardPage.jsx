import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => navigate("/dashboard/login"), 1500);
  };

  // ✅ Fetch users
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

  // ✅ Fetch sellers
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

  // ✅ Fetch products
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

  // ✅ Delete handlers with toast
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  const deleteSeller = async (id) => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;
    try {
      await axios.delete(`${API_URL}/sellers/${id}`);
      setSellers(sellers.filter((s) => s._id !== id));
      toast.success("Seller deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete seller");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  // ✅ Fetch data on page switch
  useEffect(() => {
    if (activePage === "users") {
      fetchUsers();
    } else if (activePage === "sellers") {
      fetchSellers();
    } else if (activePage === "products") {
      fetchProducts();
    }
  }, [activePage]);

  // ✅ Render main content
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <h2>📊 Welcome {user?.name || "Admin"}!</h2>;

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
            ) : (
              <div className="card-list">
                {users.map((user) => (
                  <div className="card" key={user._id}>
                    <h3>{user.name}</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Password:</strong> {user.password}</p>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      ❌ Delete
                    </button>
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