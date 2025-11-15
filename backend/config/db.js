const moongose = require('mongoose');

const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed.', err);
    process.exit(1);
  }
};

module.exports = connectDB;
