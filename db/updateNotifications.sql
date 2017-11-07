UPDATE user_preferences 
    SET notification_settings = ${notifications} 
    WHERE userid = ${uid}
    RETURNING *;