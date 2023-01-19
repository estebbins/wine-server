/////////////////////////////////////////////////////
//// Our schema and model for the wine resource ////
/////////////////////////////////////////////////////
// Bring in mongoose connection from utils
const mongoose = require('../utils/connection')
// destructure the schema & model functions from mongoose
const { Schema, model } = mongoose
// ! import subdoc const commentSchema = require('./comment')

/////////////////////////////////////////////////////
//// Define fruit schema & create fruit model    ////
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
    // !add owner after user model defined
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // ! subdoc / comments: [commentSchema]
}, {
    timestamps: true
})

const Wine = model('Wine', wineSchema)


/////////////////////////////////////////////////////
//// Export model                                ////
/////////////////////////////////////////////////////
module.exports = Wine