with rows as (
    INSERT INTO events (
                    event_image,
                    title,
                    description,
                    location,
                    organizer_uid,
                    event_date,
                    cron_time,
                    place_id)
VALUES (${eventPic}, ${eventName}, ${description}, ${location}, ${uid}, ${eventDate}, ${cronTime}, ${placeId}) 
RETURNING id, organizer_uid
)
INSERT INTO events_members (event_id, user_id) SELECT id, organizer_uid from rows;
SELECT id FROM events ORDER BY id DESC limit 1;
