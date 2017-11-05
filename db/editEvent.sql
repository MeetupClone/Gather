UPDATE events SET description = ${eventDescription}, title = ${eventName}, event_date = ${eventDate}, event_image = ${eventPic}, cron_time=${cronTime} WHERE id = ${id};
