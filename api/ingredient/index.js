'use strict'

const express = require('express')
const router = express.Router()
const create = require('./create')
const search = require('./search')

router.post('/create', create.IngredientCreate)
router.post('/search', search.IngredientSearch)

module.exports = router