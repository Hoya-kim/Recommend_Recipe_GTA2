'use strict'

const express = require('express')
const router = express.Router()
const create = require('./create')
const remove = require('./remove')
const search = require('./search')
const lookup = require('./lookup')
const getRecipe = require('./getRecipe')
const upload = require('../../util/multer')

router.post('/create', upload.single('image'), create.FoodCreate)
router.post('/remove', remove.FoodRemove)
router.get('/search', search.FoodSearch)
router.get('/lookup', lookup.FoodLookup)
router.get('/getRecipe', getRecipe.FoodRecipe)

module.exports = router