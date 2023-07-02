const express = require("express");
const app = express();
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can only execute js",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are most important methods of HTTP protocol",
        important: true
    },
]

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]



// set the endpoints for notes
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
});

// get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes)
});

//  add note
app.post('/api/addnote', (req, res) => {
    notes = notes.concat(req.body)
    res.status(201).json({ messsage: "note created successfully" })
});

// get by id
app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end("Id does not exist")
    }
})

// delete
app.delete("/api/deletenote/:id", (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end("note deleted successfully");
})

// put
app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    // const note = notes.find(note => note.id === id);

    const notToPut = req.body

    notes = notes.map(note => note.id === id ? notToPut : note)

    res.status(200).end(`Note with Id ${id} updated succesfully`)
})



// set the endpoints for persons
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
});

// get all notes
app.get('/api/persons', (req, res) => {
    res.json(persons)
});

//  add note
app.post('/api/addperson', (req, res) => {
    persons = persons.concat(req.body)
    res.status(201).json({ messsage: "person created successfully" })
});

// get by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end("Id does not exist")
    }
})

// delete
app.delete("/api/deleteperson/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end("note deleted successfully");
})

// put
app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    // const note = notes.find(note => note.id === id);

    const personToPut = req.body

    persons = persons.map(person => person.id === id ? personToPut : person)

    res.status(200).end(`Person with Id ${id} updated succesfully`)
})

// info
app.get('/info', (req, res) => {

    const noOfPersons = persons.length
    
    const timeInfo = new Date();

    res.send(`
    <h1>Phonebook has Info for ${noOfPersons} people</h1> 
    <p>${timeInfo}</p>
    `)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


