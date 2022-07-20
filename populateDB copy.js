const loki = require('lokijs');
const db = new loki('client_credentialsUAT.json');

createdb();

function createdb() {
    console.log("creating db.....")
    //create collections
    var client_list = db.addCollection('clientcredlist');

    //populate collection
    client_list.insert({
        id: '',
        email: '',
        password: '',
        token: '',
        feature: '',
    });  
    client_list.insert({
        id: '',
        email: '',
        password: '',
        token: '',
        feature: '',
    });
    client_list.insert({
        id: '',
        email: '',
        password: '',
        token: '',
        feature: '',
    });
    client_list.insert({
        id: '52',
        email: 'e2e+load4@medenterprises.com',
        password: '',
        token: '',
        feature: '',
    });
console.log(client_list.data);
    db.saveDatabase();
};