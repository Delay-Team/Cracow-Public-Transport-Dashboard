const express = require('express');
const router = express.Router();
const LineStatistics = require('../models/LineStatistics');

router.get('/lines', async(request, response) => {

    try {
        const stats = await LineStatistics.find();
        let res = [];
        for (let stat in stats) {
            var tempStat = {};
            const dict = convertLine(stats[stat].avg_delay_line_statistics)
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

router.get('/stops', async(request, response) => {

    try {
        const stats = await LineStatistics.find();
        let res = [];
        for (let stat in stats) {
            var tempStat = {};
            if (stats[stat].avg_delay_stop_statistics == undefined) continue
            const dict = convertStop(stats[stat].avg_delay_stop_statistics)
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

router.get('/daily', async(request, response) => {

    try {
        const stats = await LineStatistics.find();
        let res = [];
        for (let stat in stats) {
            var tempStat = {};
            tempStat["stop_max_delay"] = stats[stat].max_delay_stop;
            tempStat["stop_max_trip_count"] = stats[stat].max_stop_trip_count;
            tempStat["line_max_delay"] = stats[stat].max_delay_line;
            tempStat["line_max_trip_count"] = stats[stat].max_line_trip_count;
            tempStat["date"] = stats[stat].timestamp;
            res.push(tempStat);
        }
        response.json(res);

    } catch (error) {
        response.json(error);
    }

});

function convertLine(obj) {
    return Object.keys(obj).map(key => ({
        line: key,
        avgDelay: obj[key]
    }));
}

function convertStop(obj) {
    return Object.keys(obj).map(key => ({
        stop: key,
        avgDelay: obj[key]
    }));
}


module.exports = router;