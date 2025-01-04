const cron = require('node-cron');
const axios = require('axios');
const Inventory = require('../models/Inventory'); // Correct path

const syncWithCloud = async () => {
  try {
    const inventoryData = await Inventory.find();
    await axios.post(process.env.CLOUD_API_ENDPOINT, { inventoryData });
    console.log('Data synced with cloud successfully!');
  } catch (error) {
    console.error('Cloud sync failed:', error.message);
  }
};

// Schedule sync to run every day at midnight
const scheduleSync = () => {
  cron.schedule('0 0 * * *', syncWithCloud);
};

module.exports = scheduleSync;
