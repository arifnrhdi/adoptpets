import Auth from "../models/AuthModel.js";

export const verifyUser = async(req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ msg: "Mohon Login Ke Akun Anda!" });
    const user = await Auth.findOne({
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    req.userId = user.id;
    next();
}

