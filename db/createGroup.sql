
INSERT INTO groups (name, category, description, website, twitter, facebook, instagram, group_owner_uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;