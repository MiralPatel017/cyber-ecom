const Product = require('../modules/product.module');


// create product
exports.createProduct = async (req, res) => {
    // const product = await Product.create({ ...req.body, seller: req.seller._id });
    const product = await Product.create({ ...req.body });
    res.json(product);
};

// get particular seller's product
exports.getSellerProducts = async (req, res) => {
    const products = await Product.find({ seller: req.seller._id });
    res.json(products);
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all products", error: error.message });
    }
};