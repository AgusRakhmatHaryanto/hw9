const { Movies } = require('../models');



// GET: Mendapatkan daftar film
const getMovie = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.page ? (req.query.page - 1) * limit : 0;

        const movies = await Movies.findAll({
            limit,
            offset,
            order: [['id', 'ASC']],
        });

        res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan dalam permintaan Database" });
    }
};


// GET: Mendapatkan daftar film
const getMovies = async (req, res) => {
    try {
        
        const movies = await Movies.findAll();

        res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan dalam permintaan Database" });
    }
};

// POST: Menambahkan film baru
const addMovie = async (req, res) => {
    try {
        const { title, genres, year } = req.body;
        console.log("Data yang diterima:", req.body);

        const movie = await Movies.create({
            title,
            genres,
            year
        });

        res.status(201).json(movie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan dalam permintaan Database" });
    }
};

// PUT: Memperbarui informasi film berdasarkan ID
const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const { title, genres, year } = req.body;

        const movie = await Movies.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ error: "Film tidak ditemukan" });
        }

        movie.title = title;
        movie.genres = genres;
        movie.year = year;
        await movie.save();

        res.status(200).json(movie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan dalam permintaan Database" });
    }
};

// DELETE: Menghapus film berdasarkan ID
const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movies.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ error: "Film tidak ditemukan" });
        }

        await movie.destroy();
        res.status(204).send(); // Mengembalikan respons tanpa konten
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan dalam permintaan Database" });
    }
};

module.exports = {
    getMovie,
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    
};
