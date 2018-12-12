const pool = require('../../util/mysqlObj')

exports.FoodRecipe = (req, res) => {
    const foodId = req.query.foodId

    // 1. Query Check
    const QueryCheck = () => {
        if (!foodId) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query('SELECT I.ID, I.NAME, I.CATEGORY FROM INGREDIENT I, RECIPE R WHERE R.FOOD = 25 and R.IC = I.ID', [foodId])
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