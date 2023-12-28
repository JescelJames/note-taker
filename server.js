// DEPENDENCIES
// express
const express = require('express');
const path =  require('path');


// DATA

// APP / PORT
const app = express();
const PORT = process.env.PORT || 3001;


// MIDDLEWARES
// stuff to get the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static assets
app.use(express.static('Develop/public'));



// html routes - deliver pages
// GET/ -the home page

app.get('/', (request, response) => response.send('this is the homepage'));

// app.get('/', (request, response) => 
//     response.send(path.join(__dirname, 'Develop/public/index.html'))
// );



// ROUTES
// GET/ -notes html
app.get('/notes', (request, response) => 
    response.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);

// api routes - deliver data
// app.get('/api/todos', (request,response) => 
// response.json([
//     {
//         title: "buy milk",
        
//     }
// ])

// );



//404 route
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'Develop/public/404.html'))

});


// START SERVER
app.listen(PORT, () => console.log(`Server life on port ${PORT}` ));
