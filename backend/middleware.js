const jwt = require('jsonwebtoken')
function authTokenMiddleware(req, res, next){

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403)
        }
        req.id = user.id
        req.username = user.username

        next()
    })

}

module.exports = authTokenMiddleware