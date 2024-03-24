import {GetMovie, updateMovie, deleteMovie} from "../../../public/utils/movies"

/**
* @swagger
* /api/movies/{idMovie}:
* get:
* description: Endpoint which returns movie data
* parameters:
* - in: path
* name: idMovie
* required: true
* schema:
* type: string
* description: ID movie
* responses:
*   200:
*     description: Success Response
*   400:
*     description: Error Response
*/
export default async function handler(req, res)
{
    const {idMovie} = req.query;
    if (idMovie) {
    
        switch (req.method) {
            //AJOUTER --> dans index.js
            case "POST":
            break;
            //RECUPERER
            case "GET":
                const movie = await GetMovie(idMovie);
                res.json({ status: 200, data: {movie : movie} });
            break;
            //UPDATE
            case "PUT": 
            const { title, director, year } = req.query; 
            await updateMovie(idMovie, title, director, year)
            res.status(200).json({ status: 200, message: "Film mis à jour avec succès" });
            break;
            //EFFACER
            case "DELETE":
                const moviedel = await deleteMovie(idMovie);
                res.json({ status: 200, data: {movie : moviedel} });
            break;
            }
            res.json({ status: 200, data: {message: "Success"} });
        }
        else {
        res.json({ status: 400, data: {message: "Error"} });
        }
}

