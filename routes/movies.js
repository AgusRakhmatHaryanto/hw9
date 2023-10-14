const express = require("express");
const pool = require("../queries.js");
const router = express.Router();

router.get("/movies", (req, res) => {
  const limit = req.query.limit || 10; 
  const offset = req.query.page ? (req.query.page - 1) * limit : 0;

  pool.query(
    "SELECT * FROM movies ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam permintaan database" });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
});

router.post("/movies", (req, res) => {
  const { title, genres, year } = req.body;
  pool.query(
    "INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *",
    [title, genres, year],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam permintaan database" });
        return;
      }
      res.status(201).json(result.rows[0]);
    }
  );
});

router.put("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const { title, genres, year } = req.body;
  pool.query(
    "UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *",
    [title, genres, year, movieId],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam permintaan database" });
        return;
      }
      res.status(200).json(result.rows[0]);
    }
  );
});

router.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  pool.query("DELETE FROM movies WHERE id = $1", [movieId], (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam permintaan database" });
      return;
    }
    res.status(204).send();
  });
});


module.exports = router;
