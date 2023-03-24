import db from '../database/db.js';

export async function findUsersByUsername(username, client_id) {
  const result = await db.query(`SELECT users.id, users.avatar_url, users.name, followers.user_id as follows
  FROM users
  FULL JOIN followers ON followers.followed_id = users.id
  WHERE users.name ILIKE $1 AND (followers.user_id = $2 OR followers.user_id IS NULL);`,
  [`%${username}%`, client_id]);
  //console.log(client_id, result.rows)
  return result;
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

export async function verifyUserIdFollowOtherUser(userId, followUserId) {
  return await db.query('SELECT * FROM followers WHERE user_id = $1 AND followed_id = $2;', [
    userId,
    followUserId,
  ]);
}

export async function insertFollowUser(userId, followUserId) {
  return await db.query('INSERT INTO followers (user_id, followed_id) VALUES ($1, $2);', [
    userId,
    followUserId,
  ]);
}

export async function deleteFollowUserRepository(userId, followUserId) {
  return await db.query(
    `DELETE FROM followers WHERE user_id = ${userId} AND followed_id = ${followUserId};`
  );
}

export async function doesUserFollowsSomeone(userId){
  return await db.query(`
    SELECT * FROM followers
    WHERE user_id = $1
  `, [userId])
}