const mongo = require('mongodb');
const mongoose = require('mongoose');
const logger = require('../../logger');
const dotenv = require('dotenv').config();
const notes = require('../db/noteSchema');

var notesModel = mongoose.model('notes', notes);

var uri = process.env.MONGO_DB_URI;

async function addNote(title, content){

    let note = new notesModel({title: title, content: content});

    note.save().then((doc) => {
        logger.log(doc);
    }).catch((err) => {
        logger.log(err);
    })
   
}

module.exports = {
    addNote: addNote,
}