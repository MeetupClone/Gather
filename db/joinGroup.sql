INSERT INTO groups_members (group_id, user_id) VALUES ($1, $2)
RETURNING *;