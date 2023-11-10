const router = require('express').Router();
const { signUp, signIn } = require('../controllers/userControllers');

router.route('/sign-up')
            .post(signUp);

router.route('/sign-in')            
            .post(signIn);

module.exports = router;