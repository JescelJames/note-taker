// DEPENDENCIES __________________________________________
   
    const express = require('express');
    const path =  require('path');
    const db = require('./db/db.json');
    const fs = require('fs');
    


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

            
            const { title, text } = req.body;
            
            // Check if there is anything in the responseToUser body
            if (title && text) {

              const newNote = {

                title,
                text,
                
              };

            const reviewNote = JSON.stringify(newNote);

        // Write the string to a file
        fs.writeFile(`./db/${newNote.title}.json`, reviewNote, (err) =>
          err
            ? console.error(err)
            : console.log(
                `Review for ${newNote.title} has been written to JSON file`
              )
        );

        const response = {
          status: 'success',
          body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
      } else {
        res.status(500).json('Error in posting review');
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
