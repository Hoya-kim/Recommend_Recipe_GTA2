const pool = require('../../util/mysqlObj')

exports.IngredientCreate = (req, res) => {
    const name = req.body.name
    const category = req.body.category


    // 1. Query Check
    const QueryCheck = () => {
        if (!category || !name) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query('INSERT INTO INGREDIENT(NAME, CATEGORY) VALUES (?, ?)', [name, category])
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