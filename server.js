const express = require('express');
const massive = require('massive');
const cors = require('cors');
const webp = require('webp-converter');
const { json } = require('body-parser');
const axios = require('axios');
const admin  = require('firebase-admin')
const firebase = require('firebase')

const serviceAccount = require('./server/keys/serviceAccountKey.json')
const {herokuDb, firebaseUrl} = require('./server/keys/config.js');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: firebaseUrl
})

const port = 3001;


const connectionString = herokuDb

massive(connectionString).then(db => {
    app.set('db', db)
})

const app = express();

app.use(json());

app.use(express.static('./public'));


const userCtrl = require('./server/controllers/userCtrl')
const utilCtrl = require('./server/controllers/utilCtrl')

app.post('/api/user/createUser', userCtrl.createUser)
app.put('/api/user/registerFCMKey', userCtrl.registerFCMKey)
app.get('/api/user/getUserInfo/:userId', userCtrl.getUserInfo)
app.post('/api/user/profile/update', userCtrl.updateUserProfile)


app.post('/api/pictures/upload', utilCtrl.uploadPicture)


app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})


