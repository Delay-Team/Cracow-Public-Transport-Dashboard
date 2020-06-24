const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    timestamp: String,
    avg_delay_line_statistics: Object
});

module.exports = mongoose.model('statistics', RoomSchema);