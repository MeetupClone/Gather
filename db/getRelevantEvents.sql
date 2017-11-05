select * from events
  JOIN user_categories ON events.category = user_categories.category
  WHERE user_categories.user_id = $1