/////////////////////////////////////////////////////
//// Our schema and model for the wine resource ////
/////////////////////////////////////////////////////
// Bring in mongoose connection from utils
const mongoose = require('../utils/connection')
// destructure the schema & model functions from mongoose
const { Schema, model } = mongoose
const ratingSchema = require('./ratings')

/////////////////////////////////////////////////////
//// Define wine schema & create wine model      ////
/////////////////////////////////////////////////////
const wineSchema = new Schema ({
    brand: {
        type: String
    }, 
    varietal: {
        type: String
    },
    color: {
        type: String
    }, 
    dateTasted: {
        type: Date
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ratings: [ratingSchema]
}, {
    timestamps: true, 
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

// Virtual
wineSchema.virtual('avgRating').get(function () {
    let average
    if (this.ratings.length > 0) {
        let total = 0
        let count = this.ratings.length
        this.ratings.forEach(rate => {
            total += rate.rating
        })
        average = total/count
    } else {
        average = 0
    }     
    return average.toFixed(1)
})

const Wine = model('Wine', wineSchema)

/////////////////////////////////////////////////////
//// Export model                                ////
/////////////////////////////////////////////////////
module.exports = Wine