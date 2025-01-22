import Adopt from "../models/AdoptModel.js";
import Auth from "../models/AuthModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getAdopts = async (req, res) => {
  try {
    let response;
    response = await Adopt.findAll({
      attributes: ["uuid", "name", "petname", "gender", "age", "location", "image", "url", "contact", "createdAt", "updatedAt"],
      include: {
        model: Auth,
        attributes: ["name", "email", "createdAt", "updatedAt"],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdoptsByUser = async (req, res) => {
  try {
    const totalPets = await Adopt.count({
      where: {
        userId: req.userId,
      },
    });
    let response;
    response = await Adopt.findAll({
      attributes: ["uuid", "name", "petname", "gender", "age", "location", "image", "url", "contact", "createdAt", "updatedAt"],
      where: {
        userId: req.userId,
      },
      include: {
        model: Auth,
        attributes: ["name", "email", "createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ totalPets, response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdoptById = async (req, res) => {
  try {
    const response = await Adopt.findOne({
      attributes: ["uuid", "name", "petname", "gender", "age", "location", "image", "url", "contact"],
      where: {
        uuid: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAdopt = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "no file uploaded" });
  const { name, petName, gender, age, location, contact } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid image extension." });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Adopt.create({
        name: name,
        petname: petName,
        gender: gender,
        age: age,
        location: location,
        contact: contact,
        userId: req.userId,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Pet added successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateAdopt = async (req, res) => {
  const adopt = await Adopt.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!adopt) return res.status(404).json({ msg: "No Animal Found." });

  let fileName = adopt.image;

  if (req.files && req.files.file) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid image extension." });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${adopt.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { name, petName, gender, age, location, contact } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Adopt.update(
      {
        name: name,
        petname: petName,
        gender: gender,
        age: age,
        location: location,
        contact: contact,
        image: fileName,
        url: url,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Data Updated successfully." });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAdopt = async (req, res) => {
  const adopt = await Adopt.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!adopt) return res.status(404).json({ msg: "No Animal Found." });

  try {
    const filepath = `./public/images/${adopt.image}`;
    fs.unlinkSync(filepath);
    await Adopt.destroy({
      where: {
        [Op.and]: [{ id: adopt.id }, { userId: req.userId }],
      },
    });
    res.status(200).json({ msg: "Deletion Success." });
  } catch (error) {
    console.log(error.message);
  }
};
