const authModel = require("../models/authModel")


async function register(req, res) {
    try {
        console.log(req.body)
        const {username , password} = req.body

        if (!username || !password) {
            return res.json({
                message: "Username and password are required."
            });
        }

        const register = await authModel.register(username, password)
        
        return res.json({
            message: register.message,
            token: register.token
        })
        
    } catch (error) {
        return res.json({
            message: "Username already in use"
        })
    }
}

async function login(req, res) {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.json({
                message: "Username and password are required."
            });
        }
        const login = await authModel.login(username,password)

        return res.json({
            message: login.message,
            token: login.token
        })

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

module.exports = {register, login}