const Sequelize = require('sequelize');

const config = require('./../config').db.mysql;

const sequelize = new Sequelize(config.db_name, config.username, config.password, config.options);

const company = require('./company')(Sequelize, sequelize);
const employee = require('./employee')(Sequelize, sequelize);
const company_employee = require('./company_employee')(Sequelize, sequelize);

company_employee.belongsTo(company, {foreignKey: 'id_company'});
company_employee.belongsTo(employee, {foreignKey: 'id_employee'});
company.hasMany(company_employee, {foreignKey: 'id_company'});
employee.hasMany(company_employee, {foreignKey: 'id_employee'});


module.exports = {
    Company: company,
    Employee: employee,
    Company_employee: company_employee,

    Sequelize: Sequelize,
    sequelize: sequelize
};

sequelize.sync({force: false})
    .then(loadData)
    .then(() => console.log('Db has been synchronizing successfully'))
    .catch(err => console.log('Error while synchronizing: ' + err.toString()));

function loadData() {
    return Promise.all([
        company.bulkCreate(require('./data/company')),
        employee.bulkCreate(require('./data/employee'))
    ])
        .then(() => console.log('Companies and employees have been loaded'))
        .then(() => Promise.all([
            company_employee.bulkCreate(require('./data/company_employee'))
        ]))
        .then(() => console.log('CompanyEmployees has been loaded'));
}
