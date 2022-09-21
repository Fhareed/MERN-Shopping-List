const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items')

const app = express();

//Body parser middleware
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI;

//connect to mongoose 
mongoose
 .connect(db)
 .then(() => console.log('MongoDB Connected........Start') )
 .catch(err => console.log(err));

//Use Routes 
app.use('/api/items', items);

// Serve static assets if in production 
if (process.env.NODE_ENV === 'production') {
    //Set static Folder 
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening at port ${port}`));
