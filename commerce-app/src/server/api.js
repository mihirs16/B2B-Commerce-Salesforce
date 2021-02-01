// module imports
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

// route imports
const Product = require('./routes/products');

// init setup
const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

// router setup
app.use('/api/products/', Product);

// start api server
app.listen(PORT, () => {
    console.log(
        `API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
});
