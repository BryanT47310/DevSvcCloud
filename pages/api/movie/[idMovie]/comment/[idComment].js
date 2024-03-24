import {GetComment, updateComment, deleteComment} from "../../../../../public/utils/comments";
import {GetMovie} from "../../../../../public/utils/movies";

export default async function handler(req, res) {
    const { idMovie, idComment } = req.query;

    const movie = await GetMovie(idMovie);
    if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
    }

    switch (req.method) {
        // Récupérer un commentaire spécifique --> movie : 573a1390f29313caabcd4eaf --> comment : 5a9427648b0beebeb6957a22
        case "GET":
            try {
                const comment = await GetComment(idMovie, idComment);
                if (!comment) {
                    return res.status(404).json({ message: "Commentaire non trouvé"});
                }
                res.status(200).json(comment);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break; 

        // Mettre à jour un commentaire spécifique
        case "PUT":
            try {
                const { text } = req.query;
                if (!text) {
                    return res.status(400).json({ message: "Le texte du commentaire est requis" });
                }
                await updateComment(idMovie, idComment, text);
                res.status(200).json({ message: "Commentaire mis à jour avec succès" });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        // Supprimer un commentaire spécifique
        case "DELETE":
            try {
                await deleteComment(idMovie,idComment);
                res.status(200).json({ message: "Commentaire supprimé avec succès" });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        default:
            res.status(405).json({ message: "Méthode non autorisée" });
    }
}
