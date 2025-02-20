const jwt = require('jsonwebtoken')
function authTokenMiddleware(req, res, next){

    const authHeader = req.headers['authorization']

    console.log(authHeader)
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

        console.log("TESTING MIDDLE", user, user.id, req.id)
        next()
    })

}

module.exports = authTokenMiddleware