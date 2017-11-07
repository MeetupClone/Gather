

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

const getUserPreferences = (req, res) => {
	req.app
	.get('db')
	.getUserPreferences(req.params.id)
	.then(result => {
		res.status(200).json(result)
		
	}).catch(err => console.log("get user pref endpoint not working", err))
}

const getUserCategories = (req, res) => {
	req.app
	.get('db')
	.getUserCategories(req.params.id)
	.then(result => {
		res.status(200).json(result)
	}).catch(err => console.log("get user cat endpoint not working", err))
}

const updateNotifications = (req, res) => {
	console.log(req.body)
	req.app
		.get('db')
		.updateNotifications(req.body)
		.then(result => res.status(200).json(result))
		.catch(err => console.log("update notifications endpoint not working", err))
}


module.exports = {
	createUser,
	registerFCMKey,
	getUserInfo,
	updateUserProfile,
	getUserPreferences,
	getUserCategories,
	updateNotifications
}