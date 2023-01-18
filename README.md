# Single-Resource-API-deliverable
Build a simple API that receives requests and sends JSON as a response


#### Learning Objectives

- Full CRUD API for a single resource

#### Prerequisites

- JavaScript
- Node / Express

## Getting Started

Choose a resource that it will be easy for you to make a simple model out of, no need to get fancy or pick anything crazy. Prior developers have chosen, dogs, cats, cars, X-men, food, etc. It just needs to be something you can make a model out of with a couple of properties. (Think back to the fruits app)

The only models you're not allowed to choose are Pets, Books, or Fruits(because we've already done those.)

There are a few requirements to keep in mind:

### MVP (Minimum Viable Product)

Your app should:

    - have one model with at least three properties
    - models properties must use more than one data type(String, Number, Boolean, Date etc.)
    - have a controller allowing for full CRUD functionality.
      - This includes the following routes
      - index route to view all instances of the resource
      - show route to view one single instance of the resource
      - post route to create an instance of the resource
      - patch route to update one instance of the resource
      - delete route to destroy one instance of the resource
    - You must send the response as JSON(this will come into play later) as well as with an appropriate status code

### Setting up

1. create a new repo for this on your personal github, name it after your chosen resource, for example, if your resource is a donut, you could call it 'donut-API' or 'donut-server'

2. Set up your boilerplate Express server. You can either look back at our [Intro to Express](https://git.generalassemb.ly/sei-ec-remote/intro-to-node-npm-express#set-up-a-basic-express-server) lesson or use the [Express docs](https://expressjs.com/en/starter/installing.html)

3. Follow the best practices described in class, and test your routes with postman.

### Routes

Your app should use RESTful routes:

- Index
  - GET `/<resource_name>`<br>
- Show
  - GET `/<resource_name>/:id`<br>
- Create
  - POST `/<resource_name>`<br>
- Update
  - PUT `/<resource_name>/:id`<br>
- Destroy
  - DELETE `/<resource_name>/:id`<br>


## Commits

The order of your commits this time does not matter, but refer back to the MVP to make sure that you're meeting all of the requirements. Make your commits **as you complete the work**, not all at once in the end! Some sample commits can be found below.

<details><summary><strong>Sample commits</strong>:</summary>

<hr>
** Commit your work.** <br>
"Server is running and connected to the database"
<hr>

<hr>
** Commit your work.** <br>
"Sends all <resource_name> documents via index route".
<hr>

<hr>
** Commit your work.** <br>
"Sends one <resource_name> document via show route".
<hr>

<hr>
** Commit your work.** <br>
"Can successfully create a <resource_name>".
<hr>

<hr>
** Commit your work.** <br>
"Has the ability to edit existing <resource_name>".
<hr>

<hr>
** Commit your work.** <br>
"Has the ability to delete <resource_name>".
<hr>

<hr>
** Commit your work.** <br>
"The app uses RESTful routing, all seven RESTful routes".
<hr>

</details>

## Deliverables

- A single resource API app that meets all the MVP requirements outlined at the beginning of this markdown.

## Technical Requirements

- Your app MUST run without syntax errors. If there are errors you can't solve, comment them out and leave a comment above explaining what is wrong

## Submission Guidelines

- Submit your homework via a link to your repo in the appropriate thread on slack.

---