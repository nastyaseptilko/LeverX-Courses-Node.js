//To complete this task you will need Sing up at  ​https://geocode.xyz/​ and get the API key.
// Read about ​fetch()​. Use it to send requests in your browser.
// Request example: http://geocode.xyz/Minsk?json=1&auth=​<your_key_here>
// - Send parallel requests for information about cities - Minsk, Madrid, Rome. Display the result in format: city - country.
// - Using Promise.race get the country of these cities - Paris, Nice. Display result.
// - Write a function that returns a promise that resolves any cities' names after 3 second.
//                      After you get names send parallel requests for information about cities. Display the country of the cities.
// - Handle errors

function getCitiesMMR(outputView) {
    return Promise.all([getCities(outputView, "Minsk"), getCities(outputView, "Madrid"), getCities(outputView, "Rome")])
        .catch(err => console.log(err));
}

function getCities(outputView, cityName) {
    let options = {
        method: 'GET', headers: {'Content-Type': 'text/plain'}
    };
    return fetch(`https://geocode.xyz/${cityName}?json=1&auth=245284075928386645881x127568`, options)
        .then(response => response.json())
        .then(responseJson => {

            if (outputView) {
                document.getElementById('city').innerHTML += responseJson.standard.city + ' ';
            } else {
                document.getElementById(`city${cityName}`).innerHTML += responseJson.standard.city + " - " + responseJson.standard.countryname;
            }
            return responseJson;
        });
}

function getCityParis() {
    let options = {
        method: 'GET', headers: {'Content-Type': 'text/plain'}
    };
    return fetch('https://geocode.xyz/Paris?json=1&auth=245284075928386645881x127568', options)
        .then(response => response.json());
}

function getCityNice() {
    let options = {
        method: 'GET', headers: {'Content-Type': 'text/plain'}
    };
    return fetch('https://geocode.xyz/Nice?json=1&auth=245284075928386645881x127568', options)
        .then(response => response.json());
}

function getCitiesPN() {
    Promise.race([
        getCityParis(),
        getCityNice()
    ]).then(responseJson => {
        document.getElementById('cityNiceParis').innerHTML += responseJson.standard.city + " - " + responseJson.standard.countryname;
    }).catch(err => console.log(err));
}

function returnInformationCity() {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            let allCity = getCitiesMMR(1);
            resolve(allCity);
        }, 3000)
    }))
}

returnInformationCity()
    .then(responseJson => {
        for (let i = 0; i < responseJson.length; i++) {
            document.getElementById('country').innerHTML += responseJson[i].standard.countryname + ' ';
        }
    }).catch(err => console.log(err));
