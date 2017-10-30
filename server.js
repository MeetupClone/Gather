const express = require('express');
const massive = require('massive');
const cors = require('cors');
const webp = require('webp-converter');
const { json } = require('body-parser');
const axios = require('axios');


const port = 3000;

const {herokuDb} = require('./server/keys/config.js');
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




app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})


