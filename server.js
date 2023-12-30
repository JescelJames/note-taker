// DEPENDENCIES __________________________________________
   
    const express = require('express');
    const path =  require('path');
    const db = require('./db/db.json');
    console.log(db);


// DATA ___________________________________________________
    //


// APP/PORT ________________________________________________

    const app = express();
    const PORT = process.env.PORT || 3000;


// MIDDLEWARES ______________________________________________

    // static assets
    app.use(express.static('public'));
    // stuff to get the req.body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


// ROUTES ____________________________________________________

    // GET - index homepage --------------------------------
        app.get('/', (req, res) => res.send('This is the homepage http://localhost:3001'));


    // GET - notes.html -------------------------------------
        app.get('/notes', (req, res) => 
            response.sendFile(path.join(__dirname, 'public/notes.html'))
        );


    // GET - api notes  -------------------------------------
        app.get('/api/notes', (req, res) => res.json(db));


    // POST -     
        app.post('/api/notes', (req, res) => {
            // Handle saving the new note
        });


    // GET - fallback route ---------------------------------
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/404.html'))
        });


// START SERVER ______________________________________________

    app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}` ));
