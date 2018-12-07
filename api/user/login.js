const pool = require('../../util/mysqlObj')
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
        } else return Promise.resolve()
    }

    // 2. Login
    const Login = async () => {
        try{
            const connection = await pool.getConnection(async conn => conn)
            try{
                const [rows, fields] = await connection.query(
                    'SELECT USERID, NAME, EMAIL FROM USER WHERE USERID = ? AND PASSWORD = ?'
                    , [userId, MakePassword(password)])
                connection.release()
                req.session.uid = rows[0]['USERID']
                req.session.save()
                return res.status(200).json(rows[0])
            } catch(err) {
                console.log('Query Error')
                connection.release()
                return res.status(500).json(err)
            }
        } catch(err) {
            console.log('DB Error')
            return res.status(500).json(err)
        }
    }

    QueryCheck()
        .then(Login)
        .catch(err => {
            if (err) {
                return res.status(500).json(err.message || err)
            }
        })
}