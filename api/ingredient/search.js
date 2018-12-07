const pool = require('../../util/mysqlObj')

exports.IngredientSearch = (req, res) => {
    const keyword = req.body.keyword

    // 1. Query Check
    const QueryCheck = () => {
        if (!keyword) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query(`SELECT * FROM INGREDIENT WHERE NAME LIKE '%${keyword}%'`)
    }

    // 3. Response
    const Response = (rows) => {
        return res.status(200).json(rows)
    }

    QueryCheck()
        .then(SQLStart)
        .then(Response)
        .catch(err => {
            if (err) {
                return res.status(500).json(err.message || err)
            }
        })
}