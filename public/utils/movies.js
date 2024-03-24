import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function getMovies() {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    return movies;
}

export async function insertMovie(title, director, year) {
    // Vérification des entrées de données
    if (!title || !director || !year) {
        throw new Error('Title, director, and year are required');
    }

    // Insertion du film dans la base de données
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const result = await db.collection('movies').insertOne({
            title: title,
            director: director,
            year: parseInt(year) 
        });

        // Utilisation de l'objet result pour obtenir les détails du film inséré
        const insertedMovie = {
            _id: result.insertedId,
            title: title,
            director: director,
            year: parseInt(year)
        };

        return insertedMovie;
    } catch (error) {
        throw new Error('Failed to insert movie: ' + error.message);
    }
}

export async function GetMovie(idMovie){
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movie = await db.collection("movies").findOne({_id: new ObjectId(idMovie)});
    return movie;
}

export async function updateMovie(idMovie, title, director, year) {
    // Vérification des entrées de données
    if (!title || !director || !year) {
        throw new Error('Title, director, and year are required');
    }

    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        await db.collection("movies").updateOne(
            { _id: new ObjectId(idMovie) },
            { $set: { title: title, director: director, year: parseInt(year) } }
        );

    } catch (error) {
        throw new Error('Failed to insert movie: ' + error.message);
    }
}

export async function deleteMovie(idMovie) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    await db.collection("movies").deleteOne({_id: new ObjectId(idMovie)});
    const moviedel = await db.collection("movies").findOne({_id: new ObjectId(idMovie)});
return moviedel;
}




