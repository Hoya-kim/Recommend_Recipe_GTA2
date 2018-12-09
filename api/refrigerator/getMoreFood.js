const pool = require('../../util/mysqlObj')

exports.getMoreFood = (req, res) => {
    const userId = req.session.uid || req.body.userId

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
        return pool.query('select * from food where id in (select food from recipe where ic in (select ic from refrigerator where id = ?) group by food having (count(*) + 1, food) in (select count(*), food from recipe group by food))', [userId])
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