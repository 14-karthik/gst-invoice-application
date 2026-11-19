const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');


// Always look for server/.env first, regardless of the terminal's working directory.
const serverEnv = path.join(__dirname, '.env');
const rootEnv = path.join(__dirname, '..', '.env');
if (fs.existsSync(serverEnv)) dotenv.config({ path: serverEnv });
else if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });
else dotenv.config();

const mongoose = require('mongoose');
const app = require('./src/app');
const PORT = process.env.PORT || 5000;
let URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!URI) {
    console.error("MONGODB_URI is missing from .env file");
    process.exit(1);
}

console.log("MongoDB Host:", new URL(URI).hostname);

// If a connection string has no database path (for example mongodb://localhost:27017/),
// explicitly select the application's database instead of silently using MongoDB's "test" DB.
if (/^mongodb(?:\+srv)?:\/\/[^/]+\/?(?:\?.*)?$/.test(URI)) {
  URI = URI.replace(/\?(.*)$/, '').replace(/\/$/, '') + '/gst_invoice_pro' + (URI.includes('?') ? '?' + URI.split('?').slice(1).join('?') : '');
}

async function start() {
  try {
    await mongoose.connect(URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✓ MongoDB connected');
    console.log(`✓ Database: ${mongoose.connection.name}`);
    console.log(`✓ API ready at http://localhost:${PORT}`);
    app.listen(PORT, '0.0.0.0');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error('Check that MongoDB Community Server is running and server/.env contains a valid MONGODB_URI.');
    process.exit(1);
  }
}

start();
