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

        // app.get('/api/notes', (req, res) => {

        //     // Log our request to the terminal
        //     console.info(`${req.method} request received in terminal. jcv`);

          
        //     // Sending all db to the client
        //     return res.json(db);

        // });

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
        

        // app.get('/api/terms', (req, res) => res.json(termData));



    // POST request to add notes ------------------------

    // app.post('/api/notes', (req, res) => { 
    //     console.info(`${req.method} request received in terminal. jcv`);
    
    //     const { title, text } = req.body;
        
    //     if (title && text) {
    //         const newNote = { title, text };
    
    //         // Read the current contents of db.json
    //         fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //             if (err) {
    //                 console.error(err);
    //                 res.status(500).json('Error reading data');
    //             } else {
    //                 // Parse the data to an array and add the new note
    //                 const notesArray = JSON.parse(data);
    //                 notesArray.push(newNote);
    
    //                 // Write the updated array back to db.json
    //                 fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 2), (err) => {
    //                     if (err) {
    //                         console.error(err);
    //                         res.status(500).json('Error writing new note');
    //                     } else {
    //                         console.log(`Review for ${newNote.title} has been written to JSON file`);
    //                         res.status(201).json({ status: 'success', body: newNote });
    //                     }
    //                 });
    //             }
    //         });
    //     } else {
    //         res.status(400).json('Title and text are required');
    //     }
    // });
    app.post('/api/notes', (req, res) => { 
        console.info(`${req.method} request received in terminal. jcv`);
    
        const { title, text } = req.body;
        
        if (title && text) {
            const newNote = { title, text };
    
            fs.readFile('./db/db.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json('Error reading data');
                }
    
                try {
                    // Parse the data to an array and add the new note
                    let notesArray = JSON.parse(data);
                    if (!Array.isArray(notesArray)) {
                        // If the data is not an array, initialize it as an array
                        notesArray = [];
                    }
                    notesArray.push(newNote);
    
                    // Write the updated array back to db.json
                    fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 2), (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json('Error writing new note');
                        }
                        console.log(`Review for ${newNote.title} has been written to JSON file`);
                        res.status(201).json({ status: 'success', body: newNote });
                    });
                } catch (parseError) {
                    console.error(parseError);
                    res.status(500).json('Error parsing data');
                }
            });
        } else {
            res.status(400).json('Title and text are required');
        }
    });
    

    // GET - Fallback Route ---------------------------------
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/404.html'))
        });


// START SERVER ______________________________________________

    app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}` ));
