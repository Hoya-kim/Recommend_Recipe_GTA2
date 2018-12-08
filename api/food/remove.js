const pool = require('../../util/mysqlObj')

exports.FoodRemove = (req, res) => {
    const userId = req.session.uid || req.body.userId
    const foodId = req.body.foodId

    // 1. Query Check
    const QueryCheck = () => {
        if (!userId || !foodId) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query('DELETE FROM FOOD WHERE ID = ? and USERID = ?', [foodId, userId])
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