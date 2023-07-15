const router = require('express').Router();

const Note = require('../models/notes');

router.get('/', (request, response) => {
    Note.find({}, {})
    .then((notes) => {
        response.json(notes);
    });
});

module.exports = router;