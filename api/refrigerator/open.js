const pool = require('../../util/mysqlObj')

exports.Open = (req, res) => {
    const id = req.session.uid || req.body.id

    // 1. Query Check
    const QueryCheck = () => {
        if (!id) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query('SELECT I.ID, I.NAME, I.CATEGORY from REFRIGERATOR R, INGREDIENT I WHERE R.IC = I.ID AND R.ID = ?', [id])
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