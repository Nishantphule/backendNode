const router = require('express').Router();

const Note = require('../models/notes');

router.post('/', (request, response) => {
    // prepare an object to store it in the database
    const note = new Note(request.body);

    // storing the new object to the database
    note.save()
        .then(result => {
            response.status(201).json({ message: 'Note created successfully' });
        });
});

module.exports = router;