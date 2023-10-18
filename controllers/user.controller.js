const { Users } = require("../models");


// GET: Mendapatkan daftar film
const getUser = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.page ? (req.query.page - 1) * limit : 0;

    const user = await Users.findAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam permintaan Database" });
  }
};

// GET: Mendapatkan daftar film
const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam permintaan Database" });
  }
};

// POST: Menambahkan film baru
const addUser = async (req, res) => {
  try {
    console.log("Data yang diterima:", req.body);

    const { email, gender, password, role } = req.body;

    const user = await Users.create({
      email,
      gender,
      password,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam permintaan Database" });
  }
};

// PUT: Memperbarui informasi film berdasarkan ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, gender, password, role } = req.body;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Film tidak ditemukan" });
    }

    user.email = email;
    user.gender = gender;
    user.password = password;
    user.role = role;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam permintaan Database" });
  }
};

// DELETE: Menghapus film berdasarkan ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Movies.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Film tidak ditemukan" });
    }

    await user.destroy();
    res.status(204).send(); // Mengembalikan respons tanpa konten
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam permintaan Database" });
  }
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
