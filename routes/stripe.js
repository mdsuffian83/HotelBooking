import express from 'express';

const router = express.Router();

// middleware
import { requireSignin } from '../middlewares/index.js';
// controllers
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
} from '../controllers/stripe.js';

router.post('/create-connect-account', requireSignin, createConnectAccount);
router.post('/get-account-status', requireSignin, getAccountStatus);
router.post('/get-account-balance', requireSignin, getAccountBalance);
router.post('/payout-setting', requireSignin, payoutSetting);
router.post('/stripe-session-id', requireSignin, stripeSessionId);

export default router;
