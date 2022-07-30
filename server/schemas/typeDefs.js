const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Parent {
    _id: ID
    username: String
    email: String
    password: String
    children: [Child]
  }

  type Chore {
    name: String
    description: String
    complete: Boolean
    approve: Boolean
    paid: Boolean
    createdAt: String
  }

  type Child {
    username: String
    password: String
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
		addParent(username: String!, email: String!, password: String!): parentAuth
    loginChild(username: String!, password: String!): childAuth
    addChild(username: String!, password: String!): childAuth
		updateParent(_id: ID, email: String, password: String, username: String): Parent
    updateChild(_id: ID, email: String, password: String, username: String): Child
		deleteParent(_id: ID): Parent
    deleteChild(_id: ID): Child
	}
`;

module.exports = typeDefs;