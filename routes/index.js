const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Welcome']
    res.send('Welcome to the National Parks and Activities API');
});

router.use('/parks', require('./parks'));
router.use('/activities', require('./activities'));

module.exports = router;