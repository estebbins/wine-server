/////////////////////////////////////////////////////
//// Import Dependencies                         ////
/////////////////////////////////////////////////////
const mongoose = require('../utils/connection') // import the mongoose library
const Wine = require('./wine')


//////// Temporary Seed Router /////////////////
// Seed database
// router.get('/seed', (req, res) => {
//     // array of starter resources
//     const startWine = [
//         { brand: 'La Crema', varietal: 'chardonnay', color: 'white', dateTasted: '2023-1-1'},
//         { brand: 'Josh', varietal: 'pinot grigio', color: 'white', dateTasted: '2022-12-31'},
//         { brand: 'Random Unexpected Wine', varietal: 'blend', color: 'red', dateTasted: '2022-12-30'},
//         { brand: 'Petit Petit', varietal: 'Petite Sirah', color: 'red', dateTasted: '2022-12-29'},
//         { brand: 'Jansz Tasmania', varietal: 'Pinot Noir & Chardonnay', color: 'rose', dateTasted: '2023-1-19'}
//     ]
//     // delete all other wine in the database
//     Wine.deleteMany({})
//         .then(() => {
//             // then we'll seed(create) our starter fruits
//             Wine.create(startWine)
//                 .then(data => {
//                     res.json(data)
//                 })
//                 .catch(err => console.log('the following error occurred:', err))
//         })
// })

/////////////////////////////////////////////////////
//// Seed Script Code                            ////
/////////////////////////////////////////////////////
// first, we'll save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
    // array of starter resources (wine)
    const startWines = [
        { brand: 'La Crema', varietal: 'chardonnay', color: 'white', dateTasted: '2023-1-1'},
        { brand: 'Josh', varietal: 'pinot grigio', color: 'white', dateTasted: '2022-12-31'},
        { brand: 'Random Unexpected Wine', varietal: 'blend', color: 'red', dateTasted: '2022-12-30'},
        { brand: 'Petit Petit', varietal: 'Petite Sirah', color: 'red', dateTasted: '2022-12-29'},
        { brand: 'Jansz Tasmania', varietal: 'Pinot Noir & Chardonnay', color: 'rose', dateTasted: '2023-1-19'}
    ]
    // then we delete every wine in the database (all instances of this resource)
    // this will delete wine that are not owned by any user
    Wine.deleteMany({ owner: null })
        .then(() => {
            // then we'll seed(create) our starter fruits
            Wine.create(startWines)
            // tell our app what to do with success and failures
                .then(data => {
                    console.log('here are the created fruits: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('the following error occurred:', err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always make sure to close the connection
            db.close()
        })
})