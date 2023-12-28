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
app.use(express.static('public'));


// ROUTES
// html routes - deliver pages
// GET/ -the home page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// api routes - deliver data
app.get('/api/todos', (req,res) => 
res.json([
    {
        title: "buy milk",
        
}]));

//404 route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/404.html'))

})


// START SERVER
app.listen(PORT, () => console.log(`Server life on port ${PORT}` ));
