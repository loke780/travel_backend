const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// In your routes:
router.post('/', apiKeyAuth, bookingValidation, bookingController.createBooking); 