const { AuthenticationError } = require('apollo-server-express');
const { Parent, Child, } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		parents: async (parent, args, context, info) => {
			return await Parent.find()
		},
		parent: async (parent, args, context, info) => {
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
		
			return await Parent.findOne(where)
            
		},
		child: async (parent, args, context, info) => {
			const where = {}
			if (args._id){
				where._id = args._id
			}
			if (args.username){
				where.username = args.username
			}
			return await Child.findOne(where)
        }
	},	
	Mutation:{
	
		loginParent: async (parent, args, context, info) => {
			// finds user by their username
			const parental = await Parent.findOne({ username: args.username })
			//if it cant be found, throws error
			if (!parental) {
				throw new AuthenticationError ('No parent found with that username!!')
			}
			//validate password
			const isCorrectPW = await parental.isCorrectPassword(args.password)
			//validates password
			if (!isCorrectPW) {
				throw new AuthenticationError('Invalid Password!!')
				//sign token
				const token = signToken(parental)
				//return auth type
				return {
					token,
					parental,
				}
			}
		},
		addParent: async (parent, args, context, info) => {
			const newParent = await Parent.create(args)
			const token = signToken(newParent)
			return {
				parent: newParent,
				token,
			}
		},
		loginChild: async (parent, args, context, info) => {
			// finds user by their username
			const child = await Child.findOne({ username: args.username })
			//if it cant be found, throws error
			if (!child) {
				throw new AuthenticationError ('No child found with that username!!')
			}
			//validate password
			const isCorrectPW = await child.isCorrectPassword(args.password)
			//validates password
			if (!isCorrectPW) {
				throw new AuthenticationError('Invalid Password!!')
				//sign token
				const token = signToken(child)
				//return auth type
				return {
					token,
					child,
				}
			}
		},
		addChild: async (parent, args, context, info) => {
			const newChild = await Child.create(args)
			const token = signToken(newChild)
			return {
				child : newChild,
				token,
			}
		},
		updateParent: async (parent, args, context, info) => {
			return await Parent.findByIdAndUpdate(args._id, args, { new: true })
		},
		updateChild: async (parent, args, context, info) => {
			return await Child.findByIdAndUpdate(args._id, args, { new: true })
		},
		deleteParent: async (parent, args, context, info) => {
			return await Parent.findByIdAndDelete(args._id)
		},
		deleteChild: async (parent, args, context, info) => {
			return await Child.findByIdAndDelete(args._id)
		},
	
	},
}


module.exports = resolvers