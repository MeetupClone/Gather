
const getAllEvents = (req, res) => {
	req.app
    .get('db')
    .getAllEvents()
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err, "not working WHY"));
}

module.exports = {
    getAllEvents
}