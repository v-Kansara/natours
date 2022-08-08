const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccountMain);
router.get('/my-tours', authController.protect, viewController.getMyTours);
router.get(
  '/advanced-auth',
  authController.protect,
  viewController.getAccountAuth
);

router.get(
  '/receive-confirm-signup/:token',
  authController.protect,
  viewController.getConfirmSignup
);

router.get(
  '/forgot-password',
  authController.isLoggedIn,
  viewController.getPasswordForgotForm
);
router.get(
  '/reset-password/:token',
  authController.isLoggedIn,
  viewController.getPasswordResetForm
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
