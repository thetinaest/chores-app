import { gql } from "@apollo/client"; 

export const QUERY_PARENT = gql`
query parent($_id: ID, $username: String) {
  parent(_id: $_id, username: $username) {
    username
    children {
      _id,
      username
    }
  }
}

`;

export const QUERY_CHILD = gql`
  query child($_id: ID, $username: String) {
    child(_id: $_id, username: $username) {
      _id
      chores {
        _id
        name
      }
    }
  }
  `;


