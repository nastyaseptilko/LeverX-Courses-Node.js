module.exports = (Sequelize, sequelize) => {
    return sequelize.define('company_employee', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        id_employee: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_company: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        hours_job:{
            type: Sequelize.FLOAT
        },
        salary:{
            type: Sequelize.FLOAT
        },
        hire_date:{
            type: Sequelize.STRING
        }
    });
};
