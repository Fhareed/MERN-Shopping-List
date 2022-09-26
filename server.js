const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

//Body parser middleware
app.use(express.json());

// DB config
const db = require('./config/keys').mongoURI;

//connect to mongoose 
mongoose
 .connect(db, {
    useNewUrlParser: true,
    //useCreateIndex: true
 })// adding a new mongo url parser
 .then(() => console.log('MongoDB Connected........Start') )
 .catch(err => console.log(err));

//Use Routes 
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

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
