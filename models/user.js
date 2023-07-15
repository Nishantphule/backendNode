const mongoose = require('mongoose');

// create a schema
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    Notes: Array,
    date: {
        type: Date,
        default: Date.now
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('User', userSchema);