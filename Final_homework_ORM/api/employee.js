const repository = require('./../repositories/orm-repository');
//const repository = require('./../repositories/sql-repository');

module.exports = {
    async getListYourCompany (request, response) {
        repository.getListYourCompany(request.params.first_name)
            .then(listCompany => {
                response.json(listCompany);
            }).catch(err => {
            response.statusCode = 400;
            response.json({error: err.toString()});
        });
    },

    async signUpForCompany(request, response) {
        repository.signUpForCompany(request.body)
            .then(sighUpCompany => {
                response.json(sighUpCompany);
            }).catch(err => {
            response.statusCode = 400;
            response.json({error: err.toString()});
        });
    },

    quitCompany: (request, response) => {
        repository.quitCompany(request.params.id_company,request.params.id_employee)
            .then(quitedCompany => {
                response.json(quitedCompany);
            }).catch(err => {
            response.statusCode = 400;
            response.json({error: err.toString()});
        });
    }
};
