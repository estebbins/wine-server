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
// Rating route
// POST -> only loggedin users can post ratings
router.post('/:wineId', (req, res) => {
    // first we get the wine ID and save to a variable
    const wineId = req.params.wineId
    // then we'll protect this route against non-logged-in users
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the rating
        req.body.author = req.session.userId
        const theRating = req.body
        // find a specific wine
        Wine.findById(wineId)
        // response with a 201 and the wine
            .then(wine => {
                // create the rating
                wine.ratings.push(theRating)
                // save the wine
                return wine.save()
            })
            .then(wine => {
                res.status(201).json({ wine: wine })
            })
            // catch and handle any errors 
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    } else {
        res.sendStatus(401) // send a 401-unauthorized
    }

})

// Delete rating route
// DELETE -> /ratings/delete/<someWineId>/<someRatingId>
router.delete('/delete/:wineId/:ratingId', (req, res) => {
    const { wineId, ratingId } = req.params

    Wine.findById(wineId)
        .then(wine => {
            // get rating, we'll use the build in subdoc method called .id()
            const theRating = wine.ratings.id(ratingId)
            console.log('this is the rating to be delete: \n', theRating)
            // then we want to make sure the user is logged in, and that they are the author of the rating.
            if (req.session.loggedIn) {
                // if they are, allow them to delete
                if (theRating.author == req.session.userId) {
                    // we can use another built in method, remove()
                    theRating.remove()
                    wine.save()
                    res.sendStatus(204) //send 204 no content
                } else {
                    res.sendStatus(401) // send a 401-unauthorized
                }
            } else{
            // otherwise, send a 401 unauthorized status
                res.sendStatus(401)
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })

})

/////////////////////////////////////////////////////
//// Export Router                               ////
/////////////////////////////////////////////////////
module.exports = router