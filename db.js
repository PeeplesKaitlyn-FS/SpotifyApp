const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });
};