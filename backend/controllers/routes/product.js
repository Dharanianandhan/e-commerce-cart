// const express=require('express');
// const router=express.Router();
// const { getProducts, newProduct ,getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts} = require('../productController');
// const {isAuthenticatedUser,authorizeRoles}=require('../../middlewares/authenticate')


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const uploadPath = path.join(__dirname, '..', '..', 'uploads', 'product');

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// console.log('Upload Path:', uploadPath);

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, uploadPath);
//         },
//         filename: function(req, file, cb) {
//             cb(null, file.originalname);
//         }
//     })
// });

// module.exports = upload;

// router.route('/products').get(getProducts);
// router.route('/product/:id')
//                             .get(getSingleProduct);
// router.route('/review').put(isAuthenticatedUser,createReview)
//                        .delete(isAuthenticatedUser,deleteReview);
// router.route('/reviews').get(isAuthenticatedUser,getReviews);


// //Admin Routes
// router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),newProduct);
// router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts);
// router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
// router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),updateProduct);

// module.exports=router;


// const express = require('express');
// const router = express.Router();

// const {
//     getProducts,
//     newProduct,
//     getSingleProduct,
//     updateProduct,
//     deleteProduct,
//     createReview,
//     getReviews,
//     deleteReview,
//     getAdminProducts
// } = require('../productController'); // ⚠️ adjust path if needed

// const {
//     isAuthenticatedUser,
//     authorizeRoles
// } = require('../../middlewares/authenticate');

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');


// // =========================
// // Upload folder setup
// // =========================
// const uploadPath = path.join(__dirname, '..', '..', 'uploads', 'products');

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// console.log('Upload Path:', uploadPath);


// // =========================
// // Multer configuration
// // =========================
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, uploadPath);
//         },
//         filename: function (req, file, cb) {
//             // Better unique naming (prevents overwrite)
//             const uniqueName = Date.now() + '-' + file.originalname;
//             cb(null, uniqueName);
//         }
//     })
// });


// // =========================
// // Public Routes
// // =========================
// router.route('/products')
//     .get(getProducts);

// router.route('/product/:id')
//     .get(getSingleProduct);


// // =========================
// // Review Routes
// // =========================
// router.route('/review')
//     .put(isAuthenticatedUser, createReview)
//     .delete(isAuthenticatedUser, deleteReview);

// router.route('/reviews')
//     .get(isAuthenticatedUser, getReviews);


// // =========================
// // Admin Routes
// // =========================

// // Create Product
// router.route('/admin/product/new')
//     .post(
//         isAuthenticatedUser,
//         authorizeRoles('admin'),
//         upload.array('images'),
//         newProduct
//     );

// // Get Admin Products
// router.route('/admin/products')
//     .get(
//         isAuthenticatedUser,
//         authorizeRoles('admin'),
//         getAdminProducts
//     );

// // Delete Product
// router.route('/admin/product/:id')
//     .delete(
//         isAuthenticatedUser,
//         authorizeRoles('admin'),
//         deleteProduct
//     );

// // Update Product
// router.route('/admin/product/:id')
//     .put(
//         isAuthenticatedUser,
//         authorizeRoles('admin'),
//         upload.array('images'),
//         updateProduct
//     );


// // =========================
// // EXPORT ROUTER ONLY (IMPORTANT)
// // =========================
// module.exports = router;


const express = require('express');
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getReviews,
    deleteReview,
    getAdminProducts
} = require('../productController');

const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../../middlewares/authenticate');

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// =========================
// FIXED UPLOAD PATH (IMPORTANT)
// =========================
const uploadPath = path.join(__dirname, '..', '..', 'uploads', 'product');

// create folder if not exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

console.log("UPLOAD PATH:", uploadPath);


// =========================
// MULTER CONFIG (FIXED)
// =========================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // REMOVE SPACES + SAFE FILE NAME
        const ext = path.extname(file.originalname);
        const name = path
            .basename(file.originalname, ext)
            .replace(/\s/g, "-")
            .toLowerCase();

        const uniqueName = Date.now() + "-" + name + ext;

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });


// =========================
// PUBLIC ROUTES
// =========================
router.get('/products', getProducts);
router.get('/product/:id', getSingleProduct);


// =========================
// REVIEWS
// =========================
router.put('/review', isAuthenticatedUser, createReview);
router.delete('/review', isAuthenticatedUser, deleteReview);
router.get('/reviews', isAuthenticatedUser, getReviews);


// =========================
// ADMIN ROUTES
// =========================

// CREATE PRODUCT
router.post(
    '/admin/product/new',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    upload.array('images'),
    newProduct
);

// GET ADMIN PRODUCTS
router.get(
    '/admin/products',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAdminProducts
);

// DELETE PRODUCT
router.delete(
    '/admin/product/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteProduct
);

// UPDATE PRODUCT
router.put(
    '/admin/product/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    upload.array('images'),
    updateProduct
);

module.exports = router;