const express = require('express');
const massive = require('massive');
const cors = require('cors');
const webp = require('webp-converter');
const { json } = require('body-parser');
const axios = require('axios');


const port = 3001;

const {herokuDb} = require('./server/keys/config.js');
const connectionString = herokuDb

massive(connectionString).then(db => {
    app.set('db', db)
})

const app = express();

app.use(json());

app.use(express.static('./public'));


const userCtrl = require('./server/controllers/userCtrl')
const eventCtrl = require('./server/controllers/eventCtrl')
const groupCtrl = require('./server/controllers/groupCtrl')

app.post('/api/user/createUser', userCtrl.createUser)
app.put('/api/user/registerFCMKey', userCtrl.registerFCMKey)
app.get('/api/events', eventCtrl.getAllEvents)
app.get('/api/groups', eventCtrl.getAllGroups)
app.get('/api/group/:id', groupCtrl.getGroupById)
app.get('/api/event/:id', eventCtrl.getEventById)




app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})


