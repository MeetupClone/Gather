const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const path = require('path');
const { herokuDb } = require('./keys/config.js');

const port = 3002;

massive(herokuDb)
	.then(db => {
		app.set('db', db);
	})
	.catch(console.log);

const app = express();

app.use(json({ limit: '50mb' }));
app.use(express.static(`${__dirname}/../build`));

const userCtrl = require('./controllers/userCtrl');
app.post('/api/user/createUser', userCtrl.createUser);
app.put('/api/user/registerFCMKey', userCtrl.registerFCMKey);
app.get('/api/user/getUserInfo/:userId', userCtrl.getUserInfo);
app.post('/api/user/profile/update', userCtrl.updateUserProfile);
app.post('/api/user/updatenotifs', userCtrl.updateNotifications);
app.post('/api/user/updateprefs', userCtrl.updatePreferences);

app.get('/api/user/account/getPref/:id', userCtrl.getUserPreferences);
app.get('/api/user/account/getCat/:id', userCtrl.getUserCategories);

const utilCtrl = require('./controllers/utilCtrl');
app.post('/api/pictures/upload', utilCtrl.uploadPicture);

const eventCtrl = require('./controllers/eventCtrl');
app.post('/api/event/create', eventCtrl.createEvent);
app.post('/api/event/edit', eventCtrl.editEvent);
app.post('/api/event/join', eventCtrl.joinEvent);
app.post('/api/event/leave', eventCtrl.leaveEvent);
app.post('/api/event/delete', eventCtrl.deleteEvent);
app.get('/api/event/getAttendingEvents/:id', eventCtrl.getAttendingEvents);
app.get(
	'/api/event/getAttendingEventsData/:id',
	eventCtrl.getAttendingEventsData
);
app.get('/api/events', eventCtrl.getAllEvents);
app.get('/api/event/:id', eventCtrl.getEventById);
app.get('/api/event/user/:id', eventCtrl.getEventByUserId);
app.get('/api/relevant/event/:id', eventCtrl.getRelevantEvents);
app.get('/api/event/group/:id', eventCtrl.getEventsByGroupId);

const groupCtrl = require('./controllers/groupCtrl');
app.get('/api/group/:id', groupCtrl.getGroupById);
app.get('/api/groups', groupCtrl.getAllGroups);
app.get('/api/groups/getUsersGroups/:id', groupCtrl.getUsersGroups);
app.post('/api/groups/create', groupCtrl.createGroup);
app.get('/api/group/user/:id', groupCtrl.getGroupByUserId);
app.post('/api/group/join', groupCtrl.joinGroup);
app.post('/api/group/leave', groupCtrl.leaveGroup);
app.post('/api/group/edit', groupCtrl.editGroup);
app.post('/api/group/delete', groupCtrl.deleteGroup);
app.get('/api/group/owner/:id', groupCtrl.getGroupByOwner);

app.listen(port, () => {
	console.log(`Listening on ${port}.`);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});
