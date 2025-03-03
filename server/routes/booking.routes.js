const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Create booking
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, hotel_type, tour_date, destination, pickup_address, special_requests } = req.body;
        
        const [result] = await db.execute(
            'INSERT INTO bookings (name, email, phone, hotel_type, tour_date, destination, pickup_address, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, hotel_type, tour_date, destination, pickup_address, special_requests]
        );

        res.status(201).json({
            message: 'Booking created successfully',
            bookingId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating booking' });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const [bookings] = await db.execute('SELECT * FROM bookings');
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

module.exports = router; 