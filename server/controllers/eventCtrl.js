
const getAllEvents = (req, res) => {
	req.app
    .get('db')
    .getAllEvents()
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err, "get all event endpoint not working"));
}

const getAllGroups = (req, res) => {
    req.app
    .get('db')
    .getAllGroups()
    .then(results => res.status(200).json(results))
    .catch(err => console.log(err, "get all group endpoint not working"))
}

module.exports = {
    getAllEvents,
    getAllGroups
}