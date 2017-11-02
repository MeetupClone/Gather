getGroupById = (req, res) => {

    const { id } = req.params;

    req.app
    .get('db')
    .getGroupById([id]).then(response => res.status(200).json(response))
    .catch(err => console.log("getGroupById error", err))
}

const createGroup = (req, res) => {
    const { name, category, description, website, twitter, facebook, instagram } = req.body

    req.app
    .get('db')
    .createGroup([name, category, description, website, twitter, facebook, instagram])
    .then(results => res.status(200).json(results))
    .catch(err => console.log("not working", err));
}

module.exports = {
    getGroupById,
    createGroup
}