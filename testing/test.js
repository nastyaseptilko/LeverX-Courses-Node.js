const {expect, test} = require('@jest/globals');


const repository  = require('../repositories/orm-repository');

test('My first test', async () => {
    expect(await repository.getCompanyEmployees(1))
        .toEqual({"company_name": "AECOM", "company_employees": [{"hours_job": 1, "salary": 50000, "hire_date": null, "employee": {"first_name": "Matthew", "last_name": "Saunders"}}], "sum_salary": 50000});
});