'use strict'

const express = require('express')
const router = express.Router()
const create = require('./create')

router.post('/create', create.IngredientCreate)

module.exports = router