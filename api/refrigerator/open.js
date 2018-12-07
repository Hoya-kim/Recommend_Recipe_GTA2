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
        return pool.query('SELECT i.id, i.name, i.category from refrigerator r, ingredient i where r.ic = i.id and r.id = ?', [id])
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