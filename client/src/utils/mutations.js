import { gql } from "@apollo/client";

export const LOGIN_PARENT = gql`
mutation loginParent($username: String! $password: String!) {
    loginParent(username: $username, password: $passwsord) {
        token
        parent {
            _id
            username
        }
    }
}
`;

export const ADD_PARENT = gql`
mutation addParent($username: String!, $email: String!, $password: String!) {
    addParent(username: $username, email: $email, password: $password) {
        token
        parent {
            _id
            username
        }
    }
}
`;

export const LOGIN_CHILD = gql`
mutation loginChild($username: String! $password: String!) {
    loginChild(username: $username, password: $passwsord) {
        token
        child {
            _id
            username
        }
    }
}
`;

export const ADD_CHILD = gql`
mutation addChild($username: String!, $password: String!) {
    addChild(username: $username, password: $password) {
        token
        child {
            _id
            username
        }
    }
}
`;

export const UPDATE_PARENT = gql`
mutation updateParent($_id: ID, $email: String, $password: String, $username: String, $children: [ID]) {
    updateParent(_id: $_id, email: $email, password: $password, username: $username, children: $children) {
      _id,
      username,
      email,
      password,
      children {
        _id
      }
    }
  }
`;

export const UPDATE_CHILD = gql`
mutation updateChild($_id: ID, $password: String, $username: String) {
    updateChild(_id: $_id, password: $password, username: $username) {
      _id,
      username,
      password
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
mutation addChore($childId: ID!, $name: String!, $description: String!) {
    addChore(childId: $childId, name: $name, description: $description) {
      _id
    }
  }
`;

export const UPDATE_CHORE = gql`
mutation UpdateChore($id: ID, $name: String, $description: String, $complete: Boolean, $paid: Boolean, $approve: Boolean) {
    updateChore(_id: $id, name: $name, description: $description, complete: $complete, paid: $paid, approve: $approve) {
      _id
      name
      description
      complete
      approve
      paid
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