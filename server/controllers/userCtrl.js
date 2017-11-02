

const createUser = (req,res) => {
	req.app
	.get('db')
	.createUser(req.body)
	.then(result => {
		console.log("userSaved")
	})
}

const registerFCMKey = (req,res) => {
	req.app
	.get('db')
	.registerFCMKey(req.body)
	.then(result => {
		console.log("Registered Key")
	})
}

const getUserInfo = (req,res) => {
	req.app
	.get('db')
	.getUserInfo(req.params.userId)
	.then(result => {
		res.json(result)
	})
}

const updateUserProfile = (req,res) => {
	req.app
	.get('db')
	.updateUserProfile(req.body)
	.then(result => {
		console.log(result)
	})
}



module.exports = {
	createUser,
	registerFCMKey,
	getUserInfo,
	updateUserProfile
}