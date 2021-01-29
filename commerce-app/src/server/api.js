// simple express server setup to serve for local testing/dev API server

// module imports
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
// const jsforce = require('jsforce');
const AuthOrg = require('./auth-org');

// init setup
var conn = AuthOrg.login();
const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/products', (req,res) => {
    const soql = `SELECT Id, Name FROM Product__c`;
    conn.query(soql, (err, result) => {
        if (err) {
            res.status(500).send({});
        } else {
            res.status(200).send(result);
        }
    });
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
