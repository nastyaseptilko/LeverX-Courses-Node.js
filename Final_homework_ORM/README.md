To see the difference in executing queries with a small number of records and a large number of records.
I created a separate file "request-loop.js" in derectory "test-perfomance".
Here I am calculating the time difference from the start of the loop until the response is received.
Execution time of one request: 0.066sec.
Execution time based on the average of 1000 requests per GET of 10000 records: 28.820986077102617sec.
We can conclude that the more records and queries, the more time it takes to complete them.
Below I have provided the code how I did it.

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

Homework done in full.
