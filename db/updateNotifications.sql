UPDATE user_preferences 
    SET notification_settings = $1
    WHERE userid = $2
    RETURNING *;