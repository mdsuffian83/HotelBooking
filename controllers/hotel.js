import Hotel from '../models/hotel.js';
import fs from 'fs';

export const create = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;
    console.log('create=>', fields);
    console.log('create=>', fields.latLng);
    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;
    // handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    // Updated save() call without callback
    try {
      const result = await hotel.save();
      res.json(result);
    } catch (err) {
      console.log('saving hotel err => ', err);
      res.status(400).send('Error saving');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const hotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
  //   console.log(all);
  res.json(all);
};

export const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set('Content-Type', hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.user._id })
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
  // console.log(all);
  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select('-image.data')
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
  .populate('postedBy', '_id name')
    .select('-image.data')
    .exec();
  console.log('SINGLE HOTEL', hotel);
  res.json(hotel);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;
      fields.image = image;
    }
    // if (files.image) {
    //   hotel.image.data = fs.readFileSync(files.image.path);
    //   hotel.image.contentType = files.image.type;
    // }
    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, fields, {
      new: true,
    }).select('-image.data');
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send('Hotel update failed. Try again.');
  }
};
