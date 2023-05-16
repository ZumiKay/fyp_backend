import { dbconfig } from '../config/config.js'
import Sequelize from 'sequelize'

const sequelize = new Sequelize( dbconfig.db,dbconfig.user , dbconfig.password ,
    {
        host: dbconfig.host, 
        dialect: dbconfig.dialect,
    }
    )
const db ={}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.student = require('./students.model.js')(sequelize , Sequelize)
db.librarian = require('./librarian.model')(sequelize , Sequelize)
db.borrow_book = require('./borrow_book.model')(sequelize , Sequelize)
db.library_entry = require('./library_entry.model')(sequelize , Sequelize)
db.book = require('./book.model')(sequelize , Sequelize)
db.category = require('./categories.model')(sequelize , Sequelize)
db.role = require('./role.model')(sequelize , Sequelize)
db.headdepartment = require('./headdepartment.model.js')(sequelize, Sequelize)


//relationship
db.role.hasMany(db.librarian , {foreignKey: 'role_id'})
db.librarian.belongsTo(db.role , {foreignKey: 'role_id'})
db.role.hasMany(db.student , {foreignKey:'role_id'})
db.student.belongsTo(db.role ,{ foreignKey: 'role_id'})
db.role.hasMany(db.headdepartment , {foreignKey:'role_id'})
db.headdepartment.belongsTo(db.role ,{ foreignKey: 'role_id'})
db.student.hasMany(db.library_entry , {foreignKey: 'studentID'})
db.student.hasMany(db.borrow_book , {foreignKey:'studentID'})
db.borrow_book.belongsTo(db.student , {foreignKey: 'studentID'})


module.exports = db

