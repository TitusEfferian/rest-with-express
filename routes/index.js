var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.status(200).send({
        success: 'true',
        message: 'welcome to api haha'
    })
})

module.exports = router