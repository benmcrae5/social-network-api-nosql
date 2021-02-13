//index.js for the api folder
const router = require('express').Router();

const userRoutes = require('./user-rt');
const thoughtRoutes = require('./thought-rt');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
