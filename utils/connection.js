/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const mongoose = require('mongoose') // import the mongoose library
require('dotenv').config() // Load ENV file's variables

/////////////////////////////////////////////////////
//// Database Connection                         ////
/////////////////////////////////////////////////////
// Inputs for database connection function(mongoose.connect)
const DATABASE_URL = process.env.DATABASE_URL
// Database configuration object, required for mongoose connection
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish database connection - two arguments - 
// one the URL of the database, from our dotenv, 
// and db configuration
mongoose.connect(DATABASE_URL, CONFIG)

// How mongoose responsds to mongoose connection events
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

/////////////////////////////////////////////////////
//// Export Connection                           ////
/////////////////////////////////////////////////////
module.exports = mongoose