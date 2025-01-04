// Dynamically load CommonJS modules
const dotenv = await import('dotenv');
const express = await import('express');
const { default: connectDB } = await import('./config/db.js');
const { default: scheduleSync } = await import('./utils/syncScheduler.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Schedule daily sync
scheduleSync();

// Dynamically import routes
const inventoryRoutes = await import('./routes/inventoryRoutes.js');
const billingRoutes = await import('./routes/billingRoutes.js');
const returnRoutes = await import('./routes/returnRoutes.js');

// Use routes
app.use('/api/inventory', inventoryRoutes.default);
app.use('/api/billing', billingRoutes.default);
app.use('/api/returns', returnRoutes.default);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
