const db = require('../model/index');

module.exports = {

    async getCompanyEmployees(id) {
        const company = await db.Company.findOne({
            where: {id: id},
            attributes: ['company_name'],
            include: [{
                model: db.Company_employee,
                attributes: ['hours_job', 'salary', 'hire_date'],
                include: [{
                    model: db.Employee,
                    attributes: ['first_name', 'last_name']
                }]
            }]
        });

        return db.Company_employee.findOne({
            where: {id_company: id},
            attributes: [[db.sequelize.fn('sum', db.sequelize.col('salary')), 'sum_salary']],
        })
            .then(salarySumResult => {
                const clonedCompany = JSON.parse(JSON.stringify(company));
                clonedCompany.sum_salary = salarySumResult.dataValues.sum_salary;
                return clonedCompany;
            });
    },

    async fireEmployee(employeeId) {
        const firedEmployee = {id_employee: employeeId};
        return db.Company_employee.destroy({
            where: firedEmployee
        }).then(isDeleted => {
            if (isDeleted) {
                return firedEmployee;
            } else {
                throw new Error('No such records have been found');
            }
        });
    },

    async getListYourCompany(firstName) {
        const getListCompany = await db.Employee.findOne({
            where: {first_name: firstName},
            attributes: ['first_name', 'last_name'],
            include: [{
                model: db.Company_employee,
                attributes: ['hours_job', 'salary', 'hire_date'],
                include: [{
                    model: db.Company,
                    attributes: ['company_name']
                }]
            }]
        })

        return db.Employee.findOne({
            where: {first_name: firstName},
            include: [{
                model: db.Company_employee,
                attributes: [[db.sequelize.fn('sum', db.sequelize.col('salary')), 'sum_salary']]
            }]
        })
            .then(salarySumResult => {
                const clonedEmployee = JSON.parse(JSON.stringify(getListCompany));
                clonedEmployee.sum_salary = salarySumResult.company_employees[0].dataValues.sum_salary;
                return clonedEmployee;
            })
    },

    async signUpForCompany(body) {
        const countHours = await db.Company_employee.findOne({
            where: {id_employee: body.id_employee},
            attributes: [[db.sequelize.fn('sum', db.sequelize.col('hours_job')), 'sum_hours_job']],
        })

        if (countHours.dataValues.sum_hours_job + body.hours_job <= 20) {
            return db.Company_employee.create({
                id_employee: body.id_employee,
                id_company: body.id_company,
                hours_job: body.hours_job,
                salary: body.salary,
                hire_date: body.hire_date
            });

        } else {
            throw new Error('You are not hired. A worker cannot work more than 20 hours a day.')
        }
    },

    async quitCompany(idCompany, idEmployee) {
        const quitedCompany = {id_company: idCompany, id_employee: idEmployee};
        return db.Company_employee.destroy({
            where: quitedCompany
        }).then(isDeleted => {
            if (isDeleted) {
                return quitedCompany;
            } else {
                throw new Error('No such records have been found');
            }
        })
    }
};
