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

// INDEX route -> displays all wines
router.get('/', (req, res) => {
    // find all the wines
    Wine.find({})
    // ! use populate after owner & comments created
        // .populate('owner', '-password')
        // .populate('comments.author', '-password')
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

/////////////////////////////////////////////////////
//// Export Router                               ////
/////////////////////////////////////////////////////
module.exports = router