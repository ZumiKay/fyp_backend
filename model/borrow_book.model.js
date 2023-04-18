module.exports = (sequelize , Sequelize) => {
    const borrowbook = sequelize.define('borrow_books' , {
        ISBN: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        studentID: {
            type: Sequelize.INTEGER,
            primarykey: true
        },
        borrow_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        return_date:  {
            type: Sequelize.DATE,
            allowNull: true
        }
        
        
    })
    return borrowbook
}