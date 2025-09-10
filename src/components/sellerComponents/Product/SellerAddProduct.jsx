import { useState } from "react";
import axios from "axios";
import "./SellerAddProduct.css";

function SellerAddProduct({ closeModal }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async () => {
    if (!name || !price || !description || !category || !stock) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/products", {
        name,
        price: parseFloat(price),
        description,
        category,
        image,
        stock: parseInt(stock),
      });

      alert("Product added successfully!");
      closeModal();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="add-product-form">
      <h1>Add New Product</h1>
      
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <input type="number" placeholder="Stock Quantity" value={stock} onChange={(e) => setStock(e.target.value)} />
      
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default SellerAddProduct;