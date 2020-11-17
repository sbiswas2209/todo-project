const logger = require('./logger');
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const os = require('os');
const addNote = require('./services/notes/addNote');
const { resolve } = require('path');
const { title } = require('process');
const db = require('./services/db/db');
const { connect } = require('http2');

db.connect();


app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const start = new Date(Date.now());

const port = process.env.PORT || 8080;


function addNoteCallback(id){
    res.status(201).json({
        message: 'Added Document',
        id: id
    });
}


app.get('/', (req,res) => {
    res.send("Server is up and running!!!");
    res.end();
});

app.post('/addNote', async (req,res) => {
    try{
        if(req.body.title.length === 0 || req.body.content.length === 0){
            throw 'Invalid Fields';
        }
        else{
            
            addNote.addNote(req.body.title, req.body.content);
            logger.log('Tried Adding')

        }
    }
    catch(e){
        res.status(400).json({
            message: e,
        })
    }
})

app.get('/healthCheck', (req,res) => {
    logger.log('Checking server health');
    res.json({
        'started': start,
        'uptime': os.uptime(),
        'message': `Server is running on port number ${port}`,
        'logs': logger.logs,
    });
});

app.all('*', (req,res) => {
    res.status(404).json({
        message: 'Route not found'
    })
})

app.listen(port, async (err) => {
    if(err){
        logger.log(err);
    }
    logger.log(`Server started on port: ${port}`);
});