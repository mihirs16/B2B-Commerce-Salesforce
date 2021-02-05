// module imports
const express = require('express');
const AuthOrg = require('../auth-org');

// set up router
const router = express.Router();

// router
// get all orders
router.get('/all/:id', (req, res) => {
    AuthOrg.conn.apex.get('/order/for-account?accid='+req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// get current cart
router.get('/open/:id', (req, res) => {
    AuthOrg.conn.apex.get('/order/for-account?accid='+req.params.id+'&not-closed=true', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
});

// make new cart
router.post('/new/:id', (req, res) => {
    console.log(req.body);
    AuthOrg.conn.apex.post('/order/for-account', req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// export router
module.exports = router;