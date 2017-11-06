SELECT notification_settings, preference_settings FROM user_preferences
    WHERE userid = $1;