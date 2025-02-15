import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await Auth.findAll({
      attributes: ["uuid", "name", "email", "createdAt", "updatedAt"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Auth.findOne({
      attributes: ["uuid", "name", "email", "createdAt", "updatedAt"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Auth.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, confPassword } = req.body;
  let hashPassword;
  if (password == "" || password == null) {
    hashPassword = user.password;
  } else {
    const salt = await bcrypt.genSalt();
    hashPassword = await bcrypt.hash(password, salt);
  }
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Konfirmasi Password Tidak Sesuai" });
  try {
    await Auth.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Berhasil Di Update!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Auth.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Auth.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Berhasil Di Delete!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
