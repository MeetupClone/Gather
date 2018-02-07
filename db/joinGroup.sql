INSERT INTO groups_members (group_id, user_id) VALUES (${groupid}, ${uid})
RETURNING *;