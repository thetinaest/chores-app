const { AuthenticationError } = require('apollo-server-express');
const { sign } = require('jsonwebtoken');
const { Parent, Child, Chore} = require('../models');
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
				.populate({
					path: 'children'
				})
            
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
				.populate({
					path: 'chores'
				})
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
			}
			
			//sign token
			const token = signToken({
				...parental._doc,
				userType: 'parent'
			})

			//return auth type
			return {
				token,
				parent: parental,
			}
		},
		addParent: async (parent, args, context, info) => {
			const newParent = await Parent.create(args)

			const token = signToken({
				...newParent._doc,
				userType: 'parent'
			})
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
			}

			const token = signToken({
				...child._doc,
				userType: 'child'
			})
			//return auth type
			return {
				token,
				child
			}
		},
		addChild: async (parent, args, context, info) => {
			const newChild = await Child.create(args)

			 await Parent.findByIdAndUpdate({_id: args.parentId}, {$push: {children: newChild._id}}, {new: true})

			const token = signToken({
				...newChild._doc,
				userType: 'child'
			})
			return {
				child : newChild,
				token
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
		addChore: async (parent, args, context, info) => {
			const newChore = await Chore.create(args)
			console.log(newChore);

			await Child.findByIdAndUpdate({_id: args.childId}, {$push: {chores: newChore._id}}, {new: true})

			return {
				chore : newChore
			}
		},
		updateChore: async (parent, args, context, info) => {
			console.log(args);
			return await Chore.findByIdAndUpdate(args._id, args, { new: true })
		},
		deleteChore: async (parent, args, context, info) => {
			return await Chore.findByIdAndDelete(args._id)
		},
	},
}


module.exports = resolvers