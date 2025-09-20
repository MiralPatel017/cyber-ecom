import { useState } from "react";
import { Link } from "react-router-dom";

function SellerProducts() {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <h1>Your Products</h1>

      {products.length === 0 ? (
        <div>
          <p>No products yet.</p>
          <Link to="/seller/home/add-product">
            <button>Add New Product</button>
          </Link>
        </div>
      ) : (
        <ul>
          {products.map((prod, idx) => (
            <li key={idx}>
              {prod.image && (
                <img
                  src={`http://localhost:4000${prod.image}`}
                  alt={prod.name}
                  width="80"
                  style={{ marginRight: "10px", borderRadius: "6px" }}
                />
              )}
              {prod.name} - ₹{prod.price}
            </li>
          ))}
        </ul>

      )}
    </div>
  );
}

export default SellerProducts;