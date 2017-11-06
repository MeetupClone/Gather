DELETE FROM events WHERE id = ${id};
DELETE FROM events_members WHERE id = ${id};
DELETE FROM category_events WHERE id = ${id};