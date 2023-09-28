const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.register = async (req, res) => {
  try {
    const { login, password, tel } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    console.log(req.file);
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType) &&
      tel &&
      typeof tel === "string"
    ) {
      const userWithLogin = await User.findOne({ login });

      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res
          .status(409)
          .send({ message: "User with this login already exists" });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        tel,
      });
      res.status(201).send({ message: "User created " + user.login });
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: "Login or password are incorrect" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res.status(200).send({ message: "Login successful " });
        } else {
          res.status(400).send({ message: "Login or password are incorrect" });
        }
      }
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (req.session) {
      res.json({ message: req.session.login });
    } else res.status(404).send({ message: "no session" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy;
};
