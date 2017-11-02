getGroupById = (req, res) => {

    const { id } = req.params;

    req.app
    .get('db')
    .getGroupById([id]).then(response => res.status(200).json(response))
    .catch(err => console.log("getGroupById error", err))
}

module.exports = {
    getGroupById
}