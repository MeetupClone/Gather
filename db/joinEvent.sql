INSERT INTO events_members (event_id, user_id) VALUES (${eventId}, ${uid});
SELECT * FROM events 
	JOIN events_members ON events.id = events_members.event_id
	JOIN users ON users.uid = events_members.user_id
	WHERE events.id = ${eventId} AND user_id = ${uid};
;