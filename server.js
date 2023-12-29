// DEPENDENCIES
// express
const express = require('express');
const path =  require('path');
const db = require('./Develop/db/db.json');
console.log(db);


// DATA


// APP / PORT
const app = express();
const PORT = process.env.PORT || 3000;


// MIDDLEWARES

// static assets
app.use(express.static('public'));


// stuff to get the req.body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// ROUTES
// app.get('/', (request, response) => response.send('This is the homepage http://localhost:3001'));

// GET/ HTML Routes
app.get('/notes', (request, response) => 
    response.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);


// GET/ API Routes
app.get('/api/', (request, response) => response.json(db));





//404 route
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'Develop/public/404.html'))
});

// START SERVER
app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}` ));
