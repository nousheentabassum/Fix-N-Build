const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ THIS IS REQUIRED

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/FixNBuild', {
    
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo Error:', err));

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/bookings', bookingRoutes);



// Routes
app.use('/users', require('./routes/userRoutes'));


app.use('/contact', require('./routes/contactRoutes')); // ✅ Add this line here!
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




