// module imports
const express = require('express');
const AuthOrg = require('../auth-org');

// set up router
const router = express.Router();

// routes
// get all products
router.get('/all', (req, res) => {
    const soql = `SELECT Id, Name, Total_Stock__c, Unit_Price__c FROM Product__c`;
    
    AuthOrg.conn.query(soql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({});
        } else {
            res.status(200).send(result);
        }
    });
});

// export router
module.exports = router;