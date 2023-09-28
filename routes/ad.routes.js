const express = require("express");
const router = express.Router();
const AdController = require("../controllers/ads.controller");
const authMiddleware = require("../utils/authMiddleware");
const imageUpload = require("../utils/imageUpload");

router.get("/ads", AdController.getAll);

router.get("/ads:id", AdController.getById);

router.post(
  "/ads/",
  authMiddleware,
  imageUpload.single("photo"),
  AdController.addAd
);

router.put(
  "/ads/:id",
  authMiddleware,
  imageUpload.single("photo"),
  AdController.editAd
);

router.delete("/ads/:id", authMiddleware, AdController.delete);

router.get("/ads/search/:searchPhrase", AdController.searchAds);

module.exports = router;
