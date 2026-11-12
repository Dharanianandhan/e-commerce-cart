const products=require ('../data/products.json');
const Product=require('../models/productModel');
const dotenv=require('dotenv');
const connectDatabase=require('../config/database');
const { connect } = require('mongoose');
const crypto = require('crypto');

dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedProducts=async()=>{
    try{
      await Product.deleteMany();
      console.log('Products deleted');
      const productsWithId = products.map(p => ({ ...p, productId: crypto.randomBytes(4).toString('hex').toUpperCase() }));
      await Product.insertMany(productsWithId);
      console.log('All products added!');
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}

seedProducts();