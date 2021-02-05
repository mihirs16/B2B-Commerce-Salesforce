// module imports
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

// route imports
const Product = require('./routes/products');
const Order = require('./routes/orders');

// init setup
const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

// router setup
app.use('/api/products/', Product);
app.use('/api/orders/', Order);

// start api server
app.listen(PORT, () => {
    console.log(
        `API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
});
