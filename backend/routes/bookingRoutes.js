const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

router.post('/', async (req, res) => {
    const { service, date, time, name, address, contact, payment } = req.body;

    // Debug: log the received body
    console.log("Received body:", req.body);

    if (!service || !date || !time || !name || !address || !contact || !payment) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newBooking = new Booking({
            service,
            date,
            time,
            name,
            address,
            contact,
            payment
        });

        await newBooking.save();
        return res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (err) {
        console.error("Error saving booking:", err);
        return res.status(500).json({ message: 'Booking failed', error: err.message });
    }
});

module.exports = router;


// GET - Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

// PUT - Update a booking
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { service, date, time, name, address, contact, payment, status } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, {
            service,
            date,
            time,
            name,
            address,
            contact,
            payment,
            status
        }, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            message: 'Booking updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
});

// DELETE - Delete a booking
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            message: 'Booking deleted successfully',
            booking: deletedBooking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
});

module.exports = router;
