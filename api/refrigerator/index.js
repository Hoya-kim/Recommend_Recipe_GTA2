'use strict'

const express = require('express')
const router = express.Router()
const insert = require('./insert')
const takeout = require('./takeout')
const open = require('./open')
const getFood = require('./getFood')
const getMoreFood = require('./getMoreFood')

router.post('/insert', insert.Insert)
router.post('/takeout', takeout.Takeout)
router.post('/open', open.Open)
router.post('/getFood', getFood.getFood)
router.post('/getMoreFood', getMoreFood.getMoreFood)

module.exports = router