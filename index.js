// implement your API here

// require the express npm module, needs to be added to the project using "npm install express"
const express = require('express');

// creates an express application using the express module
const server = express();

// Import user data
const Users = require('./data/db.js');


/*
  configures our server to execute a function for every GET request to "/"
  the second argument passed to the .get() method is the "Route Handler Function"
  the route handler function will run on every GET request to "/"
*/
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

// Hobbits endpoint
server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  res.status(200).json(hobbits);
});

// Users endpoint
server.get('/users', (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({ error: "Could not retrieve the user data." })
  })
})

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once the server starts
server.listen(8000, () => console.log('API running on port 8000'));