const Ad = require('../models/ad.model')

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find({}));
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const ad = await Ad.findOne(req.params.id)
        if(!ad) res.status(500).json({message: 'Not Found'});
        else res.json(ad)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
};

exports.addAd = async (req, res) => {
    try {
        const { title, content, date, photo, price, loc, user } = req.body;
        const newAd = new Ad({ title: title, content: content, date: date, photo: photo, price: price, loc: loc, user: user });
        await newAd.save();
        res.json({ message: 'OK!'});
    } 
    catch(err) {
        res.status(500).json({message: err.message})
    }
}
exports.editAd= async (req, res) => {
    const { title, content, date, photo, price, loc, user } = req.body;
    try {
      const ad = await Ad.findById(req.params.id);
      if(Ad) {
        await Ad.updateOne({ _id: req.params.id }, { $set: { title: title, content: content, date: date, photo: photo, price: price, loc: loc, user: user }});
        res.json(ad);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.delete = async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id);
      if(ad) {
        ad.remove()
        res.json(ad)
      }
      else res.status(404).json({ message: 'NotFound...' })
    }
    catch(err) {
      res.status(505).json({ message: err.message })
    }
  };