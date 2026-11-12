// // // const express = require('express');
// // // const app=express();
// // // const errorMiddleware=require('../backend/middlewares/error');
// // // const cookieParser=require('cookie-parser');

// // // app.use(express.json());
// // // app.use(cookieParser());

// // // const products=require('./controllers/routes/product');
// // // const auth=require('./controllers/routes/auth');
// // // const order=require('./controllers/routes/order');


// // // app.use('/api/v1',products);
// // // app.use('/api/v1',auth);
// // // app.use('/api/v1',order);
// // // app.use(errorMiddleware);
// // // module.exports=app;


// const express = require('express');
// const app = express();

// const path = require('path');
// const cookieParser = require('cookie-parser');
// const errorMiddleware = require('../backend/middlewares/error');
// const dotenv=require('dotenv');
// dotenv.config({path:path.join(__dirname,"config/config.env")});


// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   '/uploads',
//   express.static(path.join(__dirname, '..uploads'))
// );



// const products = require('./controllers/routes/product');
// const auth = require('./controllers/routes/auth');
// const order = require('./controllers/routes/order');
// const payment = require('./controllers/routes/payment');

// app.use('/api/v1', products);
// app.use('/api/v1', auth);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);


// app.use(errorMiddleware);

// module.exports = app;




const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('../backend/middlewares/error');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, "config/config.env") });


// =====================
// Middlewares
// =====================
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


// =====================
// Static Folder (FIXED)
// =====================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// =====================
// Routes
// =====================
const products = require('./controllers/routes/product');
const auth = require('./controllers/routes/auth');
const order = require('./controllers/routes/order');
const payment = require('./controllers/routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);


// =====================
// Error Middleware
// =====================
app.use(errorMiddleware);


module.exports = app;
