const createEvent = (req, res) => {

const { category, eventName, eventPic, location, description} = req.body


  req.app
  .get('db')
  .createEvent([eventPic, eventName, description, location, category])
  .then(results => res.status(200).json(results))
  .catch(err => console.log("create event endpoint not working", err));

}
  module.exports = {
    createEvent
  }
