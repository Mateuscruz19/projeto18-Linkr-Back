import db from '../database/db.js';

export async function findUsersByUsername(username) {
  return db.query(`SELECT id, avatar_url, name FROM users WHERE name ILIKE $1`, [`%${username}%`]);
}

export async function findUserById(id) {
  return db.query(`SELECT id, name, avatar_url FROM users WHERE id = $1`, [id]);
}

export async function findPublicationsByUserId(userId) {
  return await db.query(
    `
  SELECT json_build_object(
    'id', posts.id,
    'userId', users.id,
    'name', users.name,
    'avatarImage', users.avatar_url,
    'descriptionPost', posts.description,
    'linkPost', posts.link,
    'qtyLikesPost', COUNT(likes.id),
      'idUsersLike', array_agg(json_build_object(
      'id', likes.user_id
      )),
    'hashtags', array_agg(json_build_object(
        'id', hashtags.id,
        'nameHashtag', hashtags.name
    ))
  )
  FROM users
  LEFT JOIN posts
  ON users.id = posts.user_id
  LEFT JOIN hashtags
  ON posts.id = hashtags.post_id
  LEFT JOIN likes
  ON posts.id = likes.post_id
  WHERE users.id = $1
  GROUP BY users.id, posts.id
  ORDER BY posts.id DESC;
  `,
    [userId]
  );
}