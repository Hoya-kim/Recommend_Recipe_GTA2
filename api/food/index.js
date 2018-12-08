'use strict'

const express = require('express')
const router = express.Router()
const create = require('./create')
const remove = require('./remove')
const search = require('./search')
const lookup = require('./lookup')
const upload = require('../../util/multer')

router.post('/create', upload.single('image'), create.FoodCreate)
router.post('/remove', remove.FoodRemove)
router.get('/search', search.FoodSearch)
router.post('/lookup', lookup.FoodLookup)

module.exports = router