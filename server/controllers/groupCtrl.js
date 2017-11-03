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
    console.log(req.body)
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

const createGroup = (req, res) => {
    const { name, category, description, website, twitter, facebook, instagram, uid } = req.body
    req.app
        .get('db')
        .createGroup([name, category, description, website, twitter, facebook, instagram, uid])
        .then(result => {
            return res.json(result)
        })
}

const getGroupMembers = (req, res) => {

    const { ID, GROUPID} = req.body

}

module.exports = {
    getGroupById,
    joinGroup,
    leaveGroup,
    getUsersGroups,
    createGroup,
    getAllGroups
}