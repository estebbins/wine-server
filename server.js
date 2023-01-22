/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const express = require('express') // import the express framework
require('dotenv').config() // Load ENV file's variables
const WineRouter = require('./controllers/wineControllers')
const UserRouter = require('./controllers/userControllers')
const RatingRouter = require('./controllers/ratingControllers')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////////////
//// Create our Express App Object               ////
/////////////////////////////////////////////////////
// const app = express()
// update to liquid express views
const app = require('liquid-express-views')(express())

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
    res.render('home.liquid', { ...req.session })
    // res.send('Server is live, ready for requests')
})
// Register routes once created
app.use('/wines', WineRouter)
app.use('/users', UserRouter)
app.use('/ratings', RatingRouter)

// render our error page
app.get('/error', (req, res) => {
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, ...req.session })
})


/////////////////////////////////////////////////////
//// Server Listener                             ////
/////////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))