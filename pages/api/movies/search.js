/**
* @swagger
* /api/movies/search:
* get:
* description: Endpoint which return the filtered part of movies to display
* parameters:
* - in: query
* name: sortByTitle
* required: false
* type: string
* description: Type of sorting to use on movies list
* - in: query
* name: page
* required: true
* type: integer
* description: Number of current page to display on movies list
*/
export default async function handler(req, res) {

    const queryParams = req.query;
    if (queryParams) {
    // Here your DB access and your ressource manipulation logic
    res.json({ status: 200, data: {message: "Success"} });
    }
    else {
    res.json({ status: 400, data: {message: "Error"} });
    }
    
}    