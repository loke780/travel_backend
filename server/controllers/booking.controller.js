const db = require('../config/db.config');
const { validationResult } = require('express-validator');

exports.createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      hotelType,
      tourDate,
      destination,
      pickupAddress,
      specialRequests
    } = req.body;

    const [result] = await db.execute(
      `INSERT INTO bookings 
       (name, email, phone, hotel_type, tour_date, destination, pickup_address, special_requests) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, hotelType, tourDate, destination, pickupAddress, specialRequests]
    );

    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const [bookings] = await db.execute('SELECT * FROM bookings');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 