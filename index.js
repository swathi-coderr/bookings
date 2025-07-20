const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' MongoDB Connected');
  app.listen(5000, () => console.log(' Server running on port 5000'));
})
.catch(err => {
  console.error('Connection error:', err);
});
