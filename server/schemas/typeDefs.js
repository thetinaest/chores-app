const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Parent {
    _id: ID
    username: String
    email: String
    password: String
    displayName: String
    children: [Child]
  }

  type Chore {
    _id: ID
    name: String
    description: String
    createdAt: String
    status: String
    allowance: String
  }

  type Child {
    _id: ID
    username: String
    password: String
    displayName: String
    chores: [Chore]
  }

  type parentAuth {
    token: ID!
    parent: Parent
  }

  type childAuth {
    token: ID
    child: Child
  }

  type Query {
    parents: [Parent]
    parent(_id: ID, username: String, email: String): Parent
    child(_id: ID, username: String, ): Child
  }

	type Mutation {
		loginParent(username: String!, password: String!): parentAuth
		addParent(username: String!, email: String!, password: String!, displayName: String!): parentAuth
    loginChild(username: String!, password: String!): childAuth
    addChild(parentId: ID!, username: String!, password: String!, displayName: String!): childAuth
		updateParent(_id: ID, email: String, password: String, username: String, displayName: String, children: [ID]): parentAuth
    updateChild(_id: ID, email: String, password: String, username: String, displayName: String): Child
		deleteParent(_id: ID): Parent
    deleteChild(_id: ID): Child
    addChore(childId: ID!, name: String!, description: String!, allowance: String): Chore
    updateChore(_id: ID, name: String, description: String, status: String, allowance: String): Chore
    deleteChore(_id: ID): Chore
	}
`;

module.exports = typeDefs;