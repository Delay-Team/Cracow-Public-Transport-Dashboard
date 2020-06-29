const mongoose = require('mongoose');


const RoomSchema = mongoose.Schema({
    timestamp: String,
    avg_delay_line_statistics: Object,
    avg_delay_stop_statistics: Object,
    max_delay_stop: {
        stop_name: String,
        delay_in_seconds: Number,
    },
    max_stop_trip_count:{
        stop_name: String,
        trip_count: Number,
    },
    max_delay_line:{
        line_name: String,
        delay_in_seconds: Number,
    },
    max_line_trip_count: {
        line_name: String,
        trip_count: Number
    }
});

module.exports = mongoose.model('statistics', RoomSchema);