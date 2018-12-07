'use strict'

const express = require('express')
const router = express.Router()
const insert = require('./insert')
const takeout = require('./takeout')
const open = require('./open')

router.post('/insert', insert.Insert)
router.post('/takeout', takeout.Takeout)
router.post('/open', open.Open)

module.exports = router