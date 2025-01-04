// syncScheduler.js
import Inventory from '../models/Inventory.js';  // Default import
import cron from 'node-cron';
import axios from 'axios';

const syncWithCloud = async () => {
  try {
    const inventoryData = await Inventory.find();
    await axios.post(process.env.CLOUD_API_ENDPOINT, { inventoryData });
    console.log('Data synced with cloud successfully!');
  } catch (error) {
    console.error('Cloud sync failed:', error.message);
  }
};

const scheduleSync = () => {
  cron.schedule('0 0 * * *', syncWithCloud);
};

export default scheduleSync;
