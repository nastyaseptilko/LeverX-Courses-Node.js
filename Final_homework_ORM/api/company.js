const repository = require('./../repositories/orm-repository');
//const repository = require('./../repositories/sql-repository');

module.exports = {
    getCompanyEmployees(request, response)  {
        repository.getCompanyEmployees(request.params.id)
            .then(companyEmployees => {
                response.json(companyEmployees);
            }).catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },

    fireEmployee: (request, response) => {
         repository.fireEmployee(request.params.id_employee)
            .then(firedEmployee => {
                response.json(firedEmployee);
            }).catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    }
};
