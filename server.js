const express = require('express');
const massive = require('massive');
const cors = require('cors');
const webp = require('webp-converter');
const { json } = require('body-parser');
const axios = require('axios');
const admin = require('firebase-admin')
const firebase = require('firebase')

const serviceAccount = require('./server/keys/serviceAccountKey.json')
const { herokuDb } = require('./server/keys/config.js');



const port = 3001;

const connectionString = herokuDb

massive(connectionString).then(db => {
    app.set('db', db)
})

const app = express();

app.use(json());

app.use(express.static('./public'));


const userCtrl = require('./server/controllers/userCtrl')
app.post('/api/user/createUser', userCtrl.createUser)
app.put('/api/user/registerFCMKey', userCtrl.registerFCMKey)
app.get('/api/user/getUserInfo/:userId', userCtrl.getUserInfo)
app.post('/api/user/profile/update', userCtrl.updateUserProfile)

const utilCtrl = require('./server/controllers/utilCtrl')
app.post('/api/pictures/upload', utilCtrl.uploadPicture)

const eventCtrl = require('./server/controllers/eventCtrl')
app.post('/api/event/create', eventCtrl.createEvent);
app.post('/api/event/join', eventCtrl.joinEvent)
app.post('/api/event/leave', eventCtrl.leaveEvent)
app.get('/api/event/getAttendingEvents/:id', eventCtrl.getAttendingEvents)
app.get('/api/events', eventCtrl.getAllEvents)
app.get('/api/event/:id', eventCtrl.getEventById)
app.get('/api/event/userid/:id', eventCtrl.getEventByUserId)

const groupCtrl = require('./server/controllers/groupCtrl')
app.get('/api/group/:id', groupCtrl.getGroupById)
app.get('/api/groups', groupCtrl.getAllGroups)
app.post('/api/groups/create', groupCtrl.createGroup)
app.get('/api/group/user/:id', groupCtrl.getGroupByUserId)


app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})