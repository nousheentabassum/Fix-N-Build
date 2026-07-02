const mongoose = require('mongoose');
       
const bookingSchema = new mongoose.Schema({
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    payment: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
