const getGroupById = (req, res) => {

    const { id } = req.params;

    req.app
        .get('db')
        .getGroupById([id]).then(response => res.status(200).json(response))
        .catch(err => console.log("getGroupById error", err))
}

const getAllGroups = (req, res) => {
    req.app
        .get('db')
        .getAllGroups()
        .then(results => res.json(results))
        .catch(err => console.log(err, "get all group endpoint not working"))

}

const createGroup = (req, res) => {
    const { name, category, description, website, twitter, facebook, instagram, uid } = req.body
    req.app
        .get('db')
        .createGroup([name, category, description, website, twitter, facebook, instagram, uid])
        .then(result => {
            return res.json(result)
        })
        .catch(err => console.log("not working", err));
}

const getGroupMembers = (req, res) => {

    const { ID, GROUPID} = req.body

}

module.exports = {
    getGroupById,
    createGroup,
    getAllGroups
}