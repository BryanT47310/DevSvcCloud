import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function getComments(idMovie) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
    if (!movie) {
        return null;
    }
    
    const comments = await db.collection("comments").find({ movie_id: new ObjectId(idMovie) }).toArray();
    return comments;
}

export async function insertComment(idMovie, comment) {
    // Vérification des entrées de données
    if (!comment) {
        throw new Error('Title, director, and year are required');
    }

    // Insertion du film dans la base de données
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        // Insérer le commentaire dans la collection de commentaires
        const result = await db.collection('comments').insertOne({
            movie_id: idMovie,
            comment: comment
        });

        // Récupérer le commentaire inséré
        const insertedComment = await db.collection('comments').findOne({ _id: result.insertedId });

        return insertedComment;
    } catch (error) {
        throw new Error('Failed to insert movie: ' + error.message);
    }
}

export async function GetComment(idMovie, idComment){
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const comment = await db.collection("comments").findOne({ _id: new ObjectId(idComment), movie_id: new ObjectId(idMovie) });
    return comment;
}

export async function updateComment(idMovie,idComment, text) {
    // Vérification des entrées de données
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        await db.collection("comments").updateOne({ _id: new ObjectId(idComment), movie_id: new ObjectId(idMovie) }, { $set: { text } });

    } catch (error) {
        throw new Error('Failed to insert movie: ' + error.message);
    }
}

export async function deleteComment(idMovie, idComment) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    await db.collection("comments").deleteOne({ _id: new ObjectId(idComment), movie_id: new ObjectId(idMovie) });
    const commentdel = await db.collection("comments").findOne({_id: new ObjectId(idComment)});
return commentdel;
}




