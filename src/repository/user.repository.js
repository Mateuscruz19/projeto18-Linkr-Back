import db from "../database/db.js";

export async function findUsersByUsername(username, client_id) {
  const result = await db.query(
    `SELECT id, avatar_url, name, (id IN (SELECT "followed_id"
  FROM followers
  WHERE "user_id" = $2)) as follows
  FROM users
  WHERE users.name ILIKE $1;`,
    [`%${username}%`, client_id]
  );
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
    'titleLinkPost', info_link_post.title_link,
    'descriptionLinkPost', info_link_post.description_link,
    'imageLinkPost', info_link_post.image_link,
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
  LEFT JOIN info_link_post
  ON posts.id = info_link_post.post_id
  WHERE users.id = $1
  GROUP BY users.id, posts.id, info_link_post.id
  ORDER BY posts.id DESC;
  `,
    [userId]
  );
}

export async function verifyUserIdFollowOtherUser(userId, followUserId) {
  return await db.query(
    "SELECT * FROM followers WHERE user_id = $1 AND followed_id = $2;",
    [userId, followUserId]
  );
}

export async function insertFollowUser(userId, followUserId) {
  return await db.query(
    "INSERT INTO followers (user_id, followed_id) VALUES ($1, $2);",
    [userId, followUserId]
  );
}

export async function deleteFollowUserRepository(userId, followUserId) {
  return await db.query(
    `DELETE FROM followers WHERE user_id = ${userId} AND followed_id = ${followUserId};`
  );
}

export async function doesUserFollowsSomeone(userId) {
  return await db.query(
    `
    SELECT * FROM followers
    WHERE user_id = $1
  `,
    [userId]
  );
}
