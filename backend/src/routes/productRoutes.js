const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
    cb(null, true);
  },
});

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, upload.array('images', 10), createProduct);
router.put('/:id', protect, upload.array('images', 10), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
