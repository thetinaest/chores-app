import { gql } from "@apollo/client"; 

export const QUERY_PARENT = gql`
query parent($_id: ID, $username: String) {
  parent(_id: $_id, username: $username) {
    username
    displayName
    children {
      _id,
      username
      displayName
    }
  }
}

`;

export const QUERY_CHILD = gql`
  query child($_id: ID, $username: String) {
    child(_id: $_id, username: $username) {
      _id
      username
      displayName
      chores {
        _id
        name
        description
        createdAt
        status
        allowance
      }
    }
  }
  `;


