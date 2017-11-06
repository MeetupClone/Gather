SELECT * FROM groups 
    JOIN groups_members ON groups.id = groups_members.group_id
    WHERE user_id = $1;