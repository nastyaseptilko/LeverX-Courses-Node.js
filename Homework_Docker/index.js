const express = require('express');
const fs = require('fs');
const config = require('./config');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/users', function (request, response) {
    const read = fs.readFileSync('cellphones.json')
    const parse = JSON.parse(read.toString())
    response.send(parse)
});

app.post("/addUser", function (request, response) {
    const name = request.body.name;
    const phone = request.body.phone;

    if(!(name && phone) || !name || !phone){
        return response.status(400).json({ error: 'You have entered empty fields!' });
    }
    if (phone.length === 7 && typeof phone === "number"){
        return response.status(400).json({ error: 'The phone number must be at least 7 digits long!' });
    }

    let read = fs.readFileSync('cellphones.json');
    const arr = JSON.parse(read.toString());

    let id = arr.length + 1;

    let found = arr.some(function (el) {
        return el.name === name && el.phone === phone;
    });
    if (!found) {
        arr.push({id: id, name: name, phone: phone});
        fs.writeFileSync('cellphones.json', JSON.stringify(arr));
    }

    response.json("User added");
});

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || config.server.port, () => {
    console.log(`Listening to http://localhost:${config.server.port}/`);
});
