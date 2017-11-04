SELECT groups.name, groups.id, groups.category, groups.description, groups.website, groups.twitter, groups.instagram, groups.facebook, groups.group_picture, COUNT(groups_members.user_id) as number_of_members
    FROM groups
    JOIN groups_members ON groups.id = groups_members.group_id
    GROUP BY groups.name, groups.id, groups.category, groups.description, groups.website, groups.twitter, groups.instagram, groups.facebook, groups.group_picture;