const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesSchema = new Schema({
    title: String,
    content: String,
    date: {type: Date, default: Date.now()}
})