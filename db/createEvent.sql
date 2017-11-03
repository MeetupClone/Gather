INSERT INTO events (
                    event_image,
                    title,
                    description,
                    location,
                    category, 
                    organizer_uid)
VALUES (${eventPic}, ${eventName}, ${description}, ${location}, ${category}, ${uid})