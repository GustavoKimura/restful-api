const mongoose = require('mongoose');

const Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    salary: Number,
    approved: Boolean
}));

module.exports = Person;