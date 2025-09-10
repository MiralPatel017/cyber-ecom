const Product = require('../modules/product.module');

// ✅ Create product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create({ ...req.body });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// ✅ Get particular seller's product
exports.getSellerProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.seller._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching seller products", error: error.message });
    }
};

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all products", error: error.message });
    }
};

// ✅ Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};