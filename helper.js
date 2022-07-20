const axios = require('axios')
const qs = require('querystring')
const loki = require('lokijs');
const pwd = require('./config.json')

const URL = 'https://url.com'
const db = new loki('./client_credentialsUAT.json');

var clientsCollection;
var clientsList;

exports.setAccessTokens = db.loadDatabase({}, function () {
    clientsCollection = db.getCollection('clientcredlist');
    clientsList = clientsCollection.find();

    loadDB(clientsList);
})

async function loadDB(clientsList) {
    for (let [i, client] of clientsList.entries()) {

        const creds = {
            username: client.email,
            password: client.password == '' ? pwd.uatTestUserPassword : client.password
        };

        await getToken(creds);   
    }
    console.log('Done!');
}

async function getToken(creds) {
    //get and save access token
    await axios.post(URL, qs.stringify(creds))
        .then(response => {
            const searchParams = new URLSearchParams(response.headers['set-cookie'][0]);
            const token = searchParams.get('token');
            var access_token = token.split(';').at(0)

            //save generated access token in db
            var clientInfo = clientsCollection.findObject({ 'email': creds.username });
            clientInfo.token = access_token;

            db.saveDatabase();
            console.log(clientInfo, ' saved in DB');
        })
        .catch((error) => {
            console.log('Get access token error.... ' + error);
        });
}