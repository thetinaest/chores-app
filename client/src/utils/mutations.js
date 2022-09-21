import { gql } from "@apollo/client";

export const LOGIN_PARENT = gql`
mutation loginParent($username: String!, $password: String!) {
  loginParent(username: $username, password: $password) {
    token,
    parent {
      _id
      username
    }
  }
}
`;

export const ADD_PARENT = gql`
mutation AddParent($username: String!, $email: String!, $password: String!, $displayName: String!) {
  addParent(username: $username, email: $email, password: $password, displayName: $displayName) {
    token
    parent {
      _id
      username
    }
  }
}
`;

export const LOGIN_CHILD = gql`
mutation LoginChild($username: String!, $password: String!) {
  loginChild(username: $username, password: $password) {
    token
    child {
      _id
      username
    }
  }
}
`;

export const ADD_CHILD = gql`
mutation AddChild($parentId: ID!, $username: String!, $password: String!, $displayName: String!) {
  addChild(parentId: $parentId, username: $username, password: $password, displayName: $displayName) {
    token
    child {
      _id
      displayName
      username
    }
  }
}
`;

export const UPDATE_PARENT = gql`
mutation UpdateParent($_id: ID, $email: String, $password: String, $username: String, $displayName: String, $children: [ID]) {
  updateParent(_id: $_id, email: $email, password: $password, username: $username, displayName: $displayName, children: $children) {
    token
    parent {
      _id
      username
      email
      password
      displayName
      children {
        _id
      }
    }
  }
}
`;

export const UPDATE_CHILD = gql`
mutation UpdateChild($_id: ID, $password: String, $username: String, $displayName: String, $pointBank: Int) {
  updateChild(_id: $_id, password: $password, username: $username, displayName: $displayName, pointBank: $pointBank) {
    _id
    username
    password
    displayName
  }
}
`;

  export const DELETE_PARENT = gql`
  mutation deleteParent($_id: ID) {
    deleteParent(_id: $_id) {
      _id
    }
  }
  `;

  export const DELETE_CHILD = gql`
  mutation deleteChild($_id: ID) {
    deleteChild(_id: $_id) {
      _id
    }
  }
  `;

export const ADD_CHORE = gql`
mutation addChore($childId: ID!, $name: String!, $description: String!, $allowance: String, $points: Int) {
    addChore(childId: $childId, name: $name, description: $description, allowance: $allowance, points: $points) {
      _id
    }
  }
`;

export const UPDATE_CHORE = gql`
mutation UpdateChore($_id: ID, $name: String, $description: String, $status: String, $allowance: String, $points: Int) {
  updateChore(_id: $_id, name: $name, description: $description, status: $status, allowance: $allowance, points: $points) {
    _id
  }
}
`;

export const DELETE_CHORE = gql`
mutation DeleteChore($_id: ID) {
    deleteChore(_id: $_id) {
      _id
      name
    }
  }
`;