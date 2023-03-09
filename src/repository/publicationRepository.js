import db from '../database/db.js';

export async function findUser(token) {
  const result = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
  return result;
}

export async function insertPosts(user, link, desc) {
  const result = await db.query(
    `INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3) RETURNING id`,
    [user, link, desc]
  );
  return result;
}

export async function findUltimoPostId() {
  const result = await db.query(`SELECT * FROM posts`);
  return result;
}

export async function insertHashtags(post, name) {
  const result = await db.query(`INSERT INTO hashtags (post_id, name) VALUES ($1, $2)`, [
    post,
    name,
  ]);
  return result;
}

export async function getPublications() {
  const result = await db.query(`
    SELECT json_build_object(
        'id', posts.id, 
        'name', users.name,
        'avatarImage', users.avatar_url, 
        'descriptionPost', posts.description, 
        'linkPost', posts.link,
        'hashtags', array_agg(json_build_object(
            'id', hashtags.id,
            'nameHashtag', hashtags.name
        ))
    )
    FROM users
    JOIN posts
    ON users.id = posts.user_id
    LEFT JOIN hashtags
    ON posts.id = hashtags.post_id
    GROUP BY users.id, posts.id
    ORDER BY posts.id DESC;`);

  return result;
}

export async function queryVerifyUserId(postId, userId) {
  return await db.query(
    `SELECT 
  posts.id AS "postId", 
  posts.user_id AS "userId",
  hashtags.id AS "hashtagId"   
  FROM posts 
  LEFT JOIN hashtags 
  ON posts.id = hashtags.post_id 
  WHERE posts.id = $1 and posts.user_id = $2;`,
    [postId, userId]
  );
}

export async function deleteHashtagByIdPost(postId) {
  return await db.query('DELETE FROM hashtags WHERE post_id = $1', [postId]);
}

export async function deletePostById(postId) {
  return await db.query('DELETE FROM posts WHERE id = $1', [postId]);
}

export async function updatePostByid(description, postId) {
  return await db.query('UPDATE posts SET description=$1 WHERE id = $2;', [description, postId]);
}
