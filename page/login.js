const fs = require('fs')

exports.Login = (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile(__dirname + '/../public/login.html', (err, data)=>{
        if (err) {
            console.error(err)
            return res.status(500).json(err)
        }
        else res.end(data, 'utf-8')
    })
}