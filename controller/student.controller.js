
import { Op, or } from 'sequelize'
import { jwtconfig } from '../config/config'


const db = require('../model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Students = db.student
const refreshtoken = []
export const login = (req , res) => {
    const {email,studentID,password} = req.body
    const generateToken = (user) => {
        
        const accessToken = jwt.sign( {id: user.role_id , email: user.email} , jwtconfig.secret, {expiresIn:"10m"})
        const refreshToken = jwt.sign( {id: user.role_id , email: user.email}  , jwtconfig.secret , {expiresIn:"24h"})
        refreshtoken.push(refreshToken)
        return {accessToken , refreshToken}
    }
    
   Students.findOne(({
    where :{
        [Op.or]: {
            email: email,
            studentID: studentID
        }},
    include: [
        db.role
    ]
   })).then(async response => {
    const isMatch = await bcrypt.compare(password,response.password)
    if(isMatch) {
        const token =  generateToken(response)
        
        return res.status(200).json({user: {
            fullname: response.fullname,
            department: response.department,
            studentID: response.studentID,
            role: response.role.role

        } ,accessToken:token.accessToken , refreshToken:token.refreshToken})
    } else {
        return res.status(401).send({message:"Incorrect credential"})
    }

   })


}
export const refreshToken = (req , res) => {
    const {refreshToken} = req.body
    if(!refreshtoken.includes(refreshToken)) {
        return res.status(401).send({message:"Ivalid Request"})
    } else {
        jwt.verify(refreshToken , jwtconfig.secret , (err , decode) => {
            if (err) return res.status(401).send("Invalid Request Token")
            const accessToken = jwt.sign({id:  decode.id}, jwtconfig.secret , {expireIn:'10m'})
            res.status(200).json({accessToken})
        })
    }
}
export const logout = (req ,res) => {
    const {refreshToken} = req.body
    refreshtoken.filter((token) => token != refreshToken)
    res.sendStatus(204)
}
