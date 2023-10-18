/**
 * @swagger
 * components:
 *  schemas:
 *      Movies:
 *          type: object
 *          required:
 *              - title
 *              - genres
 *              - year
 *          properties: 
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the movie
 *              title:
 *                  type: string
 *                  description: The title of the movie
 *              genres:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: An array of movie genres
 *              year:
 *                  type: string
 *                  description: The year the movie was released
 *              createdAt:
 *                  type: string
 *                  format: date
 *                  description: The date and time when the movie was created
 *              updatedAt:
 *                  type: string
 *                  format: date
 *                  description: The date and time when the movie was last updated
 *          example:
 *              id: 1
 *              title: "Reckless"
 *              genres: ["Comedy", "Drama", "Romance"]
 *              year: 2001
 *              createdAt: "2023-10-16T23:07:28.378Z"
 *              updatedAt: "2023-10-16T23:07:28.378Z"
 */

const express = require("express");
const router = express.Router();
const movies = require("../controllers/movie.controller");

router.get("/movie", movies.getMovie);
router.get("/movies", movies.getMovies);
router.post("/movies", movies.addMovie);
router.put("/movies/:id", movies.updateMovie);
router.delete("/movies/:id", movies.deleteMovie);

module.exports = router;
