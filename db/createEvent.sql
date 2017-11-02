
INSERT INTO events (
                    event_image,
                    title,
                    description,
                    location,
                    category)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
