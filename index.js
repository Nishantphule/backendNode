require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// create an express app
const app = express();

// middle ware
app.use(cors());
app.use(express.json());


// connect to database
const url = process.env.MONGO_URL;

// set the strictQuery to false, so that it will disable the strict mode for the query filters
// mongoose will not throw any error when we use an undefined field in the query (ignored)
mongoose.set('strictQuery', false);

// to connect to the database
mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB Database');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    })

    
// create a model
const Note = require('./models/notes');

// reqquest logger middleware
const requestLogger = (req, res, next) => {
    // console.log('Method', req.method);
    // console.log('Path', req.path);
    // console.log('Body', req.body);
    // console.log('--------');
    next();
}

app.use(requestLogger);

// set the endpoints
const getAllNotes = require('./routes/getAllNotes');
const createNote = require('./routes/createNote');
const getNote = require('./routes/getNote');
const deleteNote = require('./routes/deleteNote');
const updateNote = require('./routes/updateNote');

// root end point: prints hello world as an HTML
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

// fetches all resources in the collection
app.use('/api/notes', getAllNotes);

// creates a new resource based on the request data
app.use('/api/notes', createNote);

// fetching a sigle resource
app.use('/api/notes/', getNote);

// deleting a resource
app.use('/api/notes/', deleteNote);

// replace the entire identified resource with the request data
app.use('/api/notes/', updateNote);

const unknownEndpoint = (req,res) => {
    res.status(404).send({error: 'unknown endpoint'});
}

app.use(unknownEndpoint)

// express error handlers
const errorHandler = (error, req, res ,next) => {
    console.error(error.message);
    
    if(error.name === 'CastError'){
        return res.status(400).send({error:'malformed id'})
    }
    
    next(error);
}

app.use(errorHandler);

// Listen to the PORT for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
