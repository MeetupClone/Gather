with rows as (INSERT INTO events (
                    event_image,
                    title,
                    description,
                    location,
                    category, 
                    organizer_uid,
                    event_date,
                    cron_time,
                    place_id)

VALUES (${eventPic}, ${eventName}, ${description}, ${location}, ${category}, ${uid}, ${eventDate}, ${cronTime}, ${placeId}) 
RETURNING id, oragnizer_uid
)
INSERT INTO events_members (event_id, user_id) SELECT id, organizer_uid from rows;
