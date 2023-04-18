const db = require('../model')
const axios = require('axios').default
const bcrypt = require('bcrypt')

export const registerStudent = async (req , res) => {
    const {fullname ,studentID , email, dateofbirth, department, phone_number} = req.body
    const roles = await db.role.findAll()
    const data = {
        fullname: fullname , 
        studentID : studentID , 
        email :email, 
        date_of_birth:dateofbirth , 
        role_id: roles.find(({role}) => role === 'student').role_id,
        department:department , 
        phone_number:phone_number,
        password: ""
    }
    const randomgeneratepassword = (length) => {
        let result = ''
        const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

        for(let i = 0; i<length; i ++){
            result += character.charAt(Math.floor(Math.random() * character.length))
        }
        return result
    }
    const salt = await bcrypt.genSalt(10)
    const password = randomgeneratepassword(10)
    const hashedPassword = await bcrypt.hash(password , salt)
        data.password = hashedPassword
        db.student.create(data).then(result => {
            res.status(200).send({message: "Student Registered" , password: password})
        }).catch(err => {
            return res.status(500).send(err)
        })
        
    


}

export const scanEntry = (req ,res) => {
    const {url} = req.body
    const id = url.replace("https://my.paragoniu.edu.kh/qr?student_id=","")
    axios({
        method: 'GET',
        url: `https://my.paragoniu.edu.kh/api/anonymous/students/${id}`,
    
    }).then(response => {
        const data = response.data.data
        const date = new Date()
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
            (currentDate.getMonth() + 1).toString().padStart(2, '0')
          }/${currentDate.getFullYear()}`;
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${
            currentDate.getMinutes().toString().padStart(2, '0')
          }:${currentDate.getSeconds().toString().padStart(2, '0')}`;
          
        db.library_entry.create({
            studentID: data.id_number,
            entry_date: `${formattedDate} ${formattedTime}`
        }).then(() => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
        
    }).catch(err=> res.status(500).send(err))

}
export const getStudentEntry = (req ,res) => {
    //studentID , studentName, department, email, dateofentry, countofentry


}

