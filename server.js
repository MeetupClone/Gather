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



const port = 3002;

const connectionString = herokuDb

massive(connectionString).then(db => {
    app.set('db', db)
})

const app = express();

app.use(json());

app.use(express.static('./public'));

const eventCtrl = require('./server/controllers/eventCtrl')
const userCtrl = require('./server/controllers/userCtrl')
const groupCtrl = require('./server/controllers/groupCtrl')

app.post('/api/user/createUser', userCtrl.createUser)
app.put('/api/user/registerFCMKey', userCtrl.registerFCMKey)
app.get('/api/user/getUserInfo/:userId', userCtrl.getUserInfo)
app.post('/api/user/profile/update', userCtrl.updateUserProfile)

app.get('/api/user/account/getPref/:id', userCtrl.getUserPreferences)
app.get('/api/user/account/getCat/:id', userCtrl.getUserCategories)

app.get('/api/events', eventCtrl.getAllEvents)
app.get('/api/event/:id', eventCtrl.getEventById)



app.get('/api/group/:id', groupCtrl.getGroupById)
app.get('/api/groups', groupCtrl.getAllGroups)
app.post('/api/groups/create', groupCtrl.createGroup)


app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})