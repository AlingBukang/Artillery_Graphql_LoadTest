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
        userContext.vars.waitTime = faker.datatype.number({
            'min': 100,
            'max': 3000
        });
        userContext.vars.fakeEmail = faker.internet.email();
        userContext.vars.insightID = faker.datatype.number({
            'min': 1,
            'max': 752
        });
        userContext.vars.userId = faker.datatype.number({
            'min': 49,
            'max': 60
        });
        userContext.vars.passwd = pwd.uatTestUserPassword;
        userContext.vars.randomWord = faker.word.adjective();
        userContext.vars.randomTitle = faker.random.words();
        userContext.vars.randomOverview = faker.random.words(5);
        userContext.vars.randomSentence = faker.lorem.sentences();
        userContext.vars.randomHackerPhrase = faker.hacker.phrase()
        return done();
    },


    setJSONBody: (req, userContext, events, next)  => {
        userContext.vars['getUserCPD'] = userCPD;
        userContext.vars['getInsights'] = insights;
        userContext.vars['getInsightById'] = insightById;
        userContext.vars['addInsightComment'] = addInsightComment;
        userContext.vars['getNetworkUpdates'] = getNetworkUpdates;
        userContext.vars['publishNetworkUpdate'] = publishNetworkUpdate;
        userContext.vars['getUserById'] = userById;
        userContext.vars['getPendingConnections'] = pendingConnections;
        userContext.vars['getConnections'] = connections;
        userContext.vars['getProfiles'] = profiles;
        userContext.vars['searchProfile'] = searchProfile;
        userContext.vars['getSavedInsights'] = savedInsights;
        userContext.vars['getDraftInsights'] = draftInsights;
        userContext.vars['saveDraftInsight'] = saveDraftInsight;
        userContext.vars['publishInsight'] = publishInsight;
        userContext.vars['getNotifications'] = notifications;
        userContext.vars['addNetworkUpdateComment'] = addNetworkUpdateComment;
        userContext.vars['getNetworkUpdateCommentReplies'] = getNetworkUpdateCommentReplies;

        return next();
    },    

    logResponseHeaders: (req, res, userContext, events, next) => {
        // console.log("Start response...." +res);
        if([200,300].indexOf(res.statusCode) < 0) {
            logObject({
                url: req.url,
                statusCode: res.statusCode,
                headers: res.headers,
                responseBody: res.body
            });
        }
        if (!(res.headers['x-response-time'])) {
            return next();
        }

        const responseTime = Number(res.headers['x-response-time'].split('ms')[0]);
        events.emit('customStat', { stat: 'response_time', value: responseTime });

        console.log('responseTime....', responseTime);    
        return next();
    }
};

setCache();

function setCache() {
    db.loadDatabase({}, async function () {
        var clients = db.getCollection('clientcredlist') 

        clientsList = clients.find();
        clientListSize = clientsList.length
    })    
}

function getRandomToken() {
    var randomToken = clientsList[Math.floor(Math.random() * clientListSize)];
    return randomToken;         
}

function logObject(obj) {
    console.log(util.inspect(obj, {showHidden: false, depth: null}))
}


const userCPD = `query GetUserCpd {
    userCpd {
      totalCpdTime
      items {
        createdAt           
        ... on CpdInsight {
          insight {
            id
            title
            averageReadTime
            authorName
          }
        }
      }
    }
  }`;

const insights = `query Insights($first: Int, $after: String, $filter: InsightFilter) {
    insights(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          id
          title
          overview
          authorName
        }  
      }
    }
  }`

const insightById = `query Insight($id: Int!) {
    insight(id: $id) {
      id
      title
      data
      authorName
      totalLikes
      totalComments
      userHasLiked
      userHasCommented
      userHasSaved
      tags {
        id
        name
      }
      comments {
        id
        insightCommentId
        content
        totalComments
        comments {
          id
          insightCommentId
          content
          authorName
        }
      }
    }
  }`

