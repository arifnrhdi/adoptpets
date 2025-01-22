import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  const existingUser = await Auth.findOne({ where: { email: email } });
  if (existingUser) return res.status(400).json({ msg: "Email sudah digunakan" });
  if (password.length < 8) return res.status(400).json({ msg: "Masukkan Password Minimal 8 Karakter!" });
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Konfirmasi Password Tidak Sesuai" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Auth.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Register berhasil!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res) => {
  const user = await Auth.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Pikun anda aowoakwok" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  res.status(200).json({ uuid, name, email });
};

export const Me = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ msg: "Mohon Login Ke Akun Anda!" });
  const user = await Auth.findOne({
    attributes: ["uuid", "name", "email", "createdAt", "updatedAt"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak Dapat Log Out" });
    res.status(200).json({ msg: "Berhasil Log Out" });
  });
};
