import { getTrendings_rep, getByHashtag_rep } from "../repository/hashtags.repository.js"

export async function getTrendings(req, res){
	try {
		const results = await getTrendings_rep()
	return res.status(200).send(results.rows)
	} catch (error) {
		res.status(500).send(error.message)
	}

}

export async function getByHashtag(req, res){
	try {
		const result = await getByHashtag_rep(req.params.hashtag);

		const body = result.rows.map((item) => {
		  if (item.json_build_object.idUsersLike[0].id === null) {
			item.json_build_object.idUsersLike = [];
		  }
		  return item.json_build_object;
		});
	
		res.status(200).send(body);
	} catch (error) {
		res.status(500).send(error.message)
	}
	
}