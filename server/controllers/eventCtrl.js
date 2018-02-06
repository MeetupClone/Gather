const axios = require('axios');

const createEvent = (req, res) => {
    req.app
        .get('db')
        .createEvent(req.body)
        .then(result => {
            req.body.categories.map(x => {
                req.app
                    .get('db')
                    .insertEventCategories(result[0].id, x.toLowerCase(0));
            });
            return res.json(result);
        });
};

const joinEvent = (req, res) => {
    req.app
        .get('db')
        .joinEvent(req.body)
        .then(result => {
            let postUrl =
                'https://iid.googleapis.com/iid/v1/' +
                result[0].fcm_key +
                '/rel/topics/' +
                result[0].event_id;
            axios({
                method: 'post',
                url: postUrl,
                headers: {
                    'Content-Type': 'applicaton/json',
                    Authorization:
                        'key=AAAApU-NWw8:APA91bE3mN38UNc4kp2pFkJqNwBQ-C1RUxWHfRgdvTr8SN4L6NlOHRu74mIGrQWNdcI8MJopMmdmwC_PPNthcRxzbcJxKVd1yZu81qlIvILN6487N7EnFgP4ZUrkrkRLHtFLRtRL22JX',
                },
            });
            return res.json(result);
        });
};

const editEvent = (req, res) => {
    req.app
        .get('db')
        .editEvent(req.body)
        .then(result => {
            return res.json(result);
        });
};

const leaveEvent = (req, res) => {
    req.app
        .get('db')
        .leaveEvent(req.body)
        .then(result => {
            return res.json(result);
        });
};

const deleteEvent = (req, res) => {
    req.app
        .get('db')
        .deleteEvent(req.body)
        .then(result => {
            return res.json(result);
        });
};

const getAttendingEvents = (req, res) => {
    req.app
        .get('db')
        .getAttendingEvents(req.params.id)
        .then(result => {
            return res.json(result);
        });
};

const getAttendingEventsData = (req, res) => {
    req.app
        .get('db')
        .getAttendingEventsData(req.params.id)
        .then(result => {
            return res.json(result);
        });
};

const getAllEvents = (req, res) => {
    req.app
        .get('db')
        .getAllEvents()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err, 'get all event endpoint not working'));
};

const getEventById = (req, res) => {
    const { id } = req.params;
    req.app
        .get('db')
        .getEventById([id])
        .then(results => res.json(results));
};

const getEventByUserId = (req, res) => {
    req.app
        .get('db')
        .getEventByUserId([req.params.id])
        .then(results => res.status(200).json(results))
        .catch(err => console.log('get event by user id not working', err));
};

const getRelevantEvents = (req, res) => {
    req.app
        .get('db')
        .getRelevantEvents(req.params.id)
        .then(results => res.status(200).json(results))
        .catch(err => console.log('get relevant events not working', err));
};

const getEventsByGroupId = (req, res) => {
    req.app
        .get('db')
        .getEventsByGroupId(req.params.id)
        .then(results => res.status(200).json(results))
        .catch(err =>
            console.log('get events by group id endpoint not working', err)
        );
};

module.exports = {
    getAllEvents,
    getAttendingEvents,
    getAttendingEventsData,
    leaveEvent,
    deleteEvent,
    getEventById,
    createEvent,
    joinEvent,
    getEventByUserId,
    editEvent,
    getRelevantEvents,
    getEventsByGroupId,
};
