UPDATE user_preferences 
    SET preference_settings = $1
    WHERE userid = $2
    RETURNING *;