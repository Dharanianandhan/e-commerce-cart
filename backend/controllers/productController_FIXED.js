const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');
const crypto = require('crypto');


// ===============================
// GET ALL PRODUCTS
// ===============================
exports.getProducts = catchAsyncError(async (req, res, next) => {

    const resPerPage = 3;

    const apiFeatures = new APIFeatures(
        Product.find(),
        req.query
    )
        .search()
        .filter()
        .paginate(resPerPage);

    const products = await apiFeatures.query;
    const productsCount = await Product.countDocuments();

    // ✅ FIXED LOG
    console.log("PRODUCTS FROM DB:", products);

    res.status(200).json({
        success: true,
        count: productsCount,
        resPerPage,
        products
    });
});


// ===============================
// CREATE PRODUCT
// ===============================
exports.newProduct = catchAsyncError(async (req, res, next) => {

    console.log("FILES:", req.files);

    let images = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
            // ✅ FIXED: Use /uploads/products/ (plural) matching routes config
            images.push(`/uploads/products/${file.filename}`);
        });
    }

    req.body.images = images;
    req.body.user = req.user.id;
    req.body.productId = crypto.randomBytes(4).toString('hex').toUpperCase();

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


// ===============================
// GET SINGLE PRODUCT
// ===============================
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
        .populate('reviews.user', 'name email');

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});


// ===============================
// UPDATE PRODUCT
// ===============================
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // update fields
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.category = req.body.category;
        product.stock = req.body.stock;
        product.seller = req.body.seller;

        // =========================
        // IMAGE HANDLING FIX
        // =========================

        let images = [];

        // if new images uploaded
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => {
                // ✅ FIXED: Use /uploads/products/ (plural) matching routes config
                return `/uploads/products/${file.filename}`;
            });
        }

        // replace only if new images exist
        if (images.length > 0) {
            product.images = images;
        }

        await product.save();

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// ===============================
// DELETE PRODUCT
// ===============================
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted"
    });
});


// ===============================
// CREATE / UPDATE REVIEW
// ===============================
exports.createReview = catchAsyncError(async (req, res, next) => {

    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(r => {
            if (r.user.toString() === req.user.id.toString()) {
                r.comment = comment;
                r.rating = rating;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // FIXED rating calculation (convert string → number)
    let avg =
        product.reviews.reduce((acc, item) => {
            return acc + Number(item.rating);
        }, 0) / product.reviews.length;

    product.ratings = isNaN(avg) ? 0 : avg;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});


// ===============================
// GET REVIEWS
// ===============================
exports.getReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});


// ===============================
// DELETE REVIEW
// ===============================
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        r => r._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;

    let ratings =
        reviews.reduce((acc, item) => acc + Number(item.rating), 0) /
        (reviews.length || 1);

    ratings = isNaN(ratings) ? 0 : ratings;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    });

    res.status(200).json({
        success: true
    });
});


// ===============================
// ADMIN: GET ALL PRODUCTS
// ===============================
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
});
