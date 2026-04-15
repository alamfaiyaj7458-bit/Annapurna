const Joi = require('joi');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const productSchema = Joi.object({
  name: Joi.string().trim().max(150).required().messages({
    'any.required': 'Product name is required',
    'string.max': 'Name cannot exceed 150 characters',
  }),
  description: Joi.string().trim().max(1000).required().messages({
    'any.required': 'Description is required',
    'string.max': 'Description cannot exceed 1000 characters',
  }),
  category: Joi.string()
    .valid('Tiles', 'Marble', 'Sanitary', 'Fittings')
    .required()
    .messages({
      'any.required': 'Category is required',
      'any.only': 'Category must be one of: Tiles, Marble, Sanitary, Fittings',
    }),
  featured: Joi.boolean().optional(),
});

const updateProductSchema = productSchema.fork(
  ['name', 'description', 'category'],
  (field) => field.optional()
);

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.featured = true;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  let uploadedImages = [];
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one product image is required' });
    }

    const imageUploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer)
    );
    uploadedImages = await Promise.all(imageUploadPromises);

    const product = await Product.create({
      ...value,
      images: uploadedImages,
    });

    res.status(201).json(product);
  } catch (err) {
    // Clean up any images that were uploaded before the failure
    if (uploadedImages.length > 0) {
      await Promise.allSettled(uploadedImages.map((img) => deleteFromCloudinary(img.publicId)));
    }
    next(err);
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle new image uploads if provided
    let newImages = [];
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      newImages = await Promise.all(imageUploadPromises);
    }

    // Handle removal of old images if specified
    let keepImages = product.images;
    if (req.body.removeImageIds) {
      const removeIds = Array.isArray(req.body.removeImageIds)
        ? req.body.removeImageIds
        : [req.body.removeImageIds];

      const deletePromises = removeIds.map((pid) => deleteFromCloudinary(pid));
      await Promise.all(deletePromises);

      keepImages = product.images.filter(
        (img) => !removeIds.includes(img.publicId)
      );
    }

    const updatedImages = [...keepImages, ...newImages];

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...value, images: updatedImages },
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((img) =>
        deleteFromCloudinary(img.publicId)
      );
      await Promise.all(deletePromises);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