const addInsightComment = `mutation AddInsightComment($insightComment: InsightCommentInput!) {
    addInsightComment(insightComment: $insightComment) {
      id
      totalComments
      insightId
      insightCommentId
      content
      authorId
    }
  }`
  
  
const userById = `query user($id: Int) {
    user(id: $id) {
      id
      firstName
      lastName
      registrationNumber
      medicalCouncil
      profile {
        jobTitle
        profilePicture
      }
    }
  }`
  
const pendingConnections = `query User($first: Int, $after: String, $connectionStatusFilter: String) {
    user {
      id
      connections(first: $first, after: $after, connectionStatusFilter: $connectionStatusFilter) {
        edges {
          cursor
          node {
            id
            firstName
            lastName
          }
        }
      }      
    }
  }`
  
 const connections = ` query User($first: Int, $after: String, $connectionStatusFilter: String, $sortField: String) {
    user {
      id
      connections(first: $first, after: $after, connectionStatusFilter: $connectionStatusFilter, sortField: $sortField) {
        edges {
          cursor
          node {
              id
              firstName
              lastName
              connection {
                connectedDate
              }
              profile {
                jobTitle
                profilePicture
              }
          }
        }
      }      
    }
  }`
  
const profiles = `query Profiles($first: Int, $after: String, $term: String!) {
    profiles(first: $first, after: $after, term: $term) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          jobTitle
          connection {
            status
            founder
          }
        }  
      }
    }
  }`

  const searchProfile = `query Profiles($first: Int, $after: String, $term: String!) {
    profiles(first: $first, after: $after, term: $term) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          jobTitle
          connection {
            status
            founder
          }
        }  
      }
    }
  }`  
  
const savedInsights = `query SavedInsights($first: Int, $after: String, $filter: SavedInsightFilter) {
    savedInsights(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          id
          title
          overview
          authorName
          tags {
            id
            name
          }
        }  
      }
    }
  }`
  
const draftInsights = `query Insights {
    draftInsights {
      edges {
        node {
          id
          title
          overview
          authorName
        }  
      }
    }
  }`

const saveDraftInsight = `mutation SaveDraftInsight($insight: InsightInput!) {
    saveDraftInsight(insight: $insight) {
        id
        updatedAt
    }
  }`
 
const publishInsight = `mutation PublishInsight($payload: PublishInsightInput!) {
    publishDraftInsight(insight: $payload) {
        publishedAt
    }
  }`
  
const notifications = `query Notifications($first: Int, $after: String) {
    notifications(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          userId
          senderId
          type
          data
          read
          status
          sender {
            id
            firstName
            lastName
          }
        }  
      }
    }
  }`

const createNotification = `mutation CreateNotification($notification: NotificationInput!) {
    createNotification(notification: $notification) {
      id
      userId
      senderId
      type
      data
      read
      status
    }
  }`

const getNetworkUpdates = `query getNetworkUpdates($first: Int, $after: String) {
    networkUpdates(first: $first, after: $after) {
      edges {
        cursor            
        node { 
          id
          authorId
          authorName
          title
          data
        }
      }      
    }
  }`

const publishNetworkUpdate = `mutation publishNetworkUpdate($networkUpdate: NetworkUpdateInput!) {
    publishNetworkUpdate(networkUpdate: $networkUpdate) {
      id
      createdAt
    }
  }`

const getNetworkUpdateCommentReplies = `query networkUpdateCommentReplies($networkUpdateCommentId: Int, $first: Int!, $after: String) {
    networkUpdateCommentReplies(networkUpdateCommentId: $networkUpdateCommentId, first: $first, after: $after) {
      edges {
        node {
          id
          networkUpdateCommentId
          content
          totalComments
          createdAt
          authorId
          authorFirstName
          authorLastName
          authorPicture
          userHasCommented
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }`


const addNetworkUpdateComment = `mutation addNetworkUpdateComment($networkUpdateComment: NetworkUpdateCommentInput!) {
    addNetworkUpdateComment(networkUpdateComment: $networkUpdateComment) {
      id
      createdAt
    }
  }`