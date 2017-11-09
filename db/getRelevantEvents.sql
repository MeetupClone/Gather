SELECT * FROM events
  JOIN category_events ON events.id = category_events.event_id
  JOIN user_categories ON category_events.category_name = user_categories.category
  WHERE events.organizer_uid != $1

  
  
  -- id of the event
  -- userid