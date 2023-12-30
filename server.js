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
            return res.sendFile(path.join(__dirname, '/public/index.html'))
        });


    // GET - notes.html -------------------------------------
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/notes.html'))
            
        });


    // GET - api notes  -------------------------------------

        app.get('/api/notes', (req, res) => {
            fs.readFile('./db/db.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).json('Error reading data');
                } else {
                    res.json(JSON.parse(data));
                }
            });
        });
        


    // POST -  to add notes ---------------------------------------------

    app.post('/api/notes', (req, res) => {
        // Log that a POST request was received
        console.info(`${req.method} request received to add a review`);
    
        // Destructuring assignment for the items in req.body
        const { title, text } = req.body;
    
        // If all the required properties are present
        if (title && text) {
          // Variable for the object we will save
          const newNotes = {
            title,
            text,
            // review_id: uuid(),
          };
    
          // TO READ AND WRITE TO db.json

            //1. Read the reviews.json and parse the data
              fs.readFile('./db/db.json', 'utf-8', (err, data) => {
                const notes = JSON.parse(data);
              
            // 2. add the new review to the list of reviews
              notes.push(newNotes);
              console.log(notes); 
    
            
            // 3. stringify the list of reviews
              const reviewNotes = JSON.stringify(notes, null, '\t');
    
    
            // 4. write the updated list to the reviews.json
    
              fs.writeFile(`./db/db.json`, reviewNotes, (err) =>
                err
                  ? console.error(err)
                  : console.log(
                      `Review for ${newNotes.title} has been written to JSON file`
                    )
              );
    
            })

          const response = {
            status: 'success',
            body: newNotes,
          };
    
          console.log(response);
          res.status(201).json(response);
        } else {
          res.status(500).json('Error in posting review');
        }
      });

    


    // GET - Fallback Route ---------------------------------
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/404.html'))
        });


// START SERVER ______________________________________________

    app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}` ));
