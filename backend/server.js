// Wrap the entire code in an async function to use top-level await
(async () => {
  // Dynamically import all dependencies
  const dotenv = (await import('dotenv')).default; // Make sure to call .default for ES modules
  const express = (await import('express')).default; // Correct way to import express
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
  const inventoryRoutes = (await import('./routes/inventoryRoutes.js')).default;
  const billingRoutes = (await import('./routes/billingRoutes.js')).default;
  const returnRoutes = (await import('./routes/returnRoutes.js')).default;

  // Use routes
  app.use('/api/inventory', inventoryRoutes);
  app.use('/api/billing', billingRoutes);
  app.use('/api/returns', returnRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
