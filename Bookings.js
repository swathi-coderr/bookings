const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: String,
    service: String,
    date: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
