const express = require('express');
const massive = require('massive');
const cors = require('cors');
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
app.get('/api/user/account/getPref/:id', userCtrl.getUserPreferences)
app.get('/api/user/account/getCat/:id', userCtrl.getUserCategories)

const utilCtrl = require('./server/controllers/utilCtrl')
app.post('/api/pictures/upload', utilCtrl.uploadPicture)

const eventCtrl = require('./server/controllers/eventCtrl')
app.post('/api/event/create', eventCtrl.createEvent);
app.post('/api/event/edit', eventCtrl.editEvent);
app.post('/api/event/join', eventCtrl.joinEvent)
app.post('/api/event/leave', eventCtrl.leaveEvent)
app.get('/api/event/getAttendingEvents/:id', eventCtrl.getAttendingEvents)
app.get('/api/event/getAttendingEventsData/:id', eventCtrl.getAttendingEventsData)
app.get('/api/events', eventCtrl.getAllEvents)
app.get('/api/event/:id', eventCtrl.getEventById)
app.get('/api/event/userid/:id', eventCtrl.getEventByUserId)

const groupCtrl = require('./server/controllers/groupCtrl')
app.get('/api/group/:id', groupCtrl.getGroupById)
app.get('/api/groups', groupCtrl.getAllGroups)
app.get('/api/groups/getUsersGroups/:id', groupCtrl.getUsersGroups)
app.post('/api/groups/create', groupCtrl.createGroup)
app.get('/api/group/user/:id', groupCtrl.getGroupByUserId)
app.post('/api/group/join', groupCtrl.joinGroup)
app.post('/api/group/leave', groupCtrl.leaveGroup)


app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})