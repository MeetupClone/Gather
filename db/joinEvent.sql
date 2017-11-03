INSERT INTO events_members (event_id, user_id) VALUES ($1, $2)
RETURNING *;