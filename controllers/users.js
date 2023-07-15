// import the express Router
const usersRouter = require('express').Router();

// import the model
const User = require('../models/user');

// endpoint to get all the users
usersRouter.get('/', (request, response) => {
    User.find({}, {})
    .then((users) => {
        response.json(users);
    });
});

// fetches a single resource
usersRouter.get('/:id', (request, response, next) => {
    const id = request.params.id;
    User.findById(id)
        .then((user) => {
            if (!user) {
                return response.status(404).json({ error: 'user not found' });
            }
            response.json(user);
        })
        .catch(error => next(error));
});

// creates a new resource based on the request data
usersRouter.post('/', (request, response) => {
    const user = new User(request.body);
    user.save()
        .then((saveduser) => {
            response.status(201).json({ message: 'user created successfully', user: saveduser });
        })
});

// deletes a single resource
usersRouter.delete('/:id', (request, response) => {
    const id = request.params.id;

    User.findByIdAndDelete(id)
        .then((deleteduser) => {
            if (!deleteduser) {
                return response.status(404).json({ error: 'user not found' });
            }
            response.status(204).json({ message: 'user deleted successfully' });
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

// patch request to update the identified resource with the request data
usersRouter.patch('/:id', (request, response) => {
    const id = request.params.id;
    const userToPatch = request.body;

    User.findByIdAndUpdate(id, userToPatch)
        .then((updateduser) => {
            if (!updateduser) {
                return response.status(404).json({ error: 'user not found' });
            }
            response.json(updateduser);
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

// put request to replace the entire identified resource with the request data
usersRouter.put('/:id', (request, response) => {
    const id = request.params.id;
    const userToPut = request.body;

    User.findByIdAndUpdate(id, userToPut)
        .then((updateduser) => {
            if (!updateduser) {
                return response.status(404).json({ error: 'user not found' });
            }
            response.json(updateduser);
        })
        .catch((error) => {
            response.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = usersRouter;