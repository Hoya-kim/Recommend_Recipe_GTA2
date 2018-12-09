const pool = require('../../util/mysqlObj')

exports.FoodLookup = (req, res) => {
    const foodId = req.params.foodId

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
        return pool.query(`SELECT u.id uid, u.userid, u.name, u.email, f.id foodid, f.name, f.category, f.image, f.description FROM FOOD f, USER u WHERE f.ID = ? AND ifnull(f.userid, 1) = u.id`, [foodId])
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