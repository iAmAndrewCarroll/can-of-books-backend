'use strict';

/*
  each cat in our database should look something like this:

  let aCat = {
    name: 'Mr. Mistoffelees',
    color: 'black and white',
    spayNeuter: true,
    location: 'London'
  }
*/

// bring in mongoose here (as well as the server.js)
const mongoose = require('mongoose');

// extract the schema
const { Schema } = mongoose;

// create a cat schema, define how our object should be structured
const bookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: Boolean, required: true},
});

// create a Model and tell the model about the rules (AKA the schema)
// we pass mongoose.model a string name for the collection and an instance of schema
const bookModel = mongoose.model('Book', bookSchema);


module.exports = bookModel;


