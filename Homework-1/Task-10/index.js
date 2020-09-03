// ​Write a function that returns Promise, which is resolved after 6 seconds.

function returnPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const str = "Hello Promise";
            resolve(str);
        }, 6000);
    })
}

returnPromise().then(res => console.log(res));
