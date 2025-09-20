import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const API_URL = "http://localhost:4000"; // backend API
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("products");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({ name: "User", email: "user@example.com" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);

  // ✅ Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "products") fetchProducts();
  }, [activePage]);

  // ✅ Toggle like
  const toggleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    navigate("/login"); // redirect to login
  };

  return (
    <div className="user-home">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">User Panel</h2>
        <ul>
          <li
            className={activePage === "products" ? "active" : ""}
            onClick={() => setActivePage("products")}
          >
            🛒 Products
          </li>
          <li
            className={activePage === "profile" ? "active" : ""}
            onClick={() => setActivePage("profile")}
          >
            👤 Profile
          </li>
          <li className="logout" onClick={handleLogout}>
            🚪 Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Products Page */}
        {activePage === "products" && (
          <div className="products-list">
            <h2>🛍 Available Products</h2>
            {loading ? (
              <p className="loading">Loading products...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {products.map((p) => (
                  <div className="card" key={p._id}>
                    {p.image && (
                      <img
                        src={`http://localhost:4000${p.image}`}
                        alt={p.name}
                        className="product-img"
                      />
                    )}
                    <h3>{p.name}</h3>
                    <p><strong>Price:</strong> ₹{p.price}</p>
                    <p><strong>Stock:</strong> {p.stock}</p>
                    <div className="actions">
                      <button className="buy-btn">Buy Now</button>
                      <button
                        className={`like-btn ${likedProducts.includes(p._id) ? "liked" : ""}`}
                        onClick={() => toggleLike(p._id)}
                      >
                        {likedProducts.includes(p._id) ? "❤️ Liked" : "🤍 Like"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            )}
          </div>
        )}

        {/* Profile Page */}
        {activePage === "profile" && (
          <div className="profile-details">
            <h2>👤 Your Profile</h2>
            <label>Name:</label>
            <input type="text" value={user.name} readOnly />
            <label>Email:</label>
            <input type="email" value={user.email} readOnly />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
