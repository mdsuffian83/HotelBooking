import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import { requireSignin } from '../middlewares/index.js';

// controllers
import { create, hotels } from '../controllers/hotel.js';

router.post('/create-hotel', requireSignin, formidable(), create);
router.get('/hotels', hotels);

export default router;
