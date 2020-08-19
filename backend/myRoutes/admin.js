const router = require('express').Router();
const verify = require('../routeAuth')

router.get('/', verify , (req, res) => {
    res.json({
        posts: {
            title: 'Testing post',
            description: 'Secret infomation you access with credentials'
        }
    });
} );

module.exports = router;