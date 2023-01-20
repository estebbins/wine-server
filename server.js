/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const express = require('express') // import the express framework
require('dotenv').config() // Load ENV file's variables
const WineRouter = require('./controllers/wineControllers')
const UserRouter = require('./controllers/userControllers')
// !import subdocument router once created
const middleware = require('./utils/middleware')

/////////////////////////////////////////////////////
//// Create our Express App Object               ////
/////////////////////////////////////////////////////
const app = express()
// ! update to liquid express views

/////////////////////////////////////////////////////
//// Middleware                                  ////
/////////////////////////////////////////////////////
// Process requests through middleware
middleware(app)

/////////////////////////////////////////////////////
//// Routes                                      ////
/////////////////////////////////////////////////////
// GET -> /
// Home Route -> confirms connection
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})
// Register routes once created
app.use('/wines', WineRouter)
app.use('/users', UserRouter)
// ! Add subdocument router

// ! render catch-all error page

/////////////////////////////////////////////////////
//// Server Listener                             ////
/////////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))