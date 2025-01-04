require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const scheduleSync = require('./utils/syncScheduler');

const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Schedule daily sync
scheduleSync();

// Routes
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/api/returns', require('./routes/returnRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
