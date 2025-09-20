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
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !description || !category || !stock || !image) {
      alert("⚠️ Please fill in all fields and upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", parseFloat(price));
      formData.append("description", description);
      formData.append("category", category);
      formData.append("stock", parseInt(stock));
      formData.append("image", image);

      await axios.post("http://localhost:4000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");
      closeModal();
    } catch (error) {
      alert(error.response?.data?.message || "❌ Failed to add product");
    }
  };

  return (
    <div className="add-product-form">
      <h1>Add New Product</h1>

      <div className="form-grid">
        {/* Left side → image upload */}
        <div className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-img" />
          ) : (
            <label htmlFor="fileInput">Click to upload an image</label>
          )}
          <input
            type="file"
            id="fileInput"
            // accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Right side → form fields */}
        <div className="form-fields">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
    </div>
  );
}

export default SellerAddProduct;
