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
        return pool.query(`SELECT U.ID UID, U.USERID, U.NAME, U.EMAIL, F.ID FOODID, F.NAME, F.CATEGORY, F.IMAGE, F.DESCRIPTION FROM FOOD F, USER U WHERE F.ID = ? AND ifnull(F.USERID, 1) = U.ID`, [foodId])
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