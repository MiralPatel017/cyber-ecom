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
            <li key={idx}>{prod.name} - {prod.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SellerProducts;