import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String, $password: String) {
    login(email: $email, password: $passwsord) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_CHORE = gql`
mutation addChore($choreData: String!) {
    addChore(choreData: $choreData) {
        _id
        username
        chores {
            description
            allowance
            complete
        }
    }
}
`;

export const REMOVE_CHORE = gql`
mutation removeChore($choreId: ID) {
    removeChore(choreId: $choreId) {
        _id
        username
        chores {
            description
            allowance
            complete
        }
    }
}
`;