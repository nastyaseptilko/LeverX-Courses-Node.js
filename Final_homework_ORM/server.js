const express = require('express');
const config = require('./config').server;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const companyHandler = require('./api/company');
const employeeHandler = require('./api/employee');


app.get('/api/company/:id', companyHandler.getCompanyEmployees);
app.delete('/api/company/:id_employee', companyHandler.fireEmployee);

app.get('/api/employee/:first_name', employeeHandler.getListYourCompany);
app.post('/api/employee', employeeHandler.signUpForCompany);
app.delete('/api/employee/:id_company/:id_employee', employeeHandler.quitCompany);


app.listen(config.port, config.host, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});
