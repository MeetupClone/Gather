const uploadPicture = (req, res) => {
	if (req.body[0] === "user") {
		req.app
			.get("db")
			.uploadUserProfilePic([req.body[1], req.body[2]])
			.then(result => {
				return req.body[1];
			});
	} else if (req.body[0] === "group") {
		req.app
			.get("db")
			.uploadGroupProfilePic(req.body[1])
			.then(result => {
				return req.body[1];
			});
	}
};

module.exports = {
	uploadPicture
};
