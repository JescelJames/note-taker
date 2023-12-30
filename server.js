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
        app.get('/', (req, res) => { 
            return res.send('This is the homepage http://localhost:3000')
        });


    // GET - notes.html -------------------------------------
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/notes.html'))
            
        });



    // GET - api notes  -------------------------------------

        app.get('/api/notes', (req, res) => {

            // Log our request to the terminal
            console.info(`${req.method} request received in terminal. jcv`);

          
            // Sending all db to the client
            return res.json(db);

        });

        // app.get('/api/terms', (req, res) => res.json(termData));



    // POST request to add notes ------------------------

        app.post('/api/notes', (req, res) => { 
            // Log that a POST request was received
            console.info(`${req.method} request received in terminal. jcv`);

            
            let responseToUser;

            // Check if there is anything in the responseToUser body
            if (req.body && req.body.title) {

              responseToUser = {
                status: 'success',
                data: req.body,
              };

              res.json(`Review for ${responseToUser.data.title} has been added!`);

            } else {
              res.json('Request body must at least contain a title');

            }
      
            // Log the responseToUser body to the console
            console.log(req.body);
            

        });



    // GET - Fallback Route ---------------------------------
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/404.html'))
        });


// START SERVER ______________________________________________

    app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}` ));
