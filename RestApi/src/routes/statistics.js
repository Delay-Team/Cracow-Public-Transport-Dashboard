const express = require('express');
const router = express.Router();
const LineStatistics = require('../models/LineStatistics');

router.get('/lines', async(request, response) => {

    try {
        const stats = await LineStatistics.find();
        let res = [];
        for (let stat in stats) {
            var tempStat = {};
            const dict = convert(stats[stat].avg_delay_line_statistics)
            dict.sort((a, b) => (a.avgDelay < b.avgDelay) ? 1 : -1)
            tempStat["delays"] = dict;
            tempStat["date"] = stats[stat].timestamp;
            res.push(tempStat);
        }
        response.json(res);

    } catch (error) {
        response.json(error);
    }

});

function convert(obj) {
    return Object.keys(obj).map(key => ({
        line: key,
        avgDelay: obj[key]
    }));
}

module.exports = router;