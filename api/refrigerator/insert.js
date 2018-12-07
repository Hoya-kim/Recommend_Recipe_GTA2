const pool = require('../../util/mysqlObj')

exports.Insert = (req, res) => {
    const id = req.session.uid || req.body.id
    const ic = req.body.ic

    // 1. Query Check
    const QueryCheck = () => {
        if (!id || !ic) {
            return Promise.reject({
                message: 'Query Error'
            })
        }
        else return pool
    }

    // 2. SQL Start
    const SQLStart = (pool) => {
        return pool.query('INSERT INTO REFRIGERATOR(IC, ID) VALUES (?, ?)', [ic, id])
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