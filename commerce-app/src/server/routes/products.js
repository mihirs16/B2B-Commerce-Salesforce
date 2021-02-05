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

// export router
module.exports = router;