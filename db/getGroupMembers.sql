SELECT * FROM groups_members 
    WHERE user_id = $1
    AND group_id = $2;