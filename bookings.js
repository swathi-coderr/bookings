const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Booking = require('../models/Bookings');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

router.post('/', authMiddleware, async (req, res) => {
    const { service, date } = req.body;
    const booking = await Booking.create({
        user: req.userId,
        service,
        date
    });
    res.json(booking);
});

router.get('/', authMiddleware, async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

module.exports = router;
