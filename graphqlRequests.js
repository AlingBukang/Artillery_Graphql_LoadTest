
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

const postNetworkUpdate = `mutation publishNetworkUpdate($networkUpdate: NetworkUpdateInput!) {
    publishNetworkUpdate(networkUpdate: $networkUpdate) {
      id
      createdAt
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
