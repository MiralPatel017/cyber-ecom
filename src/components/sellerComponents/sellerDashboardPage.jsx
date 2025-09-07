import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SellerDashboard.css";
import SellerAddProduct from "./SellerAddProduct";

const SellerDashboardPage = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:4000";

  const [activePage, setActivePage] = useState("profile");
  const [seller, setSeller] = useState({ name: "Seller" });
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchSales = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/sales`);
      setSales(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "products") fetchProducts();
    else if (activePage === "sales") fetchSales();
    else if (activePage === "reviews") fetchReviews();
  }, [activePage, showAddModal]);  // Refresh after closing modal

  const handleLogout = () => {
    navigate("/seller/login");
  };

  return (
    <div className="seller-dashboard">
      <aside className="sidebar">
        <h2 className="logo">Seller Panel</h2>
        <ul>
          <li className={activePage === "profile" ? "active" : ""} onClick={() => setActivePage("profile")}>Profile</li>
          <li className={activePage === "wallet" ? "active" : ""} onClick={() => setActivePage("wallet")}>Wallet</li>
          <li className={activePage === "sales" ? "active" : ""} onClick={() => setActivePage("sales")}>Sales</li>
          <li className={activePage === "products" ? "active" : ""} onClick={() => setActivePage("products")}>Your Products</li>
          <li className={activePage === "reviews" ? "active" : ""} onClick={() => setActivePage("reviews")}>Reviews</li>
          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="main-content">
        {activePage === "profile" && (
          <div className="profile-details">
            <h2>👤 Your Profile</h2>
            <label>Name:</label>
            <input type="text" value={seller.name} readOnly />
            <label>Email:</label>
            <input type="email" value="seller@example.com" readOnly />
          </div>
        )}

        {activePage === "wallet" && (
          <div className="wallet-info">
            <h2>💰 Wallet</h2>
            <p><strong>Balance:</strong> ₹1,200</p>
            <button>Request Withdrawal</button>
          </div>
        )}

        {activePage === "sales" && (
          <div className="sales-list">
            <h2>📊 Sales History</h2>
            {loading ? (
              <p className="loading">Loading sales...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {sales.map((sale) => (
                  <div className="card" key={sale._id}>
                    <h3>Order ID: {sale._id}</h3>
                    <p><strong>Total Amount:</strong> ₹{sale.totalAmount}</p>
                    <p><strong>Status:</strong> {sale.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePage === "products" && (
          <div className="products-list">
            <h2>🛒 Your Products</h2>

            <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
              ➕ Add New Product
            </button>

            {loading ? (
              <p className="loading">Loading products...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {products.map((product) => (
                  <div className="card" key={product._id}>
                    <h3>{product.name}</h3>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                  </div>
                ))}
              </div>
            )}

            {showAddModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <button className="close-btn" onClick={() => setShowAddModal(false)}>✖</button>
                  <SellerAddProduct closeModal={() => setShowAddModal(false)} />
                </div>
              </div>
            )}
          </div>
        )}

        {activePage === "reviews" && (
          <div className="reviews-list">
            <h2>⭐ Product Reviews</h2>
            {loading ? (
              <p className="loading">Loading reviews...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-list">
                {reviews.map((review) => (
                  <div className="card" key={review._id}>
                    <h3>Product: {review.productName}</h3>
                    <p><strong>Rating:</strong> {review.rating} / 5</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboardPage;