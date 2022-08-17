const mongoose = require('mongoose');

// SETTING THE MULTER
const multer = require('multer');
const path = require('path');
const PRODUCT_PATH = path.join('/uploads/products/images');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'..',PRODUCT_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

// statics methods or functions using this i am connecting userSchema and multer storage
productSchema.statics.uploadedProduct = multer({storage: storage}).single('image');
productSchema.statics.productPath = PRODUCT_PATH;

const Products = mongoose.model('Products',productSchema);

module.exports = Products;