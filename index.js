const express = require('express');
const massive = require('massive');
const cors = require('cors');
const webp = require('webp-converter');
const { json } = require('body-parser');
const axios = require('axios');

const { Client } = require('pg');



const port = 3001;

const {herokuDb} = require('./server/keys/config.js');
const connectionString = herokuDb

massive(connectionString).then(db => {
    app.set('db', db)
})

const app = express();

app.use(json());

app.use(express.static('./public'));


app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})


