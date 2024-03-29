import db from '../database/db.js';

export async function getTrendings_rep() {
  return await db.query(`
		SELECT hashtags.name FROM hashtags
		GROUP BY hashtags.name
		ORDER BY COUNT(hashtags.name) DESC
		LIMIT 10
		;
	`);
}

export async function getByHashtag_rep(hashtag) {
  return await db.query(`
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
	  JOIN posts
	  ON users.id = posts.user_id
	  LEFT JOIN hashtags
	  ON posts.id = hashtags.post_id
	  LEFT JOIN likes
	  ON posts.id = likes.post_id
		LEFT JOIN info_link_post
		ON posts.id = info_link_post.post_id
	  WHERE hashtags.name = '#${hashtag}'
	  GROUP BY users.id, posts.id, info_link_post.id
	  ORDER BY posts.id DESC;
	`);
}
