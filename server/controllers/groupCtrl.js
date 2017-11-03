const getGroupById = (req, res) => {

    const { id } = req.params;

    req.app
        .get('db')
        .getGroupById([id]).then(response => res.status(200).json(response))
        .catch(err => console.log("getGroupById error", err))
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

module.exports = {
    getGroupById,
    createGroup
}