// module imports
const express = require('express');
const AuthOrg = require('../auth-org');

// set up router
const router = express.Router();

// router
// get all orders
router.get('/all', (req, res) => {
    AuthOrg.conn.apex.get('/v1/order?id=a015g000006UhXVAA0', (err, result) => {
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