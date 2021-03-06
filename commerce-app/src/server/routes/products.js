// module imports
const express = require('express');
const AuthOrg = require('../auth-org');

// set up router
const router = express.Router();

// routes
// get all products
router.get('/all', (req, res) => {
    AuthOrg.conn.apex.get('/catalog', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({});
        } else {
            res.status(200).send(result);
        }
    });
});

// get specific product
router.get('/:id', (req, res) => {
    AuthOrg.conn.apex.get('/catalog?prod-id='+req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({});
        } else {
            res.status(200).send(result);
        }
    });
});

// search products
router.post('/search', (req, res) => {
    AuthOrg.conn.apex.post('/catalog', req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({});
        } else {
            res.status(200).send(result);
        }
    });
})

// add a product to the open cart
router.post('/add-to-cart/:id', (req, res) => {
    AuthOrg.conn.apex.post('/product/for-opp?id='+req.params.id, req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// delete product from cart
router.post('/del-from-cart', (req, res) => {
    AuthOrg.conn.apex.delete('/product/for-opp?oppId='+req.body.oppId+'&prodId='+req.body.prodId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// get list of all products in opportunity
router.get('/from-opp/:id', (req, res) => {
    AuthOrg.conn.apex.get('/product/for-opp?id='+req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
});

// export router
module.exports = router;