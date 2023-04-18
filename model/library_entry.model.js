module.exports = (sequelize , Sequelize) => {
    const libraryentry = sequelize.define("library_entry" , {
        studentID:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        entry_date: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return libraryentry
}