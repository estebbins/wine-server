/////////////////////////////////////////////////////
//// Our schema and model for the fruit resource ////
/////////////////////////////////////////////////////
// Bring in mongoose connection from utils
const mongoose = require('../utils/connection')
// destructure the schema & model functions from mongoose
const { Schema, model } = mongoose
const commentSchema = require('./comment')