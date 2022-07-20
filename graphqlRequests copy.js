
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