const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const shippingMethodRouter = require('./routes/shippingMethodRoutes');
const stockRouter = require('./routes/stockRoutes');
const supplierRouter = require('./routes/supplierRoutes');
const brandRouter = require('./routes/brandRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
const corsOptions = {
  origin: ['http://localhost:8080', 'http://192.168.100.28:8080'], // Replace with the actual origin of your client application
  credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));
app.options('*', cors());
// Set security HTTP headers
app.use(helmet());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //print the current request
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Serving static files
//app.use(express.static(`${__dirname}/public`)); //static files folder public but doesn't exist

// app.use((req, res, next) => {
//   console.log('Hello cookies');
// console.log(`Req cookie: ${req.cookies}`);
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES API
//app.use('/api/v1/order', orderRouter);
//app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/brand', brandRouter);
app.use('/api/v1/supplier', supplierRouter);
app.use('/api/v1/stock', stockRouter);
app.use('/api/v1/shippingMethod', shippingMethodRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
