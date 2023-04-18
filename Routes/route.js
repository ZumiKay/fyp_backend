import { Router as _Router } from 'express'
import { registerStudent, scanEntry } from '../controller/librarian.controller'
import { validate_registerInput } from '../middleware/validate_data.middleware'
import { login, logout, refreshToken } from '../controller/student.controller'

const Router = _Router()


Router.get("/home" , (req , res) => {
    
    return res.status(200).send("Hello bitches")
})

//Authentication
Router.post('/register', validate_registerInput , registerStudent)
Router.post('/login' , login)
Router.post('/logout' , logout)
Router.post('/refreshtoken' , refreshToken)

//book

//Scan Entry
Router.post("/s_entry", scanEntry)

module.exports = Router
