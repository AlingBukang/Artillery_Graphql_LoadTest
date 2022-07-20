const loki = require('lokijs');
const util = require('util');
const { faker } = require('@faker-js/faker');
const pwd = require('./config.json');
require('./client_credentialsUAT.json')

const db = new loki('./client_credentialsUAT.json');

var clientsList;
var clientListSize;

module.exports = {
    generateRandomData:  (userContext, events, done) => {
        userContext.vars.vuId = getRandomToken().id;
        userContext.vars.cookie = "token=" + getRandomToken().token;
        return done();
    },

    createNotificationObject 
};

//types of notifications - insight, connection, like

function createNotificationObject(userContext, events, done) {
  userContext.vars.data = notification;
  return done();
}  

const notificationData = {
  title: faker.random.words(5),
  preview: faker.hacker.phrase(),
  insightId: faker.datatype.number({
    'min': 1,
    'max': 320
}),
  commentId: 10,
}

const notification = {
  userId: getRandomToken().id,
  senderId: getRandomToken().id,
  type: 'insight',
  data: JSON.stringify(notificationData),
}

function connectHandler(params, context, next) {
  params.target = "${params.target}/?token=${context.vars.token}";

  next();
}  


const createNotification = `
            mutation CreateNotification($notification: NotificationInput!) {
                createNotification(notification: $notification) {
                    id
                    userId
                    senderId
                    type
                    data
                    read
                    status
                }
            }
            `