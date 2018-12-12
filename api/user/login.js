const conn = require('../../util/mysqlObj')
const MakePassword = require('../../util/password').MakePassword

exports.Login = (req, res) => {
    const userId = req.body.userId
    const password = req.body.password

    // 1. Query Check
    const QueryCheck = () => {
        if (!userId || !password) {
            return Promise.reject({
                message: 'Query Error'
            })
        } else return conn
    }

    // 2. Login
    const Login = (conn) => {
        return conn.query('SELECT ID, USERID, NAME, EMAIL FROM USER WHERE USERID = ? AND PASSWORD = ?;', [userId, MakePassword(password)])
    }

    // 3. Response
    const Response = ([rows, fields]) => {
        if (!rows)
            return Promise.reject({
                message: 'User Not Match'
            })
        rows = (JSON.parse(JSON.stringify(rows)))
        res.cookie('uid', rows.ID)
        return res.status(200).json(rows)
    }

    QueryCheck()
        .then(Login)
        .then(Response)
        .catch(err => {
            if (err) {
                return res.status(500).json(err.message || err)
            }
        })
}