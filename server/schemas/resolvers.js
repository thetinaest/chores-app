const { AuthenticationError } = require('apollo-server-express');
const { Parent, Child } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me:
}