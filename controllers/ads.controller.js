const Ad = require("../models/ad.model");
const User = require("../models/user.model")
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}).populate("user"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("user");
    if (!ad) res.status(500).json({ message: "Not Found" });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAd = async (req, res) => {
  try {
    const { title, content, date, price, loc, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    const userId = await User.findOne({login: user})
    console.log(userId)
    if (
      title &&
      content &&
      date &&
      price &&
      loc &&
      user &&
      req.file &&
      ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(fileType)
    ) {
      
  
      const newAd = new Ad({
        title,
        content,
        date,
        photo: req.file.filename,
        price,
        loc,
        user: userId._id,
      });
      await newAd.save();
      res.json(newAd);
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editAd = async (req, res) => {
  try {
    const { title, content, date, price, loc, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";
    const userId = await User.findOne({login: user})
    if (title && content && date && price && loc && user) {
      const ad = await Ad.findById(req.params.id);
      if (ad) {
        if (
          req.file &&
          ["image/png", "image/jpeg", "image/gif"].includes(fileType)
        ) {
          await Ad.updateOne(
            { _id: req.params.id },
            {
              $set: {
                title,
                content,
                date,
                photo: req.file.filename,
                price,
                loc,
                user: userId._id,
              },
            }
          );
          fs.unlinkSync(`public/uploads/${ad.photo}`);
          const newAd = await Ad.findById(req.params.id);
          res.json(newAd);
        } else {
          await Ad.updateOne(
            { _id: req.params.id },
            { $set: { title, content, date, price, loc, user: userId._id, } }
          );
          const newAd = await Ad.findById(req.params.id);
          res.json(newAd);
        }
      } else {
        fs.unlinkSync(req.file.path);
        res.status(404).json({ message: "Not found..." });
      }
    } else {
      if (req.file) {
        fs.unlinkSync(req.file.path);
        res.status(400).send({ message: "Bad request" });
      } else res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    // console.log(ad)
    if (ad) {
      ad.remove();
      res.json(ad);
    } else res.status(404).json({ message: "NotFound..." });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
};

exports.searchAds = async (req, res) => {
  try {
    const regex = new RegExp(`.*${req.params.searchPhrase}.*`, "i");
    console.log(req.params.searchPhrase, regex);
    res.json(await Ad.find({ title: regex }));
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
