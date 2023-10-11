const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.register = async (req, res) => {
  try {
    const { login, password, tel } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
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
        res.status(400).json({ message: "Login or password are incorrect" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
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
  if (req.session.login) {
    try {
      const user = await User.findOne({ login: req.session.login });
      if (user) {
        const userData = { login: user.login, _id: user._id };
        res.send(userData);
      } else {
        res.status(404).send({ message: "3User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).send({ message: "You are not authorized " });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: "Logout successful" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
