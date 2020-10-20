module.exports = (Sequelize, sequelize) => {
    return sequelize.define('employee', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email:{
            type: Sequelize.STRING,
            allowNull: true
        }
    });
};
