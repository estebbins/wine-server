/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const express = require('express') // import the express framework
const morgan = require('morgan') // import the morgan request logger
const session = require('express-session') // import the express-session package
const MongoStore = require('connect-mongo') // import the connect-mongo package (for sessions)
require('dotenv').config() // connect-mongo needs to be able to connect to our database.
// ! once we need liquid
// ! const methodOverride = require('method-override')

/////////////////////////////////////////////////////
//// Middleware function                         ////
/////////////////////////////////////////////////////
const middleware = (app) => {
    // middleware runs before all the routes
    // !methodOverride is middleware that allows us to utilize forms to their full potential.
    // !by default, forms can ONLY send a GET or a POST request.
    // ! method-override allows us to send PUT/PATCH, DELETE, and other requests from a form, by defining it with '_method'
    // ! app.use(methodOverride('_method'))
    app.use(morgan('tiny')) // for request logging, tiny = size of morgan log to use

    app.use(express.urlencoded({ extended: true })) // parse url encoded request bodies (useful for post and put requests)
    app.use(express.static('public')) // serve static files from the public folder, like CSS stylesheet
    app.use(express.json()) //parse incoming request payloads with json
    
    // use session function to configure session
    app.use(
        session({
            // config object
            // secret -> from dotenv file that allows the form to create a session with connect-mongo
            secret: process.env.SECRET,
            // store -> tells connect-mongo to save the session in the database
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            // ! Using true while we're developing, but false is best practice
            // options ->
            saveUninitialized: true,
            resave: false
        })
    )
}
/////////////////////////////////////////////////////
//// Export middleware function                  ////
/////////////////////////////////////////////////////
module.exports = middleware