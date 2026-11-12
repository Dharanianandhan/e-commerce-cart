// const mongoose = require('mongoose');

// const productSchema=new mongoose.Schema({
//     productId:{
//         type: String,
//         required: true,
//         unique: true
//     },
//     name:{
//         type: String,
//         required:[true,"Please enter product name"],
//         trim:true,
//         maxlength:[100,"Product name cannot exceed 100 character"],
//     },
//     price:{
//         type:Number,
//         default:0,
//     },
//     description:{
//         type:String,
//         required:[true,"Please enter product description"],
//     },
//     ratings:{
//         type:Number,
//         default:0,
//     },
//     images: [String],
//     category:{
//         type:String,
//         required:[true,"Please enter product category"],
//         enum:{
//             values:[
//                 'Electronics',
//                 'Mobile Phones',
//                 'Laptops',
//                 'Accessories',
//                 'Headphones',
//                 'Food',
//                 'Books',
//                 'Clothes/Shoes',
//                 'Beauty/Health',
//                 'Sports',
//                 'Outdoor',
//                 'Home'
//             ],
//             message:"Please select correct category"
//         }
//     },
//     seller:{
//         type:String,
//         required:[true,"Please enter product seller"]
//     },
//     stock:{
//         type:Number,
//         required:[true,"Please enter product stock"],
//         maxlength:[20,"Product stock cannot exceed"]
//     },
//     numOfReviews:{
//         type:Number,
//         default:0
//     },
//     reviews:[
//         {
//             user:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref:'User'

//             },
//             rating:{
//                 type:String,
//                 required:true
//             },
//             comment:{
//                 type:String,
//                 required:true
//             }
//         }
//     ],
//     user :{
//         type:mongoose.Schema.Types.ObjectId
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now()
//     }
// })

//  let schema =  mongoose.model('Product',productSchema)


//  module.exports=schema

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },

    price: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        required: [true, "Please enter product description"]
    },

    ratings: {
        type: Number,
        default: 0
    },

    // ✅ FIXED: images stored as array of strings (simple + correct)
    images: {
        type: [String],
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: "Please upload at least one image"
        }
    },

    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                "Electronics",
                "Mobile Phones",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "Outdoor",
                "Home"
            ],
            message: "Please select correct category"
        }
    },

    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },

    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        max: [99999, "Product stock cannot exceed limit"]
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            rating: {
                type: Number,
                required: true,
                default: 0
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);