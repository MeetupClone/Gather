const getGroupById = (req, res) => {
    const { id } = req.params;
    req.app
        .get('db')
        .getGroupById([id]).then(response => {
            return res.json(response)
        })
}

const getAllGroups = (req, res) => {
    req.app
        .get('db')
        .getAllGroups()
        .then(result => {
            return res.json(result)
        })
}

const getUsersGroups = (req, res) => {
    req.app
        .get('db')
        .getUsersGroups(req.params.id)
        .then(result => {
            return res.json(result)
        })
}

const leaveGroup = (req, res) => {
    req.app
        .get('db')
        .leaveGroup(req.body)
        .then(result => {
            return res.json(result)
        })
}

const joinGroup = (req, res) => {
    req.app
        .get('db')
        .joinGroup(req.body)
        .then(result => {
            return res.json(result)
        })
}

const editGroup = (req, res) => {
    req.app
        .get('db')
        .editGroup(req.body)
        .then(result => {
            return res.json(result)
        })
}

const deleteGroup = (req, res) => {
    req.app
        .get('db')
        .deleteGroup(req.body)
        .then(result => {
            return res.json(result)
        })
}

const createGroup = (req, res) => {
    req.app
        .get('db')
        .createGroup(req.body)
        .then(result => {
            req.body.categories.map(x => {
                x = x.toLowerCase();
                req.app.get('db').insertGroupCategories(result[0].id, x)
            })
        })
        .catch(err => console.log("create group not working", err));
}

const getGroupMembers = (req, res) => {
    const { ID, GROUPID } = req.body
}

const getGroupByUserId = (req, res) => {
    req.app
        .get('db')
        .getGroupByUserId(req.params.id)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => console.log("get group by user id not working", err))
}

const getGroupByOwner = (req, res) => {
    req.app
        .get('db')
        .getGroupByOwner(req.params.id)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => console.log("get group by owner enderpoint not working", err))
}

module.exports = {
    getGroupById,
    joinGroup,
    leaveGroup,
    getUsersGroups,
    createGroup,
    editGroup,
    deleteGroup,
    getAllGroups,
    getGroupByUserId,
    getGroupByOwner
}