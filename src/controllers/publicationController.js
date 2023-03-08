import { findUser, insertPosts, findUltimoPostId, insertHashtags, getPublications} from "../repository/publicationRepository.js";

export async function postPublication(req, res){
    const {link, description, name} = req.body;

    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try{
        const userExist = await findUser(token);

        if(!token || userExist.rowCount === 0){
            return res.sendStatus(401);
        };
        const ultimoPost = await findUltimoPostId()
       

        await insertPosts(userExist.rows[0].user_id, link, description);

        await insertHashtags(ultimoPost.rowCount, name);

        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
};

export async function getPublication(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try{
        const userExist = await findUser(token);

        if(!token || userExist.rowCount === 0){
            return res.sendStatus(401);
        };

        // const userId = await findPostUserId(userExist.rows[0].id);
        // const postId = await findHashtagsPostsId(userId.rows.id);

        const body = await getPublications();

        res.status(200).send(body.rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}