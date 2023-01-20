/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////////////////////
//// Create Router                               ////
/////////////////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////////////
//// Routes                                      ////
/////////////////////////////////////////////////////
// !After liquid
// Sign-up route
// GET -> /users/signup
// Renders a liquid page with the sign up form
// router.get('/signup', (req, res) => {
//     // res.render points to a file
//     // res.redirect points to a URL
//     res.render('users/signup')
// })

// Sign-up route -> /users/signup
// POST -> creates new users in our db
router.post('/signup', async (req, res) => {
    // take a req.body and use the data to create a user
    const newUser = req.body
    // console.log('this is the req body', req.body)

    // Encrypt password using bcrypt
    newUser.password = await bcrypt.hash(
        newUser.password, 
        await bcrypt.genSalt(10)
    )
    // then create the user
    User.create(newUser)
    // if we're successful, send a 201 status
        .then(user => {
            console.log('new user created', user)
            res.status(201).json({ username: user.username })
            // !after liquid
            // !res.redirect('/users/login')
        })
    // If there's an error, handle the error
        .catch(err => {
            console.log(err)
            res.json(err)
            // !after liquid
            // res.redirect(`/error?error=username%20taken`)
        })
})
// !after liquid
// // GET -> /users/login
// // Renders a liquid
// router.get('/login', (req, res) => {
//     res.render('users/login')
// })

// Log in route -> /users/login
// POST -> this route creates new session
router.post('/login', async (req, res) => {
    // destructure username and password from req.body
    const { username, password } = req.body
    // search the db for a user with a specific username
    User.findOne({ username })
        .then(async (user) => {
            // we check if that use exists
            if (user) {
                // compare the passwords using bcrypt using built-in method
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    // if the passwords match, place the user's info in the session
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id
                    res.status(201).json({ user: user.username })
                    // ! after liquid
                    // res.redirect('/')
                } else {
                    // if the passwords don't match, send the user a message
                    res.json({ error: 'username or password is incorrect' })
                    // ! after liquid
                    // res.redirect(`/error?error=username%20or%20password%20is%20incorrect`)
                }
            } else {
                // if the user does not exist, respond with message
                res.json({ error: 'user does not exist' })
                // ! after liquid
                // res.redirect(`/error?error=user%20does%20not%20exist`)
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
            // ! after liqiud
            // res.redirect(`/error?error=${err}`)
        })

})

// !after liquid
// // GET -> /users/logout
// // Renders page that allows users to log out
// router.get('/logout', (req, res) => {
//     res.render('users/logout')
// })

// Log out route -> /users/logout
// DELETE -> destroys our session in our db(and in the browser)
router.delete('/logout', (req, res) => {
    // destroy the session and send an appropriate response
    console.log(req.session)
    req.session.destroy(err => {
        console.log('this is req.session upon logout \n', req.session)
        console.log('error on logout? \n', err)
        res.sendStatus(204)
        // !after liquid
        // eventually redirect users here, after adding the view error.
        // res.redirect('/')
    })
})

/////////////////////////////////////////////////////
//// Export Router                               ////
/////////////////////////////////////////////////////
module.exports = router