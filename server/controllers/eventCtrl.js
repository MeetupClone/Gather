const createEvent = (req, res) => {
    req.app
        .get('db')
        .createEvent(req.body)
        .then(result => { return res.json(result) })

}


const getAllEvents = (req, res) => {
    req.app
        .get('db')
        .getAllEvents()
        .then(result => res.json(result))
        .catch(err => console.log(err, "get all event endpoint not working"));
}

const getAllGroups = (req, res) => {
    req.app
        .get('db')
        .getAllGroups()
        .then(results => res.json(results))
        .catch(err => console.log(err, "get all group endpoint not working"))

}

const getEventById = (req, res) => {
    const { id } = req.params;
    req.app
        .get('db')
        .getEventById([id])
        .then(results => res.json(results))
        .catch(err => console.log(err, "get events by id endpoint not working"))

}

module.exports = {
    getAllEvents,
    getAllGroups,
    getEventById,
    createEvent
}