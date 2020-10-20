const db = require('./../model/db_connect');

module.exports = {

    async getCompanyEmployees(id) {
        const employeeInCompany = await db.connectionPool
            .query(`SELECT COMPANY_NAME, FIRST_NAME, LAST_NAME,HIRE_DATE, SALARY FROM COMPANY AS t1
                        LEFT jOIN COMPANY_EMPLOYEE AS t2 ON t2.ID_COMPANY = t1.ID
                        JOIN EMPLOYEE AS t3 ON t3.ID = t2.ID_EMPLOYEE
                        WHERE t1.ID = ${id};`)
            .then(result => result[0]);

        return db.connectionPool
            .query(`SELECT SUM(SALARY)  FROM COMPANY AS t1
                        LEFT jOIN COMPANY_EMPLOYEE AS t2 ON t2.ID_COMPANY = t1.ID
                        JOIN EMPLOYEE AS t3 ON t3.ID = t2.ID_EMPLOYEE
                        WHERE t1.ID = ${id};`)
            .then(result => {
                employeeInCompany.forEach(employee => {
                    employee.SUM = result[0];
                });
                return employeeInCompany;
            });
    },

    async fireEmployee(id) {
        return db.connectionPool
            .query(`DELETE FROM COMPANY_EMPLOYEE WHERE ID_EMPLOYEE = ${id};`)
            .then(result => ({id_employee: id}));
    },

    async getListYourCompany(firstName) {
        const companyList = await db.connectionPool
            .query(`SELECT COMPANY_NAME, HIRE_DATE, SALARY FROM COMPANY AS t1
						LEFT JOIN COMPANY_EMPLOYEE AS t2 ON t2.ID_COMPANY = t1.ID
                        JOIN EMPLOYEE AS t3 ON t3.ID = t2.ID_EMPLOYEE
                        WHERE t3.FIRST_NAME = '${firstName}';`)
            .then(result => result[0]);

        return db.connectionPool
            .query(`SELECT SUM(SALARY) FROM COMPANY AS t1
                        LEFT jOIN COMPANY_EMPLOYEE AS t2 ON t2.ID_COMPANY = t1.ID
                        JOIN EMPLOYEE AS t3 ON t3.ID = t2.ID_EMPLOYEE
                        WHERE t3.FIRST_NAME = '${firstName}';`)
            .then(result => {
                companyList.forEach(company => {
                    company.SUM = result[0];
                });
                return companyList;
            })
    },

    async signUpForCompany(body) {
        const {
            ID_EMPLOYEE,
            ID_COMPANY,
            HOURS_JOB,
            SALARY,
            HIRE_DATE
        } = body;
        const getSumHoursJob = await db.connectionPool
            .query(`SELECT SUM(HOURS_JOB) as sum FROM COMPANY AS t1
						LEFT jOIN COMPANY_EMPLOYEE AS t2 ON t2.ID_COMPANY = t1.ID
                        JOIN EMPLOYEE AS t3 ON t3.ID = t2.ID_EMPLOYEE
                        WHERE t2.ID_EMPLOYEE = ${ID_EMPLOYEE};`)
            .then(result =>(result[0][0].sum))

        if (getSumHoursJob + HOURS_JOB <= 20) {
            db.connectionPool
                .query(`INSERT INTO COMPANY_EMPLOYEE(ID_EMPLOYEE, ID_COMPANY,HOURS_JOB, SALARY, HIRE_DATE) VALUES
	                (${ID_EMPLOYEE}, ${ID_COMPANY},${HOURS_JOB}, ${SALARY}, '${HIRE_DATE}');`)
                .then(result => result[0])
            return db.connectionPool
                .query(`SELECT * FROM COMPANY_EMPLOYEE WHERE ID_EMPLOYEE=${ID_EMPLOYEE} AND ID_COMPANY = ${ID_COMPANY}`)
                .then(result => {
                    return result[0];
                })
        } else {
            throw new Error('You are not hired. A worker cannot work more than 20 hours a day.')
        }
    },

    async quitCompany(idCompany, idEmployee) {
       return db.connectionPool
            .query(`DELETE FROM COMPANY_EMPLOYEE WHERE ID_COMPANY = ${idCompany} AND ID_EMPLOYEE=${idEmployee};`)
            .then(result => ({ id_company: idCompany, id_employee: idEmployee}))
    }
};
