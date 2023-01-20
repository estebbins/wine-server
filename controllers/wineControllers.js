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

//////// Temporary Seed Router /////////////////
// Seed database
router.get('/seed', (req, res) => {
    // array of starter resources
    const startWine = [
        { brand: 'La Crema', varietal: 'chardonnay', color: 'white', dateTasted: '2023-1-1'},
        { brand: 'Josh', varietal: 'pinot grigio', color: 'white', dateTasted: '2022-12-31'},
        { brand: 'Random Unexpected Wine', varietal: 'blend', color: 'red', dateTasted: '2022-12-30'},
        { brand: 'Petit Petit', varietal: 'Petite Sirah', color: 'red', dateTasted: '2022-12-29'},
        { brand: 'Jansz Tasmania', varietal: 'Pinot Noir & Chardonnay', color: 'rose', dateTasted: '2023-1-19'}
    ]
    // delete all other wine in the database
    Wine.deleteMany({})
        .then(() => {
            // then we'll seed(create) our starter fruits
            Wine.create(startWine)
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('the following error occurred:', err))
        })
})

// Index route 
// GET -> displays all wines
router.get('/', (req, res) => {
    // find all the wines
    Wine.find({})
        .populate('owner', '-password')
        // !.populate('comments.author', '-password')
        .then(wines => { 
            // send json if successful
            res.json({ wines: wines }) 
            // !after liquid installed
            // !res.render('fruits/index', { fruits })
        })
        .catch(err => {
            // catch errors if they occur
            console.log(err)
            res.status(404).json(err)
        })
})

// Create route
// POST -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    // store req.body to a variable
    const newWine = req.body
    Wine.create(newWine)
        // send 201 & json of wine
        .then(wine => {
            res.status(201).json({ wine: wine.toObject() })
        })
        // send and error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

// Index route -> /mine
// GET -> this is a user specific index route
router.get('/mine', (req, res) => {
    // find wines by owner, using the req.session info
    Wine.find({ owner: req.session.userId })
        // !.populate('comments.author', '-password')
        .then(wines => {
            // if found, display the wine
            res.status(200).json({ wines: wines })
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            res.status(400).json(err)
        })
        
})

// Update route
// PUT -> updates a specific wine if it belongs to the user
router.put('/:id', (req, res) => {
    const id = req.params.id
    Wine.findById(id)
        .then(wine => {
            // if the owner of the fruit is the person who is logged in
            if (wine.owner == req.session.userId) {
                // and send success message
                res.sendStatus(204)
                // update and save the fruit
                return wine.updateOne(req.body)
            } else {
                // otherwise send a 401 unauthorized status
                res.sendStatus(401)
            }            
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            res.status(400).json(err)
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
            // if the owner of the fruit is the person who is logged in
            if (wine.owner == req.session.userId) {
                // and send success message
                res.sendStatus(204)
                // delete the fruit
                return wine.deleteOne()
            } else {
                // otherwise send a 401 unauthorized status
                res.sendStatus(401)
            }
        })
        .catch(err => {
            // otherwise, throw an error
            console.log(err)
            res.status(400).json(err)
        })
})

// Show route
// GET -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that Id
    Wine.findById(id)
        .then(wine => {
            // send the wine as json upon success
            res.json({ wine: wine })
        })
        // catch any errors
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

/////////////////////////////////////////////////////
//// Export Router                               ////
/////////////////////////////////////////////////////
module.exports = router