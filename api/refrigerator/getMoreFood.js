const pool = require('../../util/mysqlObj')


exports.getMoreFood = (req, res) => {
    const userId = req.cookies.uid || req.body.userId

    // 1. Query Check
    const QueryCheck = () => {
        if (!userId) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query('SELECT * FROM FOOD WHERE ID IN (SELECT FOOD FROM RECIPE WHERE IC (SELECT IC FROM REFRIGERATOR WHERE ID = ?) GROUP BY FOOD HAVING (COUNT(*) + 1, FOOD) in (SELECT COUNT(*), FOOD FROM RECIPE GROUP BY FOOD))', [userId])
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