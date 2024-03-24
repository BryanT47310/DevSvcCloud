import {getComments} from "../../../../public/utils/comments";

export default async function handler(req, res) {
    const { idMovie } = req.query;

    if (req.method === 'GET') {
        // Récupérer les commentaires du film
        try {
            const comments = getComments(idMovie);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 
}
