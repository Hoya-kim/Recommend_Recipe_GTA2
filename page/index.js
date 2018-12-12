'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const login = require('./login')

router.get('/', (req, res) =>  {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile(__dirname + '/../public/index.html', (err, data)=>{
        if (err) {
            console.error(err)
            return res.status(500).json(err)
        }
        else res.end(data, 'utf-8')
    })
})
router.get('/login', login.Login)


module.exports = router