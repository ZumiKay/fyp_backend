module.exports =(sequelize , Sequelize) => {
    const Student = sequelize.define("students",{
      fullname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        studentID: {
            type: Sequelize.INTEGER,
            allowNull:false,
            unique: true
        },
        role_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        department: {
            type: Sequelize.STRING,
            allowNull:false
        },
        date_of_birth: {
            type: Sequelize.DATE,
            allowNull: true
        },
        phone_number: {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password:{
            type:Sequelize.STRING,
            allowNull: false
        },
        
    })

    return Student

} 