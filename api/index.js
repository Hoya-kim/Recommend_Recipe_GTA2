'use strict'

const express = require('express')
const router = express.Router()
const User = require('./user')
const Ingredient = require('./ingredient')
const Refrigerator = require('./refrigerator')
const Food = require('./food')

router.use('/user', User)
router.use('/ingredient', Ingredient)
router.use('/refrigerator', Refrigerator)
router.use('/food', Food)

module.exports = router