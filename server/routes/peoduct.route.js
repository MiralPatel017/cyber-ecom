const express = require('express');
const multer = require('multer');
const { createProduct, getAllProducts, deleteProduct } = require('../controllers/product.controller');

const router = express.Router();

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
