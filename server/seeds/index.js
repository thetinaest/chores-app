const connection = require('../config/connection')
const { User } = require('../models')

connection.on('open', async () => {
//delete all users
	await User.deletemany()
//create new user
	await User.create({
	username:'Josh',
	email:'zylo.codes@gmail.com',
	password:'supersecretpass'
	})
	
	process.exit(0)
})