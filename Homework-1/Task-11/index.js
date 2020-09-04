//Write a JavaScript program to run a given array of promises in ​series​.

const promisesInSeries = pr =>
    pr.reduce((p, next) => p.then(next), Promise.resolve());

function getStr(str) {
    return new Promise((resolve, reject) => {
        console.log(str);
        resolve(str)
    })
}

function getDateNow() {
    return new Promise((resolve, reject) => {
        let now = new Date();
        console.log(now)
        resolve(now);
    })
}

promisesInSeries([() => getStr("This string."), () => getDateNow()]);
