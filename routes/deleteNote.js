const router = require('express').Router();

const Note = require('../models/notes');

router.delete('/:id', (request, response) => {
    // get the id of the resource from params
    const id = request.params.id;

    Note.findByIdAndDelete(id)
        .then((deletedNote) => {
            if (!deletedNote) {
                return response.status(404).json({ error: 'Note not found' });
            }
            response.status(204).json({ message: 'Note deleted successfully' });
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });

    // response.status(204).end();
});

module.exports = router;