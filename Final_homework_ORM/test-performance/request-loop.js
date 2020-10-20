const axios = require('axios');

let start = new Date;
let result = 0;

for (let i = 1; i <= 10000; i++) {
    axios.get(`http://localhost:3000/api/company/${i}`)
        .then(response => {
            console.log(response.data)
            let end = new Date;
            let average = (end - start)/i;
            result += average;
            if (i === 10000){
                console.log( "Cycle took average: " + ((result / 1000) % 60) + "sec." );
            }
        });
}
