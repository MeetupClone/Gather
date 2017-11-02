
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

const getEventById = (req, res) => {

    const { id } = req.params;

    req.app
    .get('db')
    .getEventById([id])
    .then(results => res.status(200).json(results))
    .catch(err => console.log(err, "get events by id endpoint not working"))
}

module.exports = {
    getAllEvents,
    getAllGroups,
    getEventById
}