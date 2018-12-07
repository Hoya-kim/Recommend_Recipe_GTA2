'use strict'

const express = require('express')
const router = express.Router()
const User = require('./user')
const Ingredient = require('./ingredient')

router.use('/user', User)
router.use('/ingredient', Ingredient)

module.exports = router