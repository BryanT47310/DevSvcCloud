import { getMovies } from "../../public/utils/movies";

/**
* @swagger
* /api/movies:
* get:
* description: Returns movies
* responses:
* 200:
* description: Hello Movies
*/
export default async function handler(req, res) {
const movies = await getMovies();
res.json({ status: 200, data: movies });
}