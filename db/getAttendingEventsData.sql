select * from events
  JOIN events_members ON events_members.event_id = events.id
  WHERE events_members.user_id = $1;