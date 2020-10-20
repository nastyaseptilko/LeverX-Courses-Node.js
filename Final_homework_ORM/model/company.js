module.exports = (Sequelize, sequelize) => {
    return sequelize.define('company', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        company_role: {
            type: Sequelize.STRING,
             allowNull: true
        }
    });
};
