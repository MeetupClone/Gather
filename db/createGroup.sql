WITH rows AS (INSERT INTO groups (name, category, description, website, twitter, facebook, instagram, group_owner_uid, group_picture) VALUES (${name}, ${category}, ${description}, ${website}, ${twitter}, ${facebook}, ${instagram}, ${uid}, ${groupPic}) RETURNING id, group_owner_uid) 
INSERT INTO groups_members (group_id, user_id) SELECT id, group_owner_uid FROM rows;
SELECT id FROM groups ORDER BY id DESC limit 1;