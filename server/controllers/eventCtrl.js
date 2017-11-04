const createEvent = (req, res) => {
    req.app
        .get('db')
        .createEvent(req.body)
        .then(result => { return res.json(result) })
}

const joinEvent = (req, res) => {
    req.app
        .get('db')
        .joinEvent(req.body)
        .then(result => { 
            return res.json(result) 
        })
}

const leaveEvent = (req,res) => {
    console.log(req.body)
    req.app
        .get('db')
        .leaveEvent(req.body)
        .then(result => {
            return res.json(result)
        })
}

const getAttendingEvents = (req,res) => {
    req.app
        .get('db')
        .getAttendingEvents(req.params.id)
        .then(result => {
            return res.json(result)
        })
}


const getAllEvents = (req, res) => {
    req.app
        .get('db')
        .getAllEvents()
        .then(result => res.json(result))
        .catch(err => console.log(err, "get all event endpoint not working"));
}


const getEventById = (req, res) => {
    const { id } = req.params;
    req.app
        .get('db')
        .getEventById([id])
        .then(results => res.json(results))

}

const getEventByUserId = (req, res) => {

    req.app
        .get('db')
        .getEventByUserId([req.params.id])
        .then(results => res.status(200).json(results))
        .catch(err => console.log("get event by user id not working", err))
}

module.exports = {
    getAllEvents,
    getAttendingEvents,
    leaveEvent,
    getEventById,
    createEvent,
    joinEvent,
    getEventByUserId
}