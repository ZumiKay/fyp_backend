const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const Router = require('./Routes/route')
const db = require('./model')
const { initalrole } = require('./config/config')



require('dotenv').config()
//middleware
app.use(cors({
    origin:"*"
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.text())
app.use(express.query())
app.use(helmet())


//
app.use("/api" , Router)


db.sequelize.sync()
.then(() => {
    console.log("Syned DB")
    initalrole(db.role , db.book)
    
})
.catch((err) => console.log("Error: " , err))

app.listen(process.env.PORT , console.log("Server is running on port" , process.env.PORT))



