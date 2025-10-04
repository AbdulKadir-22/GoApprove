const express = require('express');
const router = express.Router();

// const requireAuth = require('../middlewares/auth.middleware');
// const { loginUser, signupUser, getProfile } = require('../controllers/User');
const { getImageKitAuth ,loginUser, signupUser, getProfile} = require('../controllers/User');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/imagekit-auth', getImageKitAuth);


module.exports =  router;