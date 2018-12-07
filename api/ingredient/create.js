const pool = require('../../util/mysqlObj')
const MakePassword = require('../../util/password').MakePassword

exports.IngredientCreate = (req, res) => {

    // 1. Query Check
    const QueryCheck = () => {
        if (!userId || !password || !email || !name) {
            return Promise.reject({
                message: 'QueryError'
            })
        }
        else return Promise.resolve()
    }

    // 2. SQL Start
    const SQLStart = async () => {
        try{
            const connection = await pool.getConnection(async conn => conn)
            try{
                const [rows] = await connection.query(
                    'INSERT INTO USER(USERID, PASSWORD, EMAIL, NAME) VALUES(?, ?, ?, ?)'
                    , [userId, MakePassword(password), email, name])
                connection.release()
                return res.status(200).json(rows)
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
        .then(SQLStart)
        .catch(err => {
            if (err) {
                return res.status(500).json(err.message || err)
            }
        })
}