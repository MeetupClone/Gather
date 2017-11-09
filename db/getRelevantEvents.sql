  SELECT * FROM user_categories
  JOIN category_events ON user_categories.category = category_events.category_name
  JOIN events ON events.id = category_events.event_id
  WHERE user_categories.user_id != events.organizer_uid

  
  
  -- id of the event
  -- userid