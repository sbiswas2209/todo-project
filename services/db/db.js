const mongoose = require('mongoose');
const logger = require('../../logger');

const dotenv = require('dotenv').config();

const uri = process.env.MONGO_DB_URI;

const connectDB = async () => {

    try{
        mongoose.connect(uri, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.log('Connected to MongoDB!');
    }
    catch(e){
        logger.log(e);
        process.exit(503);
    }

}

module.exports = {
    connect: connectDB
}