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
    _id: ID
    name: String
    description: String
    complete: Boolean
    approve: Boolean
    paid: Boolean
    createdAt: String
  }

  type Child {
    _id: ID
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
    addChild(parentId: ID!, username: String!, password: String!): childAuth
		updateParent(_id: ID, email: String, password: String, username: String, children: [ID]): Parent
    updateChild(_id: ID, email: String, password: String, username: String): Child
		deleteParent(_id: ID): Parent
    deleteChild(_id: ID): Child
    addChore(childId: ID!, name: String!, description: String!): Chore
    updateChore(_id: ID, name: String!, description: String!, complete: Boolean, paid: Boolean, approve: Boolean): Chore
    deleteChore(_id: ID): Chore
	}
`;

module.exports = typeDefs;