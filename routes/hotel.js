import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import { requireSignin, hotelOwner } from '../middlewares/index.js';

// controllers
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  update,
} from '../controllers/hotel.js';

router.post('/create-hotel', requireSignin, formidable(), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image);
router.get('/seller-hotels', requireSignin, sellerHotels);
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, remove);
router.get('/hotel/:hotelId', read);
router.put(
  '/update-hotel/:hotelId',
  requireSignin,
  hotelOwner, // only hotelOwner can update
  formidable(), // middleware for forms
  update
);

export default router;
