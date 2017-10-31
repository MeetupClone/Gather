

const createUser = (req,res) => {
	req.app
	.get('db')
	.createUser(req.body)
	.then(result => {
		console.log("userSaved")
	})
}

const registerFCMKey = (req,res) => {
	console.log(req.body)
	req.app
	.get('db')
	.registerFCMKey(req.body)
	.then(result => {
		console.log("Registered Key")
	})
}




module.exports = {
	createUser,
	registerFCMKey
}