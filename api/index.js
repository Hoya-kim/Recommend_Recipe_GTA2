'use strict'

const express = require('express')
const router = express.Router()
const User = require('./user')
const Ingredient = require('./ingredient')
const Refrigerator = require('./refrigerator')

router.use('/user', User)
router.use('/ingredient', Ingredient)
router.use('/refrigerator', Refrigerator)

module.exports = router