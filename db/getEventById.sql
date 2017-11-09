SELECT *, COUNT(events_members.user_id) as members FROM events
  JOIN events_members ON events_members.event_id = events.id
  WHERE events.id = $1
  GROUP BY events.id, events_members.id;

    