const express = require("express");
const pool = require("../queries.js");
const router = express.Router();
const auth = require("../auth.js");

router.post("/register", (req, res) => {
  const { email, gender, password, role } = req.body;
  pool.query(
    "INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, gender, password, role],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam pendaftaran pengguna" });
        return;
      }
      const user = result.rows[0];
      const token = auth.signToken(user);
      res.status(201).json({ user, token });
    }
  );
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Terjadi kesalahan dalam masuk pengguna' });
          return;
        }
        const user = result.rows[0];
        if (!user) {
          res.status(401).json({ error: 'Email atau kata sandi tidak valid' });
          return;
        }
        const token = auth.signToken(user);
        res.status(200).json({ user, token });
      }
    );
  });
  

router.get("/users", (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.page ? (req.query.page - 1) * limit : 0;

  pool.query(
    "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
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

router.post("/users", (req, res) => {
  const { email, gender, password, role } = req.body;
  pool.query(
    "INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, gender, password, role],
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

router.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { email, gender, password, role } = req.body;
  pool.query(
    "UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
    [email, gender, password, role, userId],
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

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  pool.query("DELETE FROM users WHERE id = $1", [userId], (err) => {
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
