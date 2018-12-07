const conn = require('../../util/mysqlObj')
const MakePassword = require('../../util/password').MakePassword

exports.UserCreate = (req, res) => {
    const userId = req.body.userId
    const password = req.body.password
    const email = req.body.email
    const name = req.body.name

    // 1. Query Check
    const QueryCheck = () => {
        if (!userId || !password || !email || !name) {
            return Promise.reject({
                message: 'QueryError'
            })
        }
        else return conn
    }

    // 2. SQL Start
    const SQLStart = (conn) => {
        return conn.query('INSERT INTO USER(USERID, PASSWORD, EMAIL, NAME) VALUES(?, ?, ?, ?)', [userId, MakePassword(password), email, name])
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