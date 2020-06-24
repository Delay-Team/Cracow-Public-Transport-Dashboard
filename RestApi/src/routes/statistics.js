const express = require('express');
const router = express.Router();

router.get('/lines', async(request, response) => {

    try {
        response.json({Ok: true});
    } catch (error) {
        response.json(error);
    }

});

module.exports = router;