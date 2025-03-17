const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bookingRoutes = require('./routes/booking.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration

app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Travel booking API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 