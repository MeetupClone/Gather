SELECT *, COUNT(groups_members.user_id) as members FROM groups
  JOIN groups_members ON groups_members.group_id = groups.id
  WHERE groups.id = $1
  GROUP BY groups.id, groups_members.id;
