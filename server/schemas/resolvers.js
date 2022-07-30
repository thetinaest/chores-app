const { AuthenticationError } = require('apollo-server-express');
const { Parent, Child } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		parents: async (parent, args, context, info) => {
			return await Parent.find()
		},
		parent: async (parent, args, context, info) {
			const where = {}
			if (args._id){
				where._id = args._id
			}
			if (args.email){
				where.email = args.email
			}
			if (args.username){
				where.username = args.username
			}
		
			return await User.findOne(where)
		},
	Mutation:{
	
		login: async (parent, args, context, info) => {
			// finds user by their username
			const user = await User.findOne({ username: args.username })
			//if it cant be found, throws error
			if (!user) {
				throw new AuthenticationError ('No user found with that username!!')
			}
			//validate password
			const isCorrectPW = await user.isCorrectPassword(args.password)
			//validates password
			if (!isCorrectPW) {
				throw new AuthenticationError('Invalid Password!!')
			//sign token :)
			const token = signToken(user)
			//return auth type
			return {
				token,
				user,
			}
		},
		addUser: async (parent, args, context, info) => {
			const newUser = await User.create(args)
			const token = signToken(newUser)
			return {
				user: newUser,
				token,
			}
		},
		updateUser: async (parent, args, context, info) => {
			return await User.findByIdAndUpdate(args._id, args, { new: true })
		},
		deleteUser: async (parent, args, context, info) => {
			return await User.findByIdAndDelete(args._id)
		},
	
	},
	}


module.exports = resolvers