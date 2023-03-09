import db from "../database/db";

export async function getTrendings(){
	return await db.query.apply(`
		SELECT * FROM 
	`);
}