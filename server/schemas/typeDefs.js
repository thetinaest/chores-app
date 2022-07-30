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
    allowance: Number
  }

  type Child {
    username: String
    password: String
    chores: [Chore]
  }

  type Auth {
    token: ID!
    parent: Parent
    child: Child
  }

  type Query {
    parent(_id: ID): Parent
    Parents: [Parent]
    Parent(_id: ID, username: String, email: String): Parent
    chores(name: String!): [Chore]
    chore(_id: ID!): Chore
    child(_id: ID): Child
    child(_id: ID, username: String, ): Child
  }

	type Mutation {
		login(username: String!, password: String!): Auth
		addParent(username: String!, email: String!, password: String!): Auth
    addChild(username: String!, password: String!): Auth
		updateParent(_id: ID, email: String, password: String, username: String): Parent
    updateChild(_id: ID, email: String, password: String, username: String): Child
		deleteParent(_id: ID): Parent
    deleteChild(_id: ID): Child
	}
`;

module.exports = typeDefs;