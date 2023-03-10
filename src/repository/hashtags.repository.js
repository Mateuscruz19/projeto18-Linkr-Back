import db from "../database/db.js";

export async function getTrendings_rep(){
	return await db.query(`
		SELECT hashtags.name FROM hashtags
		GROUP BY hashtags.name
		ORDER BY COUNT(hashtags.name) DESC
		LIMIT 10
		;
	`);
}

export async function getByHashtag_rep(hashtag){
	return await db.query(`
	SELECT
		posts.id,
		posts.link as "linkPost",
		posts.description as "descriptionPost",
		users.name as name,
		users.avatar_url as "avatarImage",
	COUNT(likes.id) as likes
	FROM posts
	JOIN hashtags ON hashtags.post_id = posts.id
	JOIN users ON users.id = posts.user_id
	FULL JOIN likes ON likes.post_id = posts.id
	WHERE hashtags.name = '#hash10'
	GROUP BY posts.id, users.name, users.avatar_url 
	ORDER BY posts.created_at DESC
	;
	`);
}