import db from "../database/db";

export async function getTrendings(){
	return await db.query(`
		SELECT hashtags.name FROM hashtags
		GROUP BY hashtags.name
		ORDER BY COUNT(hashtags.name) DESC
		LIMIT 10
		;
	`);
}

export async function getByHashtags(hashtag){
	return await db.query(`
		SELECT posts.id, posts. user_id, posts.link, posts.description, posts.created_at, posts.updated_at FROM posts
		JOIN hashtags ON hashtags.post_id = posts.id
		WHERE hashtags.name = '#hash9'
		ORDER BY posts.created_at DESC
		;
	`);
}