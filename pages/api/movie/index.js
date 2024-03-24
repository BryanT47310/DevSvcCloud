import {insertMovie} from "../../../public/utils/movies"

export default async function handler(req, res){
    if(req.method !=='POST'){
        return res.status(405).end('Method ${req.method} Not Allowed');
    }

try{
    const { title, director, year } = req.query;
const movie = await insertMovie(title, director,year);
res.status(201).json(movie);
}catch(error){
    res.status(500).json({message: error.message});
}
}