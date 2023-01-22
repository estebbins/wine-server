# Fruitcakes full CRUD Full stack app

- Use express to build a server
- Use mongoose to communicate with mongodb
- Full crud functionality on our wines resource
- User authentication
- The ability to add ratings to wine

This app will start as an API, that will render HTML in our browser. 

This is an MVC application. 
MVC: 
- Models - all of our data, what shape it's in and what resources we'r using(models), and how our resources relate to one another
- Views - all the different ways we can see our data, whether it's a JSON response, or an actual HTML response, this determines how our data can be viewed by the user
- Controllers - tell us what we can do and connect our views and our models. We can think of our routes as our controllers, because they determine how a user can interact with our resources.

## How we talk about what we're doing
We're using express framework to build a server in which we are using mongoose to process our requeests and run CRUD operations using a mongoDb database

What we're building is a REST api, that runs full CRUD operations on a single resource.

## What is REST?
- REST:
    - REpresentational 
    - State
    - Transfer
- It's just a set of principles that describe how networked resources are accessed & manipulated
- We have 7 RESTful routes that allow us basic operations for reading and manipulating a collection of data

## Route tables for documents
#### wines

| **URL**              | **HTTP Verb** |**Actions**|
|----------------------|---------------|-----------|
| /wines/             | GET           | index
| /wines/:id          | GET           | show
| /wines/new          | GET           | new
| /wines              | POST          | create
| /wines/:id/edit     | GET           | edit
| /wines/:id          | PATCH/PUT     | update
| /wines/:id          | DELETE        | destroy   |

#### ratings

| **URL**              | **HTTP Verb** |**Actions**|
|----------------------------------------|---------------|-----------|
| /ratings/:wineId                     | POST          | create
| /ratings/delete/:wineID/:ratingId   | DELETE        | destroy   |


#### Users

| **URL**              | **HTTP Verb** |**Actions**|
|----------------------|---------------|-----------|
| /users/signup        | GET           | new    
| /users/signup        | POST          | create    
| /users/signup        | GET           | login   
| /users/login         | POST          | create
| /users/logout        | DELETE        | destroy   |



## File organization, where are things happening?

Main entry file is still server.js
This is where we establish our connection with express, to the port 3000, which allows us to develop locally, on [localhost:3000](http://localhost:3000/)

`server.js` imports our `wineControllers` from the controllers directory, 

`wineControllers` is where we set up our routes to utilize mongoose to interact with wine documents in our mongoDb.

The connection between wines and mongoDb, starts with the file `utils/connection.js`, where we define and connect to our database. The wine model in `models/wine.js` is where this connection happens. Our wineControllers import the model wine, and run mongoose model methods whenever we hit the appropriate route.

## Middleware

Middleware is processed by a function in the utils directory, `utils/middleware.js`. This middleware function takes one argument, app, and processes requests through our middleware.

## Relationships
One to many:
    - One user can have many wines
    - One wine can have many ratings

wines are connected to Users through the `wine.owner` field, via `objectId` reference
ratings are connected to wines, as an array of subdocuments at `wine.ratings`
Users are connected to ratings via `objectId` reference, at `rating.author`

This is an entity relationship diagram (basic version for now). This accurately described my relationships between my documents (entities). 

![entityRelationshipDiagram](images/image.png)
