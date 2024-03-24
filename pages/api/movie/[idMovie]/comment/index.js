import clientPromise from "../../../../../lib/mongodb";
import {insertComment} from "../../../../../public/utils/comments";

/**
* @swagger
* /api/movies/addComment:
* post:
* requestBody:
* description: Endpoint for adding an comment from a user on a specific movie.
* content:
* application/x-www-form-urlencoded:
* schema:
* type: object
* required:
* - idUser
* - idMovie
* - comment
* properties:
* idUser:
* type: string
* description: user identity
* idMovie:
* type: string
* description: movie identity
* comment:
* type: string
* description: comment to post
* responses:
* 200:
* description: Success Response
* 400:
* description: Error Response
*/
export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const client = await clientPromise;
    const db = client.db('sample_mflix');

    try {
        const { idMovie, comment } = req.query;

        // Vérifier que le commentaire est fourni
        if (!comment) {
            return res.status(400).json({ message: "Le commentaire est requis" });
        }

        // Récupérer le commentaire inséré
        const insertedComment = await insertComment(idMovie,comment);

        res.status(201).json(insertedComment);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}
