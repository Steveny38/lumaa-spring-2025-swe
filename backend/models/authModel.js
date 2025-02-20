const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function register(username, password){
    try {
        const userWithSameName = await pool.query('SELECT * FROM Users WHERE username = $1', [username])

        if(userWithSameName.rowCount > 0){
            throw new Error("Username already in use")
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        await pool.query('INSERT INTO Users (username, password) VALUES ($1, $2)',[username, hashedPassword] )

        const newUser = await pool.query('SELECT * FROM Users WHERE username = $1', [username])

        console.log(newUser)

        const token = jwt.sign({id: newUser.rows[0].id, username: newUser.rows[0].username}, process.env.JWT_SECRET, {expiresIn: '1hr'})
        return {
            message: "Register user successfull",
            token: token
        }


    
    } catch (error) {
        throw new Error(error)
    }

}

async function login(username, password){
    try {
        const userWithSameName = await pool.query('SELECT * FROM Users WHERE username = $1', [username])
        if(userWithSameName.rowCount === 0){
            throw new Error("No such user exists")
        }
        const hashedPassword = await userWithSameName.rows[0].password

        const match = await bcrypt.compare(password, hashedPassword)

        if(match){
            const token = jwt.sign({id: userWithSameName.rows[0].id, username: userWithSameName.rows[0].username}, process.env.JWT_SECRET, {expiresIn: '1hr'})
            
            return {
                message: "Login Successful",
                token: token,
            }
        }

        
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

module.exports = {register, login}