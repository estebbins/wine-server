/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const express = require('express')
const Wine = require('../models/wine')

/////////////////////////////////////////////////////
//// Create Router                               ////
/////////////////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////////////
//// Routes                                      ////
/////////////////////////////////////////////////////
// Index route 
// GET -> displays all wines
router.get('/', (req, res) => {
    // find all the wines
    Wine.find({})
        .populate('owner', '-password')
        .populate('ratings.author', '-password')
        .then(wines => { 
            // send json if successful
            // res.json({ wines: wines }) 
            res.render('wines/index', { wines, ...req.session })
        })
        .catch(err => {
            // catch errors if they occur
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET for the new page
// Shows a form where a user can create a new wine
router.get('/new', (req, res) => {
    res.render('wines/new', { ...req.session })
})

// Create route
// POST -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    // store req.body to a variablew
    const newWine = req.body
    console.log('this is the req body', newWine)
    Wine.create(newWine)
        // send 201 & json of wine
        .then(wine => {
            // res.status(201).json({ wine: wine.toObject() })
            res.redirect(`/wines/${wine.id}`)
        })
        // send and error if one occurs
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// Index route -> /mine
// GET -> this is a user specific index route
router.get('/mine', (req, res) => {
    // find wines by owner, using the req.session info
    Wine.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('ratings.author', '-password')
        .then(wines => {
            // if found, display the wine
            // res.status(200).json({ wines: wines })
            res.render('wines/index', { wines, ...req.session })
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
        
})

// GET Route for getting json for specific user wines
// Index -> this is a user specific index route
// This will only show the logged in user's wines
router.get('/json', (req, res) => {
    // Find wines by ownership using req.session info
    Wine.find({ owner: req.session.userId})
        .populate('owner', 'username')
        .populate('ratings.author', '-password')
        .then(wines=> {
            res.status(200).json({ wines: wines })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

// GET request - Edit route
// Shows form for updating wine
router.get('/edit/:id', (req, res) => {
    // access wines initial values
    const wineId = req.params.id
    Wine.findById(wineId)
        .then(wine=> {
            res.render('wines/edit', { wine, ...req.session })
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})


// Update route
// PUT -> updates a specific wine if it belongs to the user
router.put('/:id', (req, res) => {
    const id = req.params.id
    Wine.findById(id)
        .then(wine => {
            // if the owner of the wine is the person who is logged in
            if (wine.owner == req.session.userId) {
                // and send success message
                // res.sendStatus(204)
                // update and save the wine
                return wine.updateOne(req.body)
            } else {
                // otherwise send a 401 unauthorized status
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20wine`)
            }            
        })
        .then(() => {
            res.redirect('/wines/mine')
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// Delete route
// DELETE -> delete a specific wine
router.delete('/:id', (req, res) => {
    // get the id from the req
    const id = req.params.id
    // Find and delete wine
    Wine.findById(id)
        .then(wine => {
            // if the owner of the wine is the person who is logged in
            if (wine.owner == req.session.userId) {
                // and send success message
                // res.sendStatus(204)
                // delete the wine
                console.log(wine)
                return wine.deleteOne()
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20wine`)
            }
        })
        .then(() => {
            res.redirect(`/wines/mine`)
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// Show route
// GET -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that Id
    Wine.findById(id)
        .populate('ratings.author', 'username')
        .then(wine => {
            // send the wine as json upon success
            // res.json({ wine: wine })
            res.render('wines/show.liquid', { wine, ...req.session})
        })
        // catch any errors
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

/////////////////////////////////////////////////////
//// Export Router                               ////
/////////////////////////////////////////////////////
module.exports = router