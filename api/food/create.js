const pool = require('../../util/mysqlObj')
const sharp = require('sharp')
const path = require('path')
const AWS = require('aws-sdk')
const session=require('express-session')
const app=require('express')()

app.use(session({
    secret:process.env.SECRETKEY,
    resave:false,
    saveUninitialized:true,
    cookie: {secure:true}
}))

AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: process.env.region
})


exports.FoodCreate = (req, res) => {
    const name = req.body.name
    const category = req.body.category
    const userId = req.session.uid || req.body.userId
    const description = req.body.description
    let image = 'https://s3.ap-northeast-2.amazonaws.com/gta2-bucket/kisspng-computer-icons-food-tray-dish-plate-food-5b56a63e740866.5285988215324053104753.png'
    let ingredients = req.body.ingredients
    let temp


    // 1. Query Check
    const QueryCheck = () => {
        if (!category || !name || !userId || !description || !ingredients) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        try {
            ingredients = JSON.parse(ingredients)
        } catch (err){
            return Promise.reject(err)
        }

        return Promise.resolve()
    }

    // 2. Image Process
    const ImageProcess = async () => {
        if (req.file == null) {
            return pool
        }

        let file_location = 'images/'
        let origin_name = Date.now() + "_" + path.basename(req.file.originalname)

        let params = {
            Bucket: 'gta2-bucket',
            Key: file_location + origin_name,
            ACL: 'public-read'
        }

        let tempS3 = new AWS.S3()

        try {
            params.Body = await sharp(req.file.buffer).rotate().toFormat('jpeg').resize(512,512).toBuffer()
            let data = await tempS3.putObject(params).promise()
            image = 'https://s3.ap-northeast-2.amazonaws.com/gta2-bucket/images/' + origin_name
            return pool
        } catch(err){
            return Promise.reject(err)
        }

    }

    // 3. SQL Start
    const SQLStart = async (pool) => {
        try {
            let data = await pool.query('INSERT INTO FOOD(NAME, CATEGORY, USERID, IMAGE, DESCRIPTION) VALUES (?, ?, ?, ?, ?);', [name, category, userId, image, description])
            temp = data.insertId
            return Promise.resolve(pool)
        } catch(err) {
            return Promise.reject(err)
        }
    }

    // 4. SQL End
    const SQLEnd = async (pool) => {
        if (ingredients.length == 0){
            return Promise.reject({
                message: "No ingredients"
            })
        }
        let sql = 'INSERT INTO RECIPE(IC, FOOD) VALUES '
        for (let i = 0; i < ingredients.length; i++){
            sql += `(${ingredients[i]}, ${temp}), `
        }
        console.log(sql)
        sql = sql.substr(0, sql.length-2)

        return pool.query(sql)
    }
    // 4. Response
    const Response = (rows) => {
        return res.status(200).json(rows)
    }

    QueryCheck()
        .then(ImageProcess)
        .then(SQLStart)
        .then(SQLEnd)
        .then(Response)
        .catch(err => {
            if (err) {
                return res.status(500).json(err.message || err)
            }
        })
}